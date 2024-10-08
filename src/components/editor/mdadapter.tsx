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
} from "@edllx/md-parser";
import { JSXElement } from "solid-js";
import CodeBlock from "../codeblock";

export class TokenToTsxAdapter implements TokenCompiler<JSXElement> {
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
        element = <h1>{nestedElements()}</h1>;
        break;
      case TOKEN.TOKEN_TYPE.H2:
        element = <h2>{nestedElements()}</h2>;
        break;
      case TOKEN.TOKEN_TYPE.H3:
        element = <h3>{nestedElements()}</h3>;
        break;
      case TOKEN.TOKEN_TYPE.H4:
        element = <h4>{nestedElements()}</h4>;
        break;
      case TOKEN.TOKEN_TYPE.H5:
        element = <h5>{nestedElements()}</h5>;
        break;

      default:
        element = <h6>{nestedElements()}</h6>;
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
          <a href={`${token.body}`} rel="ugc nofollow noopener" target="_blank">
            <img src={`${token.body}`} alt={`${token.name}`} />
          </a>
        );

      default:
        return (
          <a href={`${token.body}`} rel="ugc nofollow noopener" target="_blank">
            {token.name}
          </a>
        );
    }
  }

  #lists(token: ListToken): JSXElement {
    switch (token.type) {
      case TOKEN.TOKEN_TYPE.UL:
        return (
          <ul>{token.children.map((el) => this.#recursiveCompile(el))}</ul>
        );

      default:
        return (
          <li>{token.children.map((el) => this.#recursiveCompile(el))}</li>
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
        element = <span class=" bg-yellow-300">{nestedElements()}</span>;
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
