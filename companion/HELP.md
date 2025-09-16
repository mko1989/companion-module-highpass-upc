## UPC - Ultimate Presentation Control

UPC is a macOS helper application that provides WebSocket control of both Keynote and PowerPoint presentations.

### Installation & Setup

1. **Download the UPC Helper App** and install it on your macOS machine
2. **Launch the UPC app** - it will appear as a tray icon in your menu bar
3. **Note the authentication token** displayed in the console when the app starts
4. **Select your presentations folder** by right-clicking the tray icon and choosing "Select Folder"

### Configuration

In the Companion module configuration:

- **Target IP**: The IP address of your macOS machine (127.0.0.1 for local)
- **Target Port**: WebSocket port (default: 8765)
- **Authentication Token**: The 8-character token shown in the UPC console

### Supported Applications

- **Keynote**: Full support including notes, slide navigation, and media timing
- **PowerPoint**: Basic support for slide navigation and presentation control

### Usage Tips

1. **Always select a folder first** using the tray menu before trying to open presentations
2. **Check the auth token** if connection fails - it changes each time the app restarts
3. **Use the "Refresh File List" action** after adding new presentations to the folder
4. **Monitor variables** like `presentationType` to create conditional buttons for different apps

### Troubleshooting

- **Connection Failed**: Verify the IP, port, and auth token are correct
- **No Files Listed**: Ensure you've selected a folder containing .key, .pptx, or .ppt files
- **Commands Not Working**: Check that a presentation is open and the correct app is focused

### Variables Available

Use these variables in your button text and conditionals:

- `$(UPC:presentationName)` - Current presentation name
- `$(UPC:currentSlide)` - Current slide number
- `$(UPC:slideCount)` - Total slides
- `$(UPC:state)` - Playing/Stopped
- `$(UPC:presentationType)` - keynote/powerpoint/none
- `$(UPC:slideNotes)` - Current slide notes
- `$(UPC:driverType)` - Active driver

### Example Button Configurations

**Slide Counter Button**:
Text: `$(UPC:currentSlide) / $(UPC:slideCount)`

**Conditional Next Button**:
- Show only when `$(UPC:state)` equals "Playing"
- Background color changes based on `$(UPC:presentationType)`

**Notes Display**:
Text: `$(UPC:slideNotes)`
(Truncate long notes as needed)
