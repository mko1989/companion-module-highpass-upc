const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const WebSocket = require('ws')
const actions = require('./actions')
const variables = require('./variables')
const feedbacks = require('./feedbacks')
const presets = require('./presets')
const configFields = require('./config')
const UpgradeScripts = require('./upgrades')

class UPCInstance extends InstanceBase {
    constructor(internal) {
        super(internal)

        this.ws = null
        this.reconnectInterval = null
        this.authenticated = false

        // Initialize presentation state
        this.presentationList = []
        this.selectedIndex = 0
    }

    async init(config) {
        this.config = config
        this.updateStatus(InstanceStatus.Connecting)

        this.initVariables()
        this.initActions()
        this.initFeedbacks()
        this.initPresets()

        this.connect()
    }

    async configUpdated(config) {
        this.config = config
        this.connect()
    }

    connect() {
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }

        if (this.reconnectInterval) {
            clearInterval(this.reconnectInterval)
            this.reconnectInterval = null
        }

        if (!this.config.host || !this.config.port) {
            this.updateStatus(InstanceStatus.BadConfig, 'Host or Port not configured')
            return
        }

        if (!this.config.authToken) {
            this.updateStatus(InstanceStatus.BadConfig, 'Authentication token not configured')
            return
        }

        this.authenticated = false
        this.ws = new WebSocket(`ws://${this.config.host}:${this.config.port}`)
        this.updateStatus(InstanceStatus.Connecting)

        this.ws.on('open', () => {
            this.log('info', 'WebSocket connection established, waiting for handshake')
        })

        this.ws.on('message', (data) => {
            this.handleIncomingMessage(data)
        })

        this.ws.on('close', () => {
            this.updateStatus(InstanceStatus.Disconnected, 'Connection closed')
            this.log('info', 'Connection closed')
            this.reconnect()
        })

