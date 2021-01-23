interface HTMLProps {
  [key: string]: string | undefined;
}

const HTMLtags: HTMLProps = {
  "*": "strong",
  "~": "strike",
  _: "em",
  "```": "code",
};

const formatterTextStyle = (match: string, p1: string, p2: string) =>
  `<${HTMLtags[p1]}>${p2}</${HTMLtags[p1]}>`;

const formatterLink = (match: string) =>
  `<a href="${match}" target="_blank">${match}</a>`;

const formatterPhone = (match: string) =>
  `<a href="tel:${match}" target="_blank">${match.replace(/[-. <]$/, "")}</a>${
    match.match(/[-. <]$/)?.[0]
  }`;

const regexWhatsAppStyles = /(?<!\w)([*~_]|```)([a-zA-Z0-9*_~].+?)\1(?!\w)/g;
const regexURL = /(?:(?:https|http):\/\/|\b(?:[a-z\d]+\.))[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/gim;
const regexPhone = /(?:(?:\(?(\d{2,11})\))|(?:(\d{2,11})))?[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. <\s]/gm;

const formatChatMessage = (messageBody: string) =>
  messageBody
    .replace(/\n/g, "<br />")
    .replace(regexWhatsAppStyles, formatterTextStyle)
    .replace(regexURL, formatterLink)
    .replace(regexPhone, formatterPhone);

export { formatChatMessage };
