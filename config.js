const { Regex } = require('@companion-module/base')

const configFields = [
    {
        id: 'info',
        type: 'static-text',
        label: 'Getting started with UPC',
        value: `This module connects to the UPC (Ultimate Presentation Control) app to control Keynote and PowerPoint. <br/> Make sure the UPC helper app is running on the target Mac and check the console for the authentication token.`,
        width: 12,
    },
    {
        type: 'textinput',
        id: 'host',
        label: 'Target IP',
        width: 8,
        regex: Regex.IP,
        default: '127.0.0.1',
    },
    {
        type: 'textinput',
        id: 'port',
        label: 'Target Port',
        width: 4,
        regex: Regex.PORT,
        default: 8765,
    },
    {
        type: 'textinput',
        id: 'authToken',
        label: 'Authentication Token',
        width: 8,
        default: '',
        regex: '/^[a-f0-9]{8}$/',
    },
    {
        id: 'info-auth',
        type: 'static-text',
        label: 'Authentication Info',
        value: 'Enter the 8-character authentication token shown in the UPC app console when it starts. This token is required for security.',
        width: 12,
    },
    {
        id: 'info-port',
        type: 'static-text',
        label: 'Connection Info',
        value: 'Default port is 8765. This should match the WebSocket server port in the UPC app.',
        width: 12,
    },
]

module.exports = configFields