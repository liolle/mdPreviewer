import type { Component } from "solid-js";
import Editor from "./components/editor";

const App: Component = () => {
  return (
    <div class=" h-screen flex flex-col relative bg-green-800 select-none">
      <div class=" flex justify-center sticky top-0 items-center bg-neutral-800 text-neutral-50">
        <span>NAVIGATION</span>
      </div>
      <Editor />
    </div>
  );
};

export default App;
