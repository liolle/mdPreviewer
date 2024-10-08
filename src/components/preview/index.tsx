import { Factory, tokenize } from "@edllx/md-parser";
import { JSXElement, type Component } from "solid-js";
import { editorContent } from "../editor";
import { TokenToTsxAdapter } from "../editor/mdadapter";

const Previewer: Component = () => {
  const compiler = new TokenToTsxAdapter();

  function compile(source: string): JSXElement {
    return compiler.compile(Factory.ROOT(tokenize(source)));
  }

  return (
    <div class=" h-full w-full bg-slate-100  p-2 overflow-hidden  ">
      <div class=" h-full w-full p-2 overflow-y-scroll border border-neutral-800 border-solid rounded ">
        {compile(editorContent())}
      </div>
    </div>
  );
};

export default Previewer;