        this.ws.on('error', (err) => {
            this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
            this.log('error', `WebSocket error: ${err.message}`)
            // The 'close' event will also be called, which will trigger reconnect.
        })
    }

    reconnect() {
        if (!this.reconnectInterval) {
            this.reconnectInterval = setInterval(() => {
                this.log('info', 'Attempting to reconnect...')
                this.connect()
            }, 5000) // Try to reconnect every 5 seconds
        }
    }

    handleIncomingMessage(data) {
        try {
            const message = JSON.parse(data)

            this.log('debug', `Received message: ${JSON.stringify(message)}`)

            switch (message.type) {
                case 'handshake':
                    this.log('info', 'Received handshake, sending authentication')
                    this.sendMessage({ type: 'auth', token: this.config.authToken })
                    break
                
                case 'authResult':
                    if (message.success) {
                        this.authenticated = true
                        this.updateStatus(InstanceStatus.Ok)
                        this.log('info', 'Authentication successful')
                        if (this.reconnectInterval) {
                            clearInterval(this.reconnectInterval)
                            this.reconnectInterval = null
                        }
                        // Request initial status
                        this.sendMessage({ type: 'status' })
                        this.sendMessage({ type: 'listFiles' })
                    } else {
                        this.updateStatus(InstanceStatus.UnknownError, `Authentication failed: ${message.message}`)
                        this.log('error', `Authentication failed: ${message.message}`)
                    }
                    break

                case 'status':
                    this.updateStateVariables(message)
                    break
                
                case 'fileList':
                    this.updatePresentationList(message.files || [])
                    break

                case 'fileOpened':
                    this.log('info', `File opened: ${message.filePath}`)
                    // Request updated status after file opens
                    setTimeout(() => this.sendMessage({ type: 'status' }), 500)
                    break

                case 'commandResult':
                    this.log('debug', `Command ${message.command} result: ${message.success}`)
                    break

                case 'error':
                    this.log('error', `Server error: ${message.message}`)
                    break

                case 'pong':
                    this.log('debug', 'Received pong')
                    break
            }
        } catch (e) {
            this.log('error', 'Failed to parse incoming message:', e)
        }
    }

    updateStateVariables(status) {
        const updates = {}
        
        // Handle current file info
        if (status.currentFile) {
            updates.presentationName = status.currentFile.name || 'Unknown'
            updates.presentationType = status.currentFile.type || 'unknown'
        } else {
            updates.presentationName = 'No presentation'
            updates.presentationType = 'none'
        }
        
        // Handle slide info
        if (status.currentSlide !== undefined) updates.currentSlide = status.currentSlide
        if (status.totalSlides !== undefined) updates.slideCount = status.totalSlides
        
        // Handle presentation state
        if (status.isPresenting !== undefined) {
            updates.state = status.isPresenting ? 'Playing' : 'Stopped'
            updates.playing = status.isPresenting ? '1' : '0'
        }
        
        // Calculate remaining slides
        if (status.currentSlide !== undefined && status.totalSlides !== undefined) {
            updates.slidesRemaining = Math.max(0, status.totalSlides - status.currentSlide)
        }
        
        // Handle folder info
        if (status.folder) updates.presentationFolder = status.folder
        if (status.fileCount !== undefined) updates.totalFiles = status.fileCount
        
        // Handle driver type
        if (status.driverType) updates.driverType = status.driverType
        
        // Handle slide notes
        if (status.slideNotes !== undefined) updates.slideNotes = status.slideNotes
        
        // Media player handling removed - will be implemented via Office.js add-in

        this.setVariableValues(updates)
        this.checkFeedbacks('slide_is', 'presentation_state', 'presentation_name', 'presentationType')
    }

    // The info object provides information about this instance to Companion user
    getConfigFields() {
        return configFields
    }

    initVariables() {
        variables(this)
    }

    // Presentation list management methods
    updatePresentationList(files) {
        // Convert UPC file format to presentation list format
        this.presentationList = files.map(file => ({
            name: file.name,
            path: file.path,
            type: file.type,
            size: file.size
        }))
        
        this.selectedIndex = Math.min(this.selectedIndex, this.presentationList.length - 1)
        if (this.selectedIndex < 0 && this.presentationList.length > 0) {
            this.selectedIndex = 0
        }
        
        this.updatePresentationVariables()
    }

    updatePresentationVariables() {
        const updates = {
            'totalPresentations': this.presentationList.length,
            'selectedIndex': this.presentationList.length > 0 ? this.selectedIndex + 1 : 0,
            'selectedPresentation': this.presentationList.length > 0 ? 
                this.presentationList[this.selectedIndex].name : 'No presentations'
        }
        
        this.setVariableValues(updates)
    }

    nextPresentation() {
        if (this.presentationList.length === 0) return
        
        this.selectedIndex = (this.selectedIndex + 1) % this.presentationList.length
        this.updatePresentationVariables()
    }

    previousPresentation() {
        if (this.presentationList.length === 0) return
        
        this.selectedIndex = (this.selectedIndex - 1 + this.presentationList.length) % this.presentationList.length
        this.updatePresentationVariables()
    }

    getSelectedPresentation() {
        if (this.presentationList.length === 0 || this.selectedIndex < 0 || 
            this.selectedIndex >= this.presentationList.length) {
            return null
        }
        
        return this.presentationList[this.selectedIndex]
    }

    initActions() {
        this.setActionDefinitions(actions.getActions(this))
    }

    initFeedbacks() {
        this.setFeedbackDefinitions(feedbacks(this))
    }

    initPresets() {
        this.setPresetDefinitions(presets(this))
    }

    sendMessage(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message))
            this.log('debug', `Sent message: ${JSON.stringify(message)}`)
        } else {
            this.log('warn', `Could not send message, WebSocket is not open. State: ${this.ws ? this.ws.readyState : 'null'}`)
        }
    }

    sendCommand(type, params = {}) {
        if (!this.authenticated) {
            this.log('warn', 'Cannot send command - not authenticated')
            return
        }
        
        const message = { type, ...params }
        this.sendMessage(message)
    }

    async destroy() {
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }
        if (this.reconnectInterval) {
            clearInterval(this.reconnectInterval)
            this.reconnectInterval = null
        }
        this.log('debug', 'destroy')
    }
}

runEntrypoint(UPCInstance, UpgradeScripts)