# File Prefix Plugin for Obsidian

This plugin adds a context menu item and command palette command to prefix notes with their creation datetime in the format "YYYYMMDDHHmm".

## Features

- Adds a context menu item in the file explorer to prefix notes with their creation datetime
- The prefix format is "YYYYMMDDHHmm" (e.g., "202405021059")
- Works with both single file selection and command palette
- Preserves file extension and location
- Obsidian handles file rename properly for internal links

## Installation

### Manual Installation

1. Download the latest release from the releases page
2. Extract the zip file into your Obsidian vault's `.obsidian/plugins` folder
3. Reload Obsidian
4. Enable the plugin in Settings > Community plugins

### Development Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the plugin
4. Copy the `main.js` and `manifest.json` files to your `.obsidian/plugins/file-prefix` folder
5. Reload Obsidian
6. Enable the plugin in Settings > Community plugins

## Usage

### Via Context Menu
1. Right-click on any file in the file explorer
2. Select "Prefix with creation date" from the context menu

### Via Command Palette
1. Press `Cmd/Ctrl + P` to open the command palette
2. Type "Prefix current file with creation date"
3. Press Enter

## Example

Before: `my-note.md`
After: `202405021059_my-note.md`

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub. 