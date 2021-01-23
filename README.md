# Format Chat Message

A lib to format messages received through APIs of the main messengers, such as WhatsApp and Facebook. Botmaker integration out of the box. Convert from Markdown to HTML tags.

Integration with platforms like Botmaker.

### Install

```
npm install --save format-chat-message
```

### Usage

````jsx
import { formatChatMessage } from "format-chat-message";

export default function App() {
  const messageBody =
    "Olá, o item *cenoura orgânica 01 bandeja* está em falta*.\n\nIremos* realizar a troca por:\n*Cenoura Palito Processado* e também _italico_ e ~tachado~. https://newtail.com.br/simple/5b6f-11eb-952f-e51d98fc81fe e um trecho de código ```code is very beautiful```.\n\n\n_*Produtos em falta podem podem variar a cada turno._\n\n\nVocê pode falar conosco no www.nossosite.com ou no telefone 21123456454\n ou no 112232432343.";

  return (
    <div className="App">
      <div
        className="text"
        dangerouslySetInnerHTML={{
          __html: formatChatMessage(messageBody),
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
    href="https://newtail.com.br/simple/5b6f-11eb-952f-e51d98fc81fe"
    target="_blank"
    >https://newtail.com.br/simple/5b6f-11eb-952f-e51d98fc81fe</a
  >
  e um trecho de código <code>code is very beautiful</code>.
  <br />
  <br />
  <br />
  <em>*Produtos em falta podem podem variar a cada turno.</em>
  <br />
  <br />
  <br />
  Você pode falar conosco no
  <a href="www.nossosite.com" target="_blank">www.nossosite.com</a> ou no
  telefone <a href="tel:21123456454<" target="_blank">21123456454</a>
  <br />
  ou no <a href="tel:112232432343." target="_blank">112232432343</a>.
</div>
```

## LICENSE

This project is licensed under the [MIT License](LICENSE.md).

###### Made with ❤️ by [BRENO](https://breno.com.br).
