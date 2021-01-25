# Format Chat Message

A lib to format messages received through APIs of the main messengers, such as WhatsApp and Facebook. Botmaker integration out of the box. Convert from messengers syntax to HTML tags.

Integration with platforms like Botmaker.

[View online](https://codesandbox.io/s/format-chat-message-m6x8u)

![Demo](https://raw.githubusercontent.com/brenonovelli/format-chat-message/main/.github/format-chat-message-example.gif)

### Install

```
npm install --save format-chat-message
```

```
yarn add format-chat-message
```

### Usage

```jsx
import { formatChatMessage } from "format-chat-message";

const formattedMessage = formatChatMessage({ message });

// or with custom settings

const formattedMessageWithOptions = formatChatMessage({
  message,
  customRegex,
  options,
});
```

Or

````jsx
import { formatChatMessage } from "format-chat-message";

export default function App() {
  const message =
    "Olá, o item *cenoura orgânica 01 bandeja* está em falta*.\n\nIremos* realizar a troca por:\n*Cenoura Palito Processado* e também _italico_ e ~tachado~. https://market.com.br/simple/5b6f-11eb-952f-e51d98fc81fe e um trecho de código ```code is very beautiful```.\n\n\n_*Produtos em falta podem podem variar a cada turno._\n\n\nVocê pode falar conosco no www.nossosite.com ou no telefone 21123456454\n ou no 112232432343.";

  return (
    <div className="App">
      <div
        className="text"
        dangerouslySetInnerHTML={{
          __html: formatChatMessage({ message }),
        }}
      />
    </div>
  );
}
````

### Result

```html
<div class="text">
  Olá, o item <strong>cenoura orgânica 01 bandeja</strong> está em falta*.<br />
  <br />
  Iremos* realizar a troca por:<br /><strong>Cenoura Palito Processado</strong>
  e também <em>italico</em> e <strike>tachado</strike>.
  <a
    href="https://market.com.br/simple/5b6f-11eb-952f-e51d98fc81fe"
    target="_blank"
  >
    https://market.com.br/simple/5b6f-11eb-952f-e51d98fc81fe
  </a>
  e um trecho de código <code>code is very beautiful</code>.<br />
  <br />
  <br />
  <em>*Produtos em falta podem podem variar a cada turno.</em><br />
  <br />
  <br />
  Você pode falar conosco no
  <a href="www.nossosite.com" target="_blank">www.nossosite.com</a> ou no
  telefone <a href="tel:21123456454" target="_blank">21123456454</a><br />
  ou no <a href="tel:112232432343" target="_blank">112232432343</a>.
</div>
```

---

## Default RegExp

**Messengers syntax such as HTML tags** - [View on regexr](https://regexr.com/5krri)  
` /([*~_]|```)([a-zA-Z0-9*_~].+?)\1(?!\w)/g `

**URL** - [View on regexr](https://regexr.com/5krrf)  
`/(?:(?:https|http):\/\/|\b(?:[a-z\d]+\.))[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/gim`

**Phone** - [View on regexr](https://regexr.com/5kvlk)  
`/(?:(?:\(?(\d{2,11})\))|(?:(\d{2,11})))?[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. <\s]/gm`

**Breakline**  
`/\n/g`

---

## Custom props

````jsx
import { formatChatMessage } from "format-chat-message";

const message =
  "Olá, o item *cenoura orgânica 01 bandeja* está em falta*.\n\nIremos* realizar a troca por:\n*Cenoura Palito Processado* e também _italico_ e ~tachado~. https://market.com.br/simple/5b6f-11eb-952f-e51d98fc81fe e um trecho de código ```code is very beautiful```.\n\n\n_*Produtos em falta podem podem variar a cada turno._\n\n\nVocê pode falar conosco no www.nossosite.com ou no telefone 21123456454\n ou no 112232432343.";

const customRegex = {
  breakline: RegExp, // optional
  htmlTags: RegExp, // optional
  url: RegExp, // optional
  phone: RegExp, // optional
};

// Define what should be formatted. If false, it will not be formatted.
const shouldFormat = {
  breakline: Boolean, // optional
  htmlTags: Boolean, // optional
  url: Boolean, // optional
  phone: Boolean, // optional
};
// or with custom settings

const formattedMessageWithOptions = formatChatMessage({
  message,
  customRegex,
  shouldFormat,
});
````

---

## LICENSE

This project is licensed under the [MIT License](LICENSE.md).

###### Made with ❤️ by [Breno](https://breno.com.br).
