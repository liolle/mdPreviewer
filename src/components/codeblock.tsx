import { createSignal, Show, type Component } from "solid-js";

interface CodeBlockType {
  body: string;
  language: string;
}

const CodeBlock: Component<CodeBlockType> = (props: CodeBlockType) => {
  const [copied, setCopied] = createSignal(false);

  async function copy() {
    if (copied()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(props.body);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div class=" relative bg-neutral-800 rounded-md py-3 px-4 flex flex-col gap-2">
      <Show
        when={copied()}
        fallback={
          <button
            onclick={copy}
            class=" absolute top-2 right-3 text-neutral-50 cursor-pointer rounded-md p-1 h-6 w-6 bg-slate-600 flex justify-center items-center hover:bg-neutral-50 hover:text-neutral-600"
          >
            <span>o</span>
          </button>
        }
      >
        <div class="absolute top-2 right-3 text-neutral-50 select-none">
          Copied
        </div>
      </Show>
      <div class="text-neutral-50 font-thin text-md">
        <span>{props.language != "" ? props.language : ""}&#8203;</span>
      </div>
      <div class="  w-[80%] text-neutral-50 font-bold text-sm">
        {props.body}
      </div>
    </div>
  );
};

export default CodeBlock;
