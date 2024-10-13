import { createSignal, type Component } from "solid-js";
import Editor, { DEFAULT_TEXT } from "./components/editor";
import Previewer from "./components/preview";
import logo from "./assets/logo.svg";
import github_logo from "./assets/github.logo.svg";

export const [editorContent, setEditorContent] = createSignal(DEFAULT_TEXT);

const App: Component = () => {
  return (
    <div class="bg-vsDark-background text-vsDark-operator font-mono overflow-hidden">
      <div class=" h-screen  ">
        <div class=" flex justify-between sticky h-10 top-0 px-3 items-center bg-vsDark-line-highlight text-vsDark-operator select-none shadow-lg">
          <span class=" h-8 w-8">
            <img class=" object-contain h-full w-full" src={logo} alt="" />
          </span>
          <a href="https://github.com/liolle/mdPreviewer">
            <img class="  object-contain max-h-8 " src={github_logo} alt="" />
          </a>
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
