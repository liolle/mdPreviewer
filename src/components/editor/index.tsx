import { onMount, type Component } from "solid-js";

const Editor: Component = () => {
  function handleInput(ev: InputEvent) {
    const target = ev.target as HTMLElement;
    if (!target) return;

    console.log(target.innerText);
  }

  return (
    <div class=" h-full w-full bg-slate-100 overflow-y-scroll p-2  ">
      <div
        contentEditable
        role="textbox"
        aria-multiline
        onInput={handleInput}
        class=" editor h-full w-full border border-neutral-800 border-solid rounded-lg p-2"
      >
        <div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Editor;
