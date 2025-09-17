const { combineRgb } = require('@companion-module/base')

module.exports = function (instance) {
    return {
        // Basic presentation control presets
        'next_slide': {
            type: 'button',
            category: 'Slides',
            name: 'Next Slide',
            style: {
                text: 'NEXT',
                size: '24',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 100, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'next'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationAtEnd',
                    options: {},
                    style: {
                        bgcolor: combineRgb(100, 100, 100),
                        text: 'END'
                    }
                }
            ]
        },
        'previous_slide': {
            type: 'button',
            category: 'Slides',
            name: 'Previous Slide',
            style: {
                text: 'PREV',
                size: '24',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(100, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'previous'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationAtBeginning',
                    options: {},
                    style: {
                        bgcolor: combineRgb(100, 100, 100),
                        text: 'BEGIN'
                    }
                }
            ]
        },

        // Presentation management
        'start_slideshow': {
            type: 'button',
            category: 'Presentation',
            name: 'Start Slideshow',
            style: {
                text: 'START',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 100, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'start'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationPlaying',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 150, 0),
                        text: 'PLAYING'
                    }
                }
            ]
        },
        'stop_slideshow': {
            type: 'button',
            category: 'Presentation',
            name: 'Stop Slideshow',
            style: {
                text: 'STOP',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(100, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'stop'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: []
        },

        // Presentations browser presets
        'refresh_presentations': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Refresh Presentations List',
            style: {
                text: 'REFRESH\\nLIST',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 102)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'listPresentations'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: []
        },
        'next_presentation': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Next Presentation',
            style: {
                text: 'NEXT\\nPRESENTATION',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 51, 102)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'nextPresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationsAvailable',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 80, 150)
                    }
                }
            ]
        },
        'previous_presentation': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Previous Presentation',
            style: {
                text: 'PREV\\nPRESENTATION',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 51, 102)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'previousPresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationsAvailable',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 80, 150)
                    }
                }
            ]
        },
        'open_selected': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Open Selected',
            style: {
                text: 'OPEN\\nSELECTED',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 102, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'openSelectedPresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationsAvailable',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 150, 0)
                    }
                }
            ]
        },
        'open_and_start': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Open & Start',
            style: {
                text: 'OPEN\\n& START',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 102, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'openAndStartSelectedPresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: []
        },
        'close_presentation': {
            type: 'button',
            category: 'Presentation',
            name: 'Close Presentation',
            style: {
                text: 'CLOSE',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(153, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'closePresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: []
        },
        'current_selection': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Current Selection Info',
            style: {
                text: '$(keyosc:selectedPresentation)',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'openAndStartSelectedPresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationsAvailable',
                    options: {},
                    style: {
                        bgcolor: combineRgb(40, 40, 40)
                    }
                }
            ]
        }
    }
}