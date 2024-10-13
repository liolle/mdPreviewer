import { editor } from "monaco-editor";
import {
  createSignal,
  type Component,
  createEffect,
  Show,
  onMount,
  onCleanup,
} from "solid-js";
import { editorContent, setEditorContent } from "../../App";

export const DEFAULT_TEXT = `
# Title Header (H1 header)

# simple

This is some placeholder text to show examples of Markdown formatting. We have
[a full article template](https://github.com/do-community/do-article-templates)
you can use when writing a DigitalOcean article. Please refer to our style and
formatting guidelines for more detailed explanations: <https://do.co/style>

## Prerequisites (H2 header)

Before you begin this guide you'll need the following:

- Familiarity with [Markdown](https://daringfireball.net/projects/markdown/)

## Step 1 — Basic Markdown

This is _italics_, this is **bold**, this is **underline**, and this is
~~strikethrough~~.

- This is a list item.
- This list is unordered.

Here's how to include an image with alt text and a title:

![Alt text for screen readers](https://assets.digitalocean.com/logos/DO_Logo_horizontal_blue.png 'DigitalOcean Logo')

_We also support some extra syntax for setting the width, height and alignment
of images. You can provide pixels (${"`"}200${"`"}/${"`"}200px${"`"}), or a percentage (${"`"}50%${"`"}), for
the width/height. The alignment can be either ${"`"}left${"`"} or ${"`"}right${"`"}, with images
being centered by default. These settings are all optional._

![](https://assets.digitalocean.com/public/mascot.png)

## Step 2 — Code

This is ${"`"}inline code${"`"}. This is a <^>variable<^>. This is an
${"`"}in-line code <^>variable<^>${"`"}. You can also have
[${"`"}code${"`"} in links](https://www.digitalocean.com).

Examples can have line numbers, and every code block has a 'Copy' button to copy
just the code:

${"```"}js
const test = 'hello';
const other = 'world';
console.log(test, other);

${"```"}
`;

export const [scrollRatio, setScrollRatio] = createSignal(0);

const Editor: Component = () => {
  let editor_ref: HTMLDivElement | undefined;

  onMount(() => {
    if (!editor_ref) {
      return;
    }

    const ed = editor.create(editor_ref, {
      value: editorContent(),
      language: "markdown",
      wordBasedSuggestions: "off",
      autoIndent: "advanced",
      theme: "vs-dark",
      wordWrap: "on",
      renderWhitespace: "all",
      renderLineHighlight: "gutter",
      smoothScrolling: true,
      accessibilityPageSize: 1000,
    });

    ed.onDidChangeModelContent(() => {
      const markdownContent = ed.getValue();
      setEditorContent(markdownContent);
    });

    ed.onDidScrollChange(() => {
      const editorScrollTop = ed.getScrollTop();
      const editorScrollHeight = ed.getScrollHeight();
      setScrollRatio(Math.ceil(editorScrollTop / editorScrollHeight));
    });

    const updateEditorLayout = () => {
      ed.layout();
    };

    let lastDevicePixelRatio = window.devicePixelRatio;
    const checkZoom = setInterval(() => {
      if (window.devicePixelRatio !== lastDevicePixelRatio) {
        lastDevicePixelRatio = window.devicePixelRatio;
        updateEditorLayout();
      }
    }, 100);

    window.addEventListener("resize", updateEditorLayout);

    onCleanup(() => {
      ed.dispose();
      clearInterval(checkZoom);
    });
  });

  return <div ref={editor_ref} class="flex-1 max-w-[50%]"></div>;
};

export default Editor;
