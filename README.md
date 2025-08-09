# Pharasmar Action Builder

Prototype web app for building Pathfinder 2e action lists compatible with the Kobold Discord bot.

## Usage

The builder is a static site and can be hosted directly on GitHub Pages or any static file server. Deploy the repository and visit `index.html` in your browser.

Actions and spells are loaded from the JSON files in the `data` directory. To export commands to Pastebin, optionally supply your Pastebin API key in the input field. If no key is provided or the request fails, the commands will be shown for manual copy.

## Development

You can open `index.html` directly or serve the project locally:

```
python -m http.server
```

The previous Flask server (`app.py`) is retained for reference but is not required for GitHub Pages hosting.
