import type { Component } from "solid-js";
import Editor from "./components/editor";
import Previewer from "./components/preview";

const App: Component = () => {
  return (
    <div class=" h-screen flex flex-col relative bg-green-800 ">
      <div class=" flex justify-center sticky top-0 items-center bg-neutral-800 text-neutral-50 select-none">
        <span>NAVIGATION</span>
      </div>
      <div class=" flex h-full w-full overflow-hidden ">
        <Editor />
        <Previewer />
      </div>
    </div>
  );
};

export default App;
