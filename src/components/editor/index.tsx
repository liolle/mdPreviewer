import { onMount, type Component } from "solid-js";

const interceptList = ["Enter"];

const Editor: Component = () => {
  function handleEvent(ev: InputEvent) {
    const target = ev.target as HTMLElement;
    if (!target) return;

    console.log(target.innerText);
  }

  function addNode(node: HTMLElement, element: HTMLElement) {
    const rand = Math.random();
    if (node.classList.contains("editor") || rand < 0.5) {
      element.style.backgroundColor = "green";
      node.appendChild(element);
    } else {
      node.after(element);
    }
  }

  function selectElement(node: HTMLElement, selection: Selection) {
    const range = document.createRange();
    const div = document.createElement("div");
    div.appendChild(document.createElement("br"));
    addNode(node, div);
    div.focus();
    range.selectNodeContents(div);
    range.collapse(false);
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  function removeSelected(node: HTMLElement) {
    const editor = document.querySelector(".editor");

    if (!editor) return;
    editor.removeChild(node);
  }

  function handleAction(target: HTMLElement, action: string) {
    const selection = window.getSelection();
    if (
      !selection ||
      !selection.focusNode ||
      !selection.focusNode.parentElement
    )
      return;
    let focused_node: Node | HTMLElement = selection.focusNode as HTMLElement;
    if (!(focused_node instanceof HTMLElement)) {
      if (!focused_node.parentElement) return;
      focused_node = focused_node.parentElement;
    }

    switch (action) {
      case "Enter":
        selectElement(focused_node as HTMLElement, selection);
        break;

      case "Backspace":
        removeSelected(focused_node as HTMLElement);
        break;

      default:
        break;
    }
  }

  function onkeyDown(ev: KeyboardEvent) {
    if (interceptList.includes(ev.key)) {
      ev.preventDefault();
      ev.stopPropagation();
      const target = ev.target as HTMLElement;
      if (!target) return;
      handleAction(target, ev.key);
    }
  }

  function onkeyUp(ev: KeyboardEvent) {
    // console.log(ev);
  }

  function onClick(ev: MouseEvent) {
    if (!ev.target) return;

    const targetElement = ev.target as HTMLElement;
  }

  return (
    <div class=" h-full w-full bg-slate-100 overflow-y-scroll p-2  ">
      <div
        contentEditable
        role="textbox"
        aria-multiline
        // onFocus={handleEvent}
        // onBlur={handleEvent}
        // onChange={handleEvent}
        // onKeyPress={handleEvent}
        // onKeyUp={onkeyUp}
        // onKeyDown={onkeyDown}
        // onclick={onClick}
        onInput={handleEvent}
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
