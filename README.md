- ~~supports markdown~~
- ~~we're going to use prosemirror~~
- ~~keep it stored in a readable, markdown-ish format. files over app~~
- ~~be able to toggle anything~~
- ~~a place where toggle things appear or something~~
- my theory is that tiptap/prosemirror is wiping the unknown element from the dom and erasing the annotation immediately after it's created. basically everytime you move the cursor or anythign we're generating new annotations and wiping the old ones.
- use markdown annotations to link to "canvases of content"
- there is a canvas around the document
- user can create notes
- the user can highlight sections and add notes
- then they can move through sections in a review mode where suggestions are made for each change
- the user can bind references or notes to a particular place in the text, kind of like stickies that live inside the text. those stickies can inform the AI as well.
- another concept is global state for a document, and custom renderers, also site scraping
- you can highlight and run AI functions
- add missing default block types