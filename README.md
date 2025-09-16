# UPC - Ultimate Presentation Control

A Bitfocus Companion module for controlling Keynote and PowerPoint presentations via the UPC helper app.

## Overview

UPC (Ultimate Presentation Control) allows you to control presentations remotely through Bitfocus Companion and Stream Deck. It supports both Keynote and PowerPoint on macOS.

## Features

- **Dual App Support**: Works with both Keynote and PowerPoint
- **Real-time Status**: Live slide position, notes, and presentation state
- **File Management**: Browse and open presentations from a folder
- **Secure Connection**: Token-based authentication
- **Rich Variables**: Extensive variable set for custom button displays
- **Advanced Actions**: Slide navigation, presentation control, file operations

## Setup

1. **Install the UPC Helper App** on your macOS machine
2. **Start the UPC App** and note the authentication token in the console
3. **Select a presentation folder** using the tray menu
4. **Configure this Companion module** with:
   - Host: IP address of the macOS machine (default: 127.0.0.1)
   - Port: WebSocket port (default: 8765)
   - Auth Token: 8-character token from UPC console

## Available Actions

### Slide Control
- Next / Previous slide
- Go to specific slide
- Start / Stop slideshow

### File Management
- Open presentation by path
- Refresh file list
- Browse presentations with next/previous selection

### System
- Request status update
- Ping connection test

## Variables

- `presentationName` - Current presentation filename
- `presentationType` - keynote/powerpoint/none
- `currentSlide` - Current slide number
- `slideCount` - Total slides
- `state` - Playing/Stopped
- `slideNotes` - Presenter notes for current slide
- `driverType` - Active driver (keynote/powerpoint)
- And more...

## Changelog

### v2.0.0
- Complete rewrite for UPC (Ultimate Presentation Control)
- Added PowerPoint support alongside Keynote
- New WebSocket API with authentication
- Enhanced variable set with presentation type and driver info
- Improved error handling and connection management
- Real-time slide notes support

### v1.0.3 (Legacy KeySocket)
- Fixed some graphics for media control presets
