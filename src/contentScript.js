var showdown = new showdown.Converter(
    {
        simplifiedAutoLink: true,
        strikethrough: true,
        tables: true,
        tasklists: true,
        openLinksInNewWindow: true,
        emoji: true,
        requireSpaceBeforeHeadingText: true,
        simpleLineBreaks: true,

    }
);

// Check if the specific style already exists
var existingStyles = [...document.head.querySelectorAll('style')].some(style => style.textContent.includes('.ot-beyondmarkdown-replaced ul'));

// Only add the style if it doesn't already exist
if (!existingStyles) {
    var otStyle = document.createElement('style');
    otStyle.textContent = `
    .ot-beyondmarkdown-replaced h1,
    .ot-beyondmarkdown-replaced h2,
    .ot-beyondmarkdown-replaced h3,
    .ot-beyondmarkdown-replaced ul,
    .ot-beyondmarkdown-replaced li,
    .ot-beyondmarkdown-replaced p {
        line-height: 1.4; /* Adjust vertical spacing */
    }
    .ot-beyondmarkdown-replaced ul {
        list-style-type: disc;
        padding-inline-start: 40px;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .ot-beyondmarkdown-replaced li {
        margin-bottom: 0.5em;
    }

    .ot-beyondmarkdown-replaced table {
        border-collapse: collapse;
        width: 100%;
    }

    .ot-beyondmarkdown-replaced th,
    .ot-beyondmarkdown-replaced td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    .ot-beyondmarkdown-replaced th {
        background-color: #f2f2f2;
    }

    .ot-beyondmarkdown-replaced tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    .ot-beyondmarkdown-replaced th {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
 * added nodes or their children match a specific criteria, and if so, it calls the `convertNotesContent`
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
                        convertNotesContent(node); // Call convertNotesContent on the parent node to handle its entire subtree
                    }
                }
            });
        }
    });
}

/**
 * The `convertNotesContent` function converts content within a specified container from Markdown format to
 * HTML format, based on the specified formatting style and custom tag.
 * @param container - The `container` parameter is the DOM element that contains the content you want
 * to convert. It is expected to be a valid DOM element, such as a div or a section, that contains the
 * content you want to convert.
 */
function convertNotesContent(container) {
    container.querySelectorAll('.ct-notes__note').forEach(element => {
        // format all content in .ct-notes__note elements
        var htmlContent = showdown.makeHtml(element.innerText);
        element.innerHTML = htmlContent;
        element.classList.add('ot-beyondmarkdown-replaced');
        element.style.whiteSpace = 'normal';
    });
}


/**
 * The function `convertEncounterContent` converts content within specific elements based on a
 * specified formatting style and custom tag.
 */
function convertEncounterContent() {
    // convert all content in all .encounter-details-content-section__content elements
    var encounterContent = document.querySelectorAll('.encounter-details-content-section__content');
    encounterContent.forEach(element => {
        // format all content in .encounter-details-content-section__content elements
        var htmlContent = showdown.makeHtml(element.innerText);
        element.innerHTML = htmlContent;
        element.classList.add('ot-beyondmarkdown-replaced');
        element.style.whiteSpace = 'normal';
    });
}


/**
 * The function `waitForElementToDisplay` waits for a specified element to be displayed on the webpage
 * before executing a specific action.
 * @param selector - The `selector` parameter in the `waitForElementToDisplay` function is a CSS
 * selector that specifies the element you are waiting to display on the webpage. It could be a class,
 * id, tag name, or any other valid CSS selector that targets the element you are interested in.
 * @param time - The `time` parameter in the `waitForElementToDisplay` function represents the duration
 * in milliseconds for which the function will wait before checking again if the specified element is
 * displayed on the page. This parameter determines the interval at which the function will recheck for
 * the element until it is found.
 * @returns The function `waitForElementToDisplay` is returning `undefined`.
 */
function waitForElementToDisplay(selector, time) {
    if (document.querySelector(selector) != null) {
        convertEncounterContent();
        return;
    } else {
        setTimeout(function () {
            waitForElementToDisplay(selector, time);
        }, time);
    }
}


window.onload = function () {
    // Set a timeout if you want an additional delay
    setTimeout(function () {
        setUpObserver();
        // if the url is an encounter page, then convert the content to HTML
        if (window.location.href.includes('encounters')) {
            waitForElementToDisplay('.encounter-details-content-section__content', 1000);
        }
    }, 3000);
};