// Check if the specific style already exists
var existingStyles = [...document.head.querySelectorAll('style')].some(style => style.textContent.includes('.ot-beyondmarkdown-replaced ul'));

// Only add the style if it doesn't already exist
if (!existingStyles) {
    var otStyle = document.createElement('style');
    otStyle.textContent = `
        h1, h2, h3 { margin-top: 0; }
        p { margin-top: 0; }
        .ot-beyondmarkdown-replaced ul {
            list-style-type: disc;
            margin-block-start: 1em;
            margin-block-end: 1em;
            padding-inline-start: 40px;
        }
        .ot-beyondmarkdown-replaced li {
            margin-bottom: 0.5em;
        }
    `;
    document.head.appendChild(otStyle);
}


/**
 * Sets up a mutation observer to monitor changes in the DOM.
 * If the target node exists, it selects the node that will be observed for mutations (Desktop view).
 * If the target node doesn't exist, it selects the node that will be observed for mutations (Mobile view).
 * If a target node is found, it creates a MutationObserver and starts observing the target node for mutations.
 */
function setUpObserver() {
    // Select the node that will be observed for mutations (Desktop view)
    var targetNode = document.querySelector('.ddbc-tab-list');

    // If the target node doesn't exist, select the node that will be observed for mutations (Mobile view)
    if (!targetNode) {
        targetNode = document.querySelector('.ct-component-carousel');
    }

    if (targetNode) {
        var observer = new MutationObserver(handleMutations);
        var config = { childList: true, subtree: true };
        observer.observe(targetNode, config);
    }
}

/**
 * The function `handleMutations` takes in a list of mutations and an observer, and it checks if any
 * added nodes or their children match a specific criteria, and if so, it calls the `convertContent`
 * function on the parent node to handle its entire subtree.
 * @param mutations - The `mutations` parameter is an array of MutationRecord objects. Each
 * MutationRecord object represents a single mutation that occurred in the observed DOM. The array
 * contains all the mutations that were observed since the last time the observer's callback function
 * was called.
 * @param observer - The observer parameter is an instance of the MutationObserver class. It is used to
 * observe changes in the DOM and trigger the handleMutations function when mutations occur.
 */
function handleMutations(mutations, observer) {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                // Now checking if any child of the added node qualifies for conversion
                if (node.nodeType === 1) { // Checks if it's an element node
                    // If the node itself matches the criteria or contains children that do
                    if (node.matches('.ct-notes__note') || node.querySelector('.ct-notes__note')) {
                        convertContent(node); // Call convertContent on the parent node to handle its entire subtree
                    }
                }
            });
        }
    });
}


/**
 * The `convertMarkdownToHTML` function converts Markdown text into HTML markup.
 * @param markdown - The `markdown` parameter is a string that represents the markdown content that you
 * want to convert to HTML.
 * @returns The function `convertMarkdownToHTML` returns the converted HTML string from the given
 * markdown input.
 */
function convertMarkdownToHTML(markdown) {
    markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>')
        .replace(/<\/ul>\n<ul>/gim, '')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>') // Make non-greedy
        .replace(/\*(.*?)\*/gim, '<em>$1</em>') // Make non-greedy
        .split('\n').map(line => {
            if (line.match(/^(<h1>|<h2>|<h3>|<ul>|<li>|<strong>|<em>)/)) {
                return line;
            } else {
                return `<p>${line}</p>`;
            }
        }).join('');
    return markdown.trim();
}


/**
 * The `convertContent` function converts content within a specified container from Markdown format to
 * HTML format, based on the specified formatting style and custom tag.
 * @param container - The `container` parameter is the DOM element that contains the content you want
 * to convert. It is expected to be a valid DOM element, such as a div or a section, that contains the
 * content you want to convert.
 */
function convertContent(container) {
    chrome.storage.sync.get(['formattingStyle', 'customTag'], function (data) {
        const formatStyle = data.formattingStyle || 'tags'; // Default to 'tags'
        const customTag = data.customTag || 'ot-markdown'; // Default tag
        const tagRegex = new RegExp(`\\[${customTag}\\](.*?)\\[\\/${customTag}\\]`, 's'); // Dynamic regex based on customTag

        container.querySelectorAll('.ct-notes__note').forEach(element => {
            if (formatStyle === 'tags') {
                // format only content with the custom tags
                var markdownText = element.innerText.match(tagRegex);
                if (markdownText && markdownText.length > 1) {
                    var htmlContent = convertMarkdownToHTML(markdownText[1]);
                    element.innerHTML = htmlContent;
                    element.classList.add('ot-beyondmarkdown-replaced');
                }
            } else {
                // format all content in .ct-notes__note elements
                var htmlContent = convertMarkdownToHTML(element.innerText);
                element.innerHTML = htmlContent;
                element.classList.add('ot-beyondmarkdown-replaced');
            }
        });
    });
}


window.onload = function () {
    // Set a timeout if you want an additional delay
    setTimeout(setUpObserver, 3000);
};
