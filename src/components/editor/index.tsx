import { createSignal, type Component } from "solid-js";

export const [editorContent, setEditorContent] = createSignal("");

const Editor: Component = () => {
  function removeFormatting(ev: ClipboardEvent) {
    ev.preventDefault();
    const data = ev.clipboardData;
    if (!data) return;
    const text = data.getData("text");
    document.execCommand("insertText", false, text);
  }

  function handleInput(ev: InputEvent) {
    const target = ev.target as HTMLElement;
    if (!target) return;
    console.log(target.innerText);

    setEditorContent(target.innerText);
  }

  return (
    <div class=" h-full w-full bg-slate-100  p-2 overflow-hidden ">
      <div
        contentEditable
        role="textbox"
        aria-multiline
        onInput={handleInput}
        onpaste={removeFormatting}
        spellcheck={false}
        class=" editor h-full w-full border border-neutral-800 border-solid rounded overflow-y-scroll p-2 "
      >
        <div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Editor;
