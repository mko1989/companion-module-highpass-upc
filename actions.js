module.exports = {
    getActions: function (self) {
        return {
            // Basic slide control
            next: {
                name: 'Next',
                description: 'Go to next slide/build',
                options: [],
                callback: async () => {
                    self.sendCommand('next');
                },
            },
            previous: {
                name: 'Previous',
                description: 'Go to previous slide/build',
                options: [],
                callback: async () => {
                    self.sendCommand('prev');
                },
            },

            // Presentation control
            start: {
                name: 'Start Slideshow',
                description: 'Start the slideshow (works with both Keynote and PowerPoint)',
                options: [],
                callback: async () => {
                    self.sendCommand('start');
                },
            },
            startFromBeginning: {
                name: 'Start From Beginning',
                description: 'Go to first slide and start slideshow',
                options: [],
                callback: async () => {
                    self.sendCommand('goto', { slideNumber: 1 });
                    setTimeout(() => {
                        self.sendCommand('start');
                    }, 500);
                },
            },
            stop: {
                name: 'Stop Slideshow',
                description: 'Exit the slideshow (works with both Keynote and PowerPoint)',
                options: [],
                callback: async () => {
                    self.sendCommand('stop');
                },
            },
            close: {
                name: 'Close Presentation',
                description: 'Close the current presentation (stops slideshow and closes file)',
                options: [],
                callback: async () => {
                    self.sendCommand('close');
                },
            },

            // Presentation file management
            openPresentation: {
                name: 'Open Presentation',
                description: 'Open a presentation by path (supports .key, .pptx, .ppt)',
                options: [
                    {
                        type: 'textinput',
                        label: 'File Path',
                        id: 'path',
                        default: '',
                    },
                ],
                callback: async (action) => {
                    self.sendCommand('openFile', { filePath: action.options.path });
                },
            },
            openPresentationBase64: {
                name: 'Open Presentation (Base64 Path)',
                description: 'Open a presentation using a base64-encoded path',
                options: [
                    {
                        type: 'textinput',
                        label: 'Base64 Path',
                        id: 'path',
                        default: '',
                    },
                ],
                callback: async (action) => {
                    try {
                        const decodedPath = Buffer.from(action.options.path, 'base64').toString('utf8');
                        self.sendCommand('openFile', { filePath: decodedPath });
                    } catch (error) {
                        self.log('error', `Failed to decode base64 path: ${error.message}`);
                    }
                },
            },

            // File system operations
            listPresentations: {
                name: 'Refresh File List',
                description: 'Refresh the list of presentations in the current folder',
                options: [],
                callback: async () => {
                    self.sendCommand('listFiles');
                },
            },

            // Status
            requestStatus: {
                name: 'Request Status',
                description: 'Request current presentation status update',
                options: [],
                callback: async () => {
                    self.sendCommand('status');
                },
            },
            ping: {
                name: 'Ping Server',
                description: 'Test connection to UPC helper app',
                options: [],
                callback: async () => {
                    self.sendCommand('ping');
                },
            },
            
            // New actions for presentation list
            nextPresentation: {
                name: 'Next Presentation',
                description: 'Select the next presentation in the list',
                options: [],
                callback: async () => {
                    self.nextPresentation();
                },
            },
            previousPresentation: {
                name: 'Previous Presentation',
                description: 'Select the previous presentation in the list',
                options: [],
                callback: async () => {
                    self.previousPresentation();
                },
            },
            openSelectedPresentation: {
                name: 'Open Selected Presentation',
                description: 'Open the currently selected presentation',
                options: [],
                callback: async () => {
                    const selected = self.getSelectedPresentation();
                    if (selected) {
                        self.sendCommand('openFile', { filePath: selected.path });
                    } else {
                        self.log('warn', 'No presentation selected');
                    }
                },
            },
            openAndStartSelectedPresentation: {
                name: 'Open & Start Selected Presentation',
                description: 'Open the selected presentation and start slideshow',
                options: [],
                callback: async () => {
                    const selected = self.getSelectedPresentation();
                    if (selected) {
                        self.sendCommand('openFile', { filePath: selected.path });
                        setTimeout(() => {
                            self.sendCommand('goto', { slideNumber: 1 });
                            setTimeout(() => {
                                self.sendCommand('start');
                            }, 500);
                        }, 1500);
                    } else {
                        self.log('warn', 'No presentation selected');
                    }
                },
            },

        };
    }
};