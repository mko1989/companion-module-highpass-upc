module.exports = async function (self) {
    self.setVariableDefinitions([
        // Current presentation information
        { variableId: 'presentationName', name: 'Current presentation filename' },
        { variableId: 'presentationType', name: 'Presentation type (keynote/powerpoint/none)' },
        { variableId: 'slideCount', name: 'Total slide count' },
        { variableId: 'currentSlide', name: 'Current slide number' },
        { variableId: 'slidesRemaining', name: 'Number of slides remaining' },
        { variableId: 'state', name: 'Presentation state (Playing/Stopped)' },
        { variableId: 'playing', name: 'Is presentation playing (1/0)' },
        
        // Slide content
        { variableId: 'slideNotes', name: 'Current slide presenter notes' },
        
        // System information
        { variableId: 'driverType', name: 'Active driver (keynote/powerpoint)' },
        { variableId: 'presentationFolder', name: 'Current presentation folder path' },
        { variableId: 'totalFiles', name: 'Total files in current folder' },
        
        
        // Presentation browser variables
        { variableId: 'totalPresentations', name: 'Total number of presentations available' },
        { variableId: 'selectedIndex', name: 'Selected presentation index (1-based)' },
        { variableId: 'selectedPresentation', name: 'Name of the selected presentation' }
    ])
}