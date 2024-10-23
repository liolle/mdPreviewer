import { Factory, tokenize } from "@edllx/md-parser";
import {
  createEffect,
  createSignal,
  JSXElement,
  onMount,
  type Component,
} from "solid-js";
import { TokenToTsxAdapter } from "./mdadapter";
import { editorContent } from "../../App";
const [scroll_value, set_scroll_value] = createSignal(0);

const Previewer: Component = () => {
  const compiler = new TokenToTsxAdapter();
  let previewer: HTMLDivElement | undefined;

  function compile(source: string): JSXElement {
    return compiler.compile(Factory.ROOT(tokenize(source)));
  }

  function onScroll() {
    if (previewer) {
      set_scroll_value(previewer.scrollTop);
    }
  }

  onMount(() => {
    if (previewer) {
      previewer.scrollTop = scroll_value();
    }
  });

  createEffect(() => {
    if (previewer) {
      // After the content renders, restore the scroll position
      previewer.scrollTop = scroll_value();
    }
  });

  return (
    <div class="flex flex-col h-full w-full bg-vsDark-background text-vsDark-operator   flex-1 ">
      <div
        ref={previewer}
        onScroll={onScroll}
        class=" scrollbar-hidden  h-full w-full p-2 overflow-y-auto  pb-52 laptop:text-[16px] desktop:text-[18px] font-mono"
      >
        {compile(editorContent())}
      </div>
    </div>
  );
};

export default Previewer;
