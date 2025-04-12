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
import { debounce } from "../../utils";

export const DEFAULT_TEXT = `

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Emphasis

**This is bold text**

_This is italic text_

==Marked text==

~~Strikethrough~~

## Lists

Unordered

- Create a list by starting a line with ${"`"}-${"`"}
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

##### Ordered
1. first ol
22. second ol
44. test
  - nested ul
  1. first nested ol
  2. second nested ol
3. third ol
  1. other nested ol

## Code

${"`"}Inline code${"`"}

Block code "fences"

${"```"}
  Sample text here...
${"```"}

Syntax highlighting

${"```"} js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
${"```"}

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")


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
      ed.layout({ width: 0, height: 0 });
      window.requestAnimationFrame(() => {
        const rect = editor_ref.getBoundingClientRect();
        ed.layout({ width: rect.width, height: rect.height });
      });
    };

    let lastDevicePixelRatio = window.devicePixelRatio;
    const checkZoom = setInterval(() => {
      if (window.devicePixelRatio !== lastDevicePixelRatio) {
        lastDevicePixelRatio = window.devicePixelRatio;
        updateEditorLayout();
      }
    }, 100);

    const debounced = debounce(() => {
      updateEditorLayout();
    }, 100);

    window.addEventListener("resize", debounced);

    onCleanup(() => {
      ed.dispose();
      clearInterval(checkZoom);
    });
  });

  return <div ref={editor_ref} class="flex-1 max-w-[50%]"></div>;
};

export default Editor;
