# UPC - Ultimate Presentation Control

A Bitfocus Companion module for controlling Keynote and PowerPoint presentations via the UPC helper app.

## Overview

UPC (Ultimate Presentation Control) allows you to control presentations remotely through Bitfocus Companion and Stream Deck. It supports both Keynote and PowerPoint on macOS.

## Features

- Works with both Keynote and PowerPoint
- Live slide position, notes, and presentation state
- Browse and open presentations from a folder
- Token-based authentication
- Extensive variable set for custom button displays

## Setup

1. Install the UPC Helper App on your macOS machine
2. Start the UPC App and note the authentication token in the console
3. Select a presentation folder using the tray menu
4. Configure this Companion module with:
   - Host: IP address of the macOS machine (default: 127.0.0.1)
   - Port: WebSocket port (default: 8765)
   - Auth Token: 8-character token from UPC console

## Available Actions

### Slide Control
- Next / Previous slide
- Start / Stop slideshow

### File Management
- Open presentation by path
- Close presentation
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
