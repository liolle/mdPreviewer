import { createSignal, Show, type Component } from "solid-js";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

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
  ABAP = "abap",
  ABNF = "abnf",
  ACTION_SCRIPT = "actionscript",
  ADA = "ada",
  AGDA = "agda",
  AL = "al",
  ANTLR4 = "antlr4",
  G4 = "g4",
  APACHE_CONFIGURATION = "apacheconf",
  APEX = "apex",
  APL = "apl",
  APPLESCRIPT = "applescript",
  AQL = "aql",
  ARDUINO = "arduino",
  ARFF = "arff",
  ARM_ASSEMBLY = "armasm",
  ARTURO = "arturo",
  ASCIIDOC = "asciidoc",
  ASP_NET = "aspnet",
  ASSEMBLY_6502 = "asm6502",
  ASSEMBLY_ATMEL_AVR = "asmatmel",
  AUTO_HOTKEY = "autohotkey",
  AUTO_IT = "autoit",
  AVI_SYNTH = "avisynth",
  AVRO_IDL = "avro-idl",
  AWK = "awk",
  BASH = "bash",
  BASIC = "basic",
  BATCH = "batch",
  BBCODE = "bbcode",
  BBJ = "bbj",
  BICEP = "bicep",
  BIRB = "birb",
  BISON = "bison",
  BNF = "bnf",
  BQN = "bqn",
  BRAINFUCK = "brainfuck",
  BRIGHT_SCRIPT = "brightscript",
  BRO = "bro",
  BSL = "bsl",
  C = "c",
  CSHARP = "csharp",
  CPP = "cpp",
  CF_SCRIPT = "cfscript",
  CHAI_SCRIPT = "chaiscript",
  CIL = "cil",
  CILK_C = "cilkc",
  CILK_CPP = "cilkcpp",
  CLOJURE = "clojure",
  CMAKE = "cmake",
  COBOL = "cobol",
  COFFEE_SCRIPT = "coffeescript",
  CONCURNAS = "concurnas",
  CONTENT_SECURITY_POLICY = "csp",
  COOKLANG = "cooklang",
  Coq = "coq",
  CRYSTAL = "crystal",
  CSS_EXTRAS = "css-extras",
  CSV = "csv",
  CUE = "cue",
  CYPHER = "cypher",
  D = "d",
  DART = "dart",
  DATA_WEAVE = "dataweave",
  DAX = "dax",
  DHALL = "dhall",
  DIFF = "diff",
  DJANGO = "django",
  JINJA2 = "jinja2",
  DNS_ZONE_FILE = "dns-zone-file",
  DOCKER = "docker",
  DOT = "dot",
  EBNF = "ebnf",
  EDITOR_CONFIG = "editorconfig",
  EIFFEL = "eiffel",
  EJS = "ejs",
  ELIXIR = "elixir",
  ELM = "elm",
  EMBEDDED_LUA_TEMPLATING = "etlua",
  ERB = "erb",
  ERLANG = "erlang",
  EXCEL_FORMULA = "excel-formula",
  FSHARP = "fsharp",
  FACTOR = "factor",
  FALSE = "false",
  FIRESTORE_SECURITY_RULES = "firestore-security-rules",
  FLOW = "flow",
  FORTRAN = "fortran",
  FREEMARKER_TEMPLATE_LANGUAGE = "ftl",
  GAMEMAKER_LANGUAGE = "gml",
  GAP = "gap",
  GCODE = "gcode",
  GD_SCRIPT = "gdscript",
  GEDCOM = "gedcom",
  GETTEXT = "gettext",
  GHERKIN = "gherkin",
  GIT = "git",
  GLSL = "glsl",
  GN = "gn",
  GNU_LINKER_SCRIPT = "linker-script",
  GO = "go",
  GO_MODULE = "go-module",
  GRADLE = "gradle",
  GRAPHQL = "graphql",
  GROOVY = "groovy",
  HAML = "haml",
  HANDLEBARS = "handlebars",
  HASKELL = "haskell",
  HAXE = "haxe",
  HCL = "hcl",
  HLSL = "hlsl",
  HOON = "hoon",
  HTTP = "http",
  HTTP_PUBLIC_KEY_PINS = "hpkp",
  HTTP_STRICT_TRANSPORT_SECURITY = "hsts",
  ICHIGOJAM = "ichigojam",
  ICON = "icon",
  ICU_MESSAGE_FORMAT = "icu-message-format",
  IDRIS = "idris",
  IGNORE = "ignore",
  INFORM_7 = "inform7",
  INI = "ini",
  IO = "io",
  J = "j",
  JAVA = "java",
  JAVADOC = "javadoc",
  JAVADOC_LIKE = "javadoclike",
  JAVA_STACK_TRACE = "javastacktrace",
  JEXL = "jexl",
  JOLIE = "jolie",
  JQ = "jq",
  JSDOC = "jsdoc",
  JS_EXTRAS = "js-extras",
  JSON = "json",
  JSON5 = "json5",
  JSONP = "jsonp",
  JS_STACK_TRACE = "jsstacktrace",
  JS_TEMPLATES = "js-templates",
  JULIA = "julia",
  KEEPALIVED_CONFIGURE = "keepalived",
  KEYMAN = "keyman",
  KOTLIN = "kotlin",
  KUMIR = "kumir",
  KUSTO = "kusto",
  LATEX = "latex",
  LATTE = "latte",
  LESS = "less",
  LILYPOND = "lilypond",
  LIQUID = "liquid",
  LISP = "lisp",
  LIVESCRIPT = "livescript",
  LLVM = "llvm",
  LOG = "log",
  LOLCODE = "lolcode",
  LUA = "lua",
  MAGMA = "magma",
  MAKEFILE = "makefile",
  MARKDOWN = "markdown",
  MARKUP_TEMPLATING = "markup-templating",
  MATA = "mata",
  MATLAB = "matlab",
  MAXSCRIPT = "maxscript",
  MEL = "mel",
  MERMAID = "mermaid",
  METAFONT = "metafont",
  MIZAR = "mizar",
  MONGODB = "mongodb",
  MONKEY = "monkey",
  MOONSCRIPT = "moonscript",
  N1QL = "n1ql",
  N4JS = "n4js",
  NAND_TO_TETRIS_HDL = "nand2tetris",
  NANINOVEL_SCRIPT = "naniscript",
  NASM = "nasm",
  NEON = "neon",
  NEVOD = "nevod",
  NGINX = "nginx",
  NIM = "nim",
  NIX = "nix",
  NSIS = "nsis",
  OBJECTIVE_C = "objectivec",
  OCAML = "ocaml",
  ODIN = "odin",
  OPENCL = "opencl",
  OPENQASM = "openqasm",
  OZ = "oz",
  PARI_GP = "parigp",
  PARSER = "parser",
  PASCAL = "pascal",
  PASCALIGO = "pascaligo",
  PATROL_SCRIPTING_LANGUAGE = "psl",
  PC_AXIS = "pcaxis",
  PEOPLECODE = "peoplecode",
  PERL = "perl",
  PHP = "php",
  PHP_DOC = "phpdoc",
  PHP_EXTRAS = "php-extras",
  PLANT_UML = "plant-uml",
  PL_SQL = "plsql",
  POWERQUERY = "powerquery",
  POWERSHELL = "powershell",
  PROCESSING = "processing",
  PROLOG = "prolog",
  PROMQL = "promql",
  PROPERTIES = "properties",
  PROTOBUF = "protobuf",
  PUG = "pug",
  PUPPET = "puppet",
  PURE = "pure",
  PUREBASIC = "purebasic",
  PURESCRIPT = "purescript",
  PYTHON = "python",
  QSHARP = "qsharp",
  Q = "q",
  QML = "qml",
  QORE = "qore",
  R = "r",
  RACKET = "racket",
  RAZOR = "razor",
  REACT_JSX = "jsx",
  REACT_TSX = "tsx",
  REASON = "reason",
  REGEX = "regex",
  REGO = "rego",
  RENPY = "renpy",
  RESCRIPT = "rescript",
  REST = "rest",
  RIP = "rip",
  ROBOCONF = "roboconf",
  ROBOT_FRAMEWORK = "robotframework",
  RUBY = "ruby",
  RUST = "rust",
  SAS = "sas",
  SASS = "sass",
  SCSS = "scss",
  SCALA = "scala",
  SCHEME = "scheme",
  SHELL_SESSION = "shell-session",
  SMALI = "smali",
  SMALLTALK = "smalltalk",
  SMARTY = "smarty",
  SML = "sml",
  SOLIDITY = "solidity",
  SOLUTION_FILE = "solution-file",
  SOY = "soy",
  SPARQL = "sparql",
  SPLUNK_SPL = "splunk-spl",
  SQF = "sqf",
  SQL = "sql",
  SQUIRREL = "squirrel",
  STAN = "stan",
  STATA_ADO = "stata",
  STRUCTURED_TEXT = "iecst",
  STYLUS = "stylus",
  SUPERCOLLIDER = "supercollider",
  SWIFT = "swift",
  SYSTEMD = "systemd",
  T4_TEMPLATING = "t4-templating",
  T4_CSHARP = "t4-cs",
  T4_VB = "t4-vb",
  TAP = "tap",
  TCL = "tcl",
  TEMPLATE_TOOLKIT_2 = "tt2",
  TEXTILE = "textile",
  TOML = "toml",
  TREMOR = "tremor",
  TURTLE = "turtle",
  TWIG = "twig",
  TYPESCRIPT = "typescript",
  TYPOSCRIPT = "typoscript",
  UNREALSCRIPT = "unrealscript",
  UO_RAZOR_SCRIPT = "uorazor",
  URI = "uri",
  V = "v",
  VALA = "vala",
  VB_NET = "vbnet",
  VELOCITY = "velocity",
  VERILOG = "verilog",
  VHDL = "vhdl",
  VIM = "vim",
  VISUAL_BASIC = "visual-basic",
  WARP_SCRIPT = "warpscript",
  WEB_ASSEMBLY = "wasm",
  WEB_IDL = "web-idl",
  WGSL = "wgsl",
  WIKI = "wiki",
  WOLFRAM = "wolfram",
  WREN = "wren",
  XEORA = "xeora",
  XML_DOC = "xml-doc",
  XOJO = "xojo",
  XQUERY = "xquery",
  YAML = "yaml",
  YANG = "yang",
  ZIG = "zig",
}

function resolveLang(language: string) {
  const lan = language.trim();
  console.log(language);

  switch (true) {
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

    default:
      return SUPPORTED_LANG.JAVASCRIPT;
  }
}

function getInnerHtml(body: string, language: string) {
  const resolved_lan = resolveLang(language);
  return Prism.highlight(
    body,
    Prism.languages[resolved_lan] || Prism.languages.javascript,
    resolved_lan
  );
}

const CodeBlock: Component<CodeBlockType> = (props: CodeBlockType) => {
  const [copied, setCopied] = createSignal(false);
  console.log(props.body);
  console.log(props.language);

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
    <div class=" relative bg-neutral-800 rounded-md py-3 px-4 flex flex-col gap-2 max-w-[638px]">
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
        <span>{resolveLang(props.language)}&#8203;</span>
      </div>
      <div class="  w-[80%] text-neutral-50 ">
        <pre>
          <code
            class=""
            innerHTML={getInnerHtml(props.body, props.language)}
          ></code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
