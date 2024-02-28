# BeyondMarkdown

Welcome to BeyondMarkdown, a Chrome Extension designed to enhance your D&D Beyond experience by seamlessly converting markdown in character notes into beautifully formatted HTML. This extension makes note-taking more efficient and readable, allowing you to focus on crafting your adventure without worrying about formatting.

## Features

- **Seamless Conversion**: Automatically converts markdown syntax within D&D Beyond character notes into formatted HTML.
- **Customizable**: Choose to format all content as markdown or only content within specific tags, offering flexibility in how your notes are displayed.
- **User-Friendly Settings**: Easily adjust your preferences directly from the extension's popup.
- **Designed for D&D Beyond**: Specifically tailored to work with D&D Beyond character pages.

## Supported Markdown Syntax

Here's a quick guide to the markdown formatting you can use:

### Headers

Create headers by prefixing your text with #, ##, or ### for different levels of headings.

```markdown
# Header 1
## Header 2
### Header 3
```

### Emphasis

Emphasize text using * for italics and ** for bold.

- *italic* for italic text
- **bold** for bold text

``` markdown
*italic* and **bold**
```

### Lists

Organize your information with bullet lists using -.

```markdown
- Item 1
- Item 2
- Item 3
```

## Screenshots

### Example Formatting

![Example Formatting](screenshots/example-formatting.png "Example Formatting")

### Extension Popup

![Extension Popup](screenshots/extension-popup.png "Extension Popup")

## Installation

1. **Download the Extension**: Clone this repository or download it as a ZIP file and unpack it.
2. **Open Chrome Extensions**: Navigate to `chrome://extensions/` in your Chrome browser.
3. **Enable Developer Mode**: Find the toggle switch in the top-right corner of the extensions page and ensure Developer Mode is turned on.
4. **Load Unpacked Extension**: Click the "Load unpacked" button and select the directory where you extracted BeyondMarkdown.
5. **Enjoy**: Visit D&D Beyond, navigate to your character notes, and start using markdown!

## How to Use

- **For All Content**: Simply start writing in markdown within your character notes. BeyondMarkdown will automatically convert your markdown syntax into HTML.
- **For Content Inside Tags Only**: Wrap the markdown you want to convert in `[ot-markdown]...[/ot-markdown]` tags. Adjust the tag via the extension's settings if needed.

### Adjusting Settings

Click on the BeyondMarkdown icon in your browser's extension area to access settings:
- Choose between formatting all content or only content within custom tags.
- Specify a custom tag if you're using the tag-specific formatting option.

## Custom Tag Configuration

When selecting to format content inside specific tags, you can define your custom tag in the extension's popup settings. This tag will be used to identify the markdown content that should be converted.

## Support

Encountered a bug or have a feature request? Feel free to [open an issue](https://github.com/Orbytale/BeyondMarkdown/issues) on GitHub. We appreciate your feedback and contributions to make BeyondMarkdown even better!

## License

BeyondMarkdown is released under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgements

A big thank you to the D&D community and all the digital adventurers out there. This project is for you, inspired by the stories we create together.

---
Enjoy using BeyondMarkdown for your D&D Beyond adventures, and may your notes be as legendary as your campaigns!
