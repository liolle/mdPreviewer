import { createSignal, onMount, Show, type Component } from "solid-js";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import markdown from "highlight.js/lib/languages/markdown";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/markdown";
import xml from "highlight.js/lib/languages/xml";
import sql from "highlight.js/lib/languages/sql";
import go from "highlight.js/lib/languages/go";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";

interface CodeBlockType {
  body: string;
  language: string;
}

enum SUPPORTED_LANG {
  JAVASCRIPT = "javascript",
  HTML = "html",
  CSS = "css",
  MARKUP = "markup",
  XML = "xml",
  SVG = "svg",
  AWK = "awk",
  BASH = "bash",
  C = "c",
  CSHARP = "c#",
  CPP = "cpp",
  CMAKE = "cmake",
  CSV = "csv",
  DIFF = "diff",
  DJANGO = "django",
  DOCKER = "docker",
  ELIXIR = "elixir",
  ERLANG = "erlang",
  EXCEL_FORMULA = "excel-formula",
  GIT = "git",
  GO = "go",
  GO_MODULE = "go-module",
  GRADLE = "gradle",
  GRAPHQL = "graphql",
  GROOVY = "groovy",
  HASKELL = "haskell",
  HTTP = "http",
  ICON = "icon",
  J = "j",
  JAVA = "java",
  JAVADOC = "javadoc",
  JSDOC = "jsdoc",
  JSON = "json",
  JSON5 = "json5",
  JS_STACK_TRACE = "jsstacktrace",
  JULIA = "julia",
  LATEX = "latex",
  LISP = "lisp",
  LUA = "lua",
  MAKEFILE = "makefile",
  MARKDOWN = "markdown",
  MATLAB = "matlab",
  MERMAID = "mermaid",
  MONGODB = "mongodb",
  NGINX = "nginx",
  OBJECTIVE_C = "objectivec",
  OCAML = "ocaml",
  ODIN = "odin",
  OZ = "oz",
  PASCAL = "pascal",
  PERL = "perl",
  PHP = "php",
  PHP_DOC = "phpdoc",
  PL_SQL = "plsql",
  POWERSHELL = "powershell",
  PROCESSING = "processing",
  PROLOG = "prolog",
  PUPPET = "puppet",
  PYTHON = "python",
  REACT_JSX = "jsx",
  REACT_TSX = "tsx",
  REGEX = "regex",
  REST = "rest",
  RUBY = "ruby",
  RUST = "rust",
  SASS = "sass",
  SCSS = "scss",
  SCALA = "scala",
  SCHEME = "scheme",
  SOLIDITY = "solidity",
  SQL = "sql",
  SWIFT = "swift",
  TCL = "tcl",
  TEXTILE = "textile",
  TOML = "toml",
  TYPESCRIPT = "typescript",
  URI = "uri",
  VB_NET = "vbnet",
  VIM = "vim",
  VISUAL_BASIC = "visual-basic",
  WEB_ASSEMBLY = "wasm",
  XML_DOC = "xml-doc",
  YAML = "yaml",
  ZIG = "zig",
}

function resolveLang(language: string) {
  const lan = language.trim();

  switch (true) {
    case /c\++|cp+/gi.test(lan):
      return SUPPORTED_LANG.CPP;
    case /c#|csharp/gi.test(lan):
      return SUPPORTED_LANG.CSHARP;
    case /c/gi.test(lan):
      return SUPPORTED_LANG.C;
    case /jascript|js/gi.test(lan):
      return SUPPORTED_LANG.JAVASCRIPT;
    case /typescript|ts/gi.test(lan):
      return SUPPORTED_LANG.TYPESCRIPT;
    case /markdown|md/gi.test(lan):
      return SUPPORTED_LANG.MARKDOWN;
    case /css/gi.test(lan):
      return SUPPORTED_LANG.CSS;
    case /html5|html/gi.test(lan):
      return SUPPORTED_LANG.HTML;
    case /xml/gi.test(lan):
      return SUPPORTED_LANG.XML;
    case /python[123]|python|py/gi.test(lan):
      return SUPPORTED_LANG.PYTHON;
    case /sql/gi.test(lan):
      return SUPPORTED_LANG.SQL;
    case /bash|shell/gi.test(lan):
      return SUPPORTED_LANG.BASH;
    case /go/gi.test(lan):
      return SUPPORTED_LANG.GO;

    default:
      return "";
  }
}

function getInnerHtml(body: string, language: string) {
  switch (language) {
    case SUPPORTED_LANG.JAVASCRIPT:
      hljs.registerLanguage(language, javascript);
      break;
    case SUPPORTED_LANG.TYPESCRIPT:
      hljs.registerLanguage(language, typescript);
      break;
    case SUPPORTED_LANG.MARKDOWN:
      hljs.registerLanguage(language, markdown);
      break;
    case SUPPORTED_LANG.CSS:
      hljs.registerLanguage(language, css);
      break;
    case SUPPORTED_LANG.HTML:
      hljs.registerLanguage(language, html);
      break;
    case SUPPORTED_LANG.XML:
      hljs.registerLanguage(language, xml);
      break;
    case SUPPORTED_LANG.PYTHON:
      hljs.registerLanguage(language, python);
      break;
    case SUPPORTED_LANG.SQL:
      hljs.registerLanguage(language, sql);
      break;
    case SUPPORTED_LANG.BASH:
      hljs.registerLanguage(language, bash);
      break;
    case SUPPORTED_LANG.GO:
      hljs.registerLanguage(language, go);
      break;
    case SUPPORTED_LANG.CPP:
      hljs.registerLanguage(language, cpp);
      break;
    case SUPPORTED_LANG.CSHARP:
      hljs.registerLanguage(language, csharp);
      break;
    case SUPPORTED_LANG.C:
      hljs.registerLanguage(language, c);
      break;
    default:
      return `<span>${body}</span>`;
  }
  return hljs.highlight(body, { language: language }).value;
}

const CodeBlock: Component<CodeBlockType> = (props: CodeBlockType) => {
  const [copied, setCopied] = createSignal(false);
  const [highlighted_code, set_hightlighted_code] = createSignal("");

  const lang = resolveLang(props.language);

  onMount(async () => {
    const code = getInnerHtml(props.body, resolveLang(props.language));
    set_hightlighted_code(code);
  });

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
    <div class=" relative bg-neutral-800 rounded-md p-4 pt-10 flex flex-col gap-2 max-w-[702px] min-h-12">
      <Show
        when={copied()}
        fallback={
          <button
            onclick={copy}
            class=" absolute shadow-md text-sm top-2 right-3 text-neutral-50 cursor-pointer rounded-md px-2 py-1  bg-slate-600 flex justify-center items-center hover:bg-neutral-50 hover:text-neutral-600"
          >
            <span class="">{lang != "" ? lang : "copy"}</span>
          </button>
        }
      >
        <div class="absolute text-sm top-2 right-3 px-2 py-1 flex justify-center items-center  text-neutral-50 select-none">
          <span>Copied</span>
        </div>
      </Show>

      <div class="w-full text-neutral-50  ">
        <pre class=" scrollbar-hidden overflow-x-scroll">
          <code class=" " innerHTML={highlighted_code()}></code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
