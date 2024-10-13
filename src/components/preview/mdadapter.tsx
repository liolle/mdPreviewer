import {
  TOKEN,
  Token,
  TokenCompiler,
  Word,
  NewLine,
  Paragraph,
  LinkToken,
  Heading,
  LINK_TOKEN_TYPE,
  ListToken,
  Decoration,
  InlineCode,
  CodeToken,
  CheckBoxToken,
} from "@edllx/md-parser";
import { JSXElement } from "solid-js";
import CodeBlock from "../codeblock";

export class TokenToTsxAdapter implements TokenCompiler<JSXElement> {
  private elementStyles = {
    h1: "text-4xl font-bold mt-4 mb-2 leading-tight",
    h2: "text-3xl font-bold mt-4 mb-2 leading-tight",
    h3: "text-2xl font-bold mt-3 mb-1 leading-tight",
    h4: "text-xl font-bold mt-2 mb-1 leading-snug",
    h5: "text-lg font-bold mt-1 mb-1 leading-normal",
    h6: "text-base font-bold mt-1 mb-1 leading-normal",
    ul: "ml-6 ",
    li: " list-disc",
    img: " w-52 rounded-md shadow-md object-contain ",
    a: "text-blue-400 hover:text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-blue-400",
  };
  compile(token: Token) {
    return this.#recursiveCompile(token);
  }

  #recursiveCompile(token: Token): JSXElement {
    switch (true) {
      case token instanceof Word:
        return this.#word(token);

      case token instanceof NewLine:
        return this.#newLine(token);

      case token instanceof Paragraph:
        return this.#paragraph(token);

      case token instanceof LinkToken:
        return this.#links(token);

      case token instanceof ListToken:
        return this.#lists(token);

      case token instanceof Heading:
        return this.#heading(token);

      case token instanceof Decoration:
        return this.#decoration(token);

      case token instanceof InlineCode:
        return this.#inlineCode(token);

      case token instanceof CodeToken:
        return this.#codeBlock(token);

      default:
        return this.#default(token);
    }
  }

  #default(token: Token): JSXElement {
    if (token.type != TOKEN.TOKEN_TYPE.ROOT) {
      if (token.type == TOKEN.TOKEN_TYPE.ESCAPE) {
        return <span>{token.body}</span>;
      }
      return <span>{`TODO: ${token.type}`}</span>;
    } else {
      return (
        <div>{token.children.map((el) => this.#recursiveCompile(el))}</div>
      );
    }
  }

  #word(token: Word): JSXElement {
    if (token.children.length == 0) {
      return <span>{token.body}</span>;
    } else {
      return (
        <span>{token.children.map((el) => this.#recursiveCompile(el))}</span>
      );
    }
  }

  #paragraph(token: Paragraph): JSXElement {
    return <p>{token.children.map((el) => this.#recursiveCompile(el))}</p>;
  }

  #heading(token: Heading): JSXElement {
    let element;
    const nestedElements = () => {
      return token.children.map((el) => this.#recursiveCompile(el));
    };
    switch (token.type) {
      case TOKEN.TOKEN_TYPE.H1:
        element = <h1 class={this.elementStyles.h1}>{nestedElements()}</h1>;
        break;
      case TOKEN.TOKEN_TYPE.H2:
        element = <h2 class={this.elementStyles.h2}>{nestedElements()}</h2>;
        break;
      case TOKEN.TOKEN_TYPE.H3:
        element = <h3 class={this.elementStyles.h3}>{nestedElements()}</h3>;
        break;
      case TOKEN.TOKEN_TYPE.H4:
        element = <h4 class={this.elementStyles.h4}>{nestedElements()}</h4>;
        break;
      case TOKEN.TOKEN_TYPE.H5:
        element = <h5 class={this.elementStyles.h5}>{nestedElements()}</h5>;
        break;

      default:
        element = <h6 class={this.elementStyles.h6}>{nestedElements()}</h6>;
        break;
    }

    return element;
  }

  #newLine(token: NewLine): JSXElement {
    return <br />;
  }

  #links(token: LinkToken): JSXElement {
    switch (token.kind) {
      case LINK_TOKEN_TYPE.IMAGE:
        return (
          <a
            class="w-fit"
            href={`${token.body} `}
            rel="ugc nofollow noopener"
            target="_blank"
          >
            <img
              class={`${this.elementStyles.img} `}
              src={`${token.body}`}
              alt={`${token.name}`}
            />
          </a>
        );

      default:
        return (
          <a
            class={`${this.elementStyles.a} `}
            href={`${token.body}`}
            rel="ugc nofollow noopener"
            target="_blank"
          >
            {token.name}
          </a>
        );
    }
  }

  #lists(token: ListToken): JSXElement {
    switch (token.type) {
      case TOKEN.TOKEN_TYPE.UL:
        return (
          <ul class={this.elementStyles.ul}>
            {token.children.map((el) => this.#recursiveCompile(el))}
          </ul>
        );
      case TOKEN.TOKEN_TYPE.CHECK_BOX:
        if (token instanceof CheckBoxToken) {
          return (
            <li class={`${this.elementStyles.ul} flex gap-2 items-center  `}>
              <input type="checkbox" name="" id="" checked={token.checked} />
              {token.children.map((el) => this.#recursiveCompile(el))}
            </li>
          );
        }

      default:
        return (
          <li class={this.elementStyles.li}>
            {token.children.map((el) => this.#recursiveCompile(el))}
          </li>
        );
    }
  }

  #decoration(token: Decoration): JSXElement {
    let element;
    const nestedElements = () => {
      return token.children.map((el) => this.#recursiveCompile(el));
    };
    switch (token.type) {
      case TOKEN.TOKEN_TYPE.ITALIC:
        element = <i>{nestedElements()}</i>;
        break;
      case TOKEN.TOKEN_TYPE.BOLD:
        element = <strong>{nestedElements()}</strong>;
        break;
      case TOKEN.TOKEN_TYPE.STRIKETHROUGH:
        element = <s>{nestedElements()}</s>;
        break;
      case TOKEN.TOKEN_TYPE.HIGHLIGHT:
        element = <span class=" bg-yellow-300 ">{nestedElements()}</span>;
        break;
      case TOKEN.TOKEN_TYPE.INLINE_CODE:
        element = <code>{nestedElements()}</code>;
        break;

      default:
        element = <span>{nestedElements()}</span>;
        break;
    }

    return element;
  }

  #inlineCode(token: InlineCode) {
    return <code>{token.body}</code>;
  }

  #codeBlock(token: CodeToken) {
    return <CodeBlock body={token.body} language={token.language} />;
  }
}
