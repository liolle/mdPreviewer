import type { Component } from "solid-js";
import Editor from "./components/editor";
import Previewer from "./components/preview";

const App: Component = () => {
  return (
    <div class="bg-vsDark-background text-vsDark-operator font-mono overflow-hidden">
      <div class=" h-screen  ">
        <div class=" flex justify-center sticky h-10 top-0 items-center bg-vsDark-line-highlight text-vsDark-operator select-none shadow-lg">
          <span>NAVIGATION</span>
        </div>
        <div class=" hidden laptop:flex h-full w-full overflow-hidden ">
          <Editor />
          <Previewer />
        </div>
        <div class=" h-full w-full flex justify-center items-center overflow-hidden laptop:hidden">
          <span> Working on small screen layout </span>
        </div>
      </div>
    </div>
  );
};

export default App;
