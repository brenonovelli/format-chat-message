interface HTMLProps {
  [key: string]: string | undefined;
}
interface FormatOptionsProps {
  [key: string]: boolean;
}
interface FormatProps {
  [key: string]: Function;
}

interface CustomRegex {
  breakline?: RegExp;
  htmlTags?: RegExp;
  url?: RegExp;
  phone?: RegExp;
}
interface ShouldFormatProps {
  htmlTags?: boolean;
  url?: boolean;
  phone?: boolean;
  breakline?: boolean;
}
interface FuncProps {
  message: string;
  customRegex?: CustomRegex;
  shouldFormat?: ShouldFormatProps;
}

const regexDefault = {
  htmlTags: /([*~_]|```)([a-zA-Z0-9*_~].+?)\1(?!\w)/g,
  url: /(?:(?:https|http):\/\/|\b(?:[a-z\d]+\.))[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/gim,
  phone: /(?:(?:\(?(\d{2,11})\))|(?:(\d{2,11})))?[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. <\s]/gm,
  breakline: /\n/g,
};

const htmlTags: HTMLProps = {
  "*": "strong",
  "~": "strike",
  _: "em",
  "```": "code",
};

const shouldFormatDefault = {
  htmlTagsDefault: true,
  urlDefault: true,
  phoneDefault: true,
  breaklineDefault: true,
};

const cleanURLPhone = (match: string) => match.replace(/[-. <]$/, "");

const formatter = {
  /**
   * Handle HTML Tags. Settings on array htmlTags
   */
  htmlTags: (match: string, p1: string, p2: string) =>
    `<${htmlTags[p1]}>${p2}</${htmlTags[p1]}>`,
  /**
   * Handle links
   */
  link: (match: string) =>
    `<a href="${match}" target="_blank"  rel="noreferrer noopener">${match}</a>`,
  /**
   * Handle phones numbers
   * The contained Replaces are for moving unwanted characters out of the link
   */
  phone: (match: string) =>
    `<a href="tel:${cleanURLPhone(
      match
    )}" target="_blank"  rel="noreferrer noopener">${cleanURLPhone(match)}</a>${
      match.match(/[-. <]$/)?.[0]
    }`,
  /**
   * Handle breaklines
   */
  breakline: () => "<br />",
};

const formatChatMessage = ({
  message,
  customRegex,
  shouldFormat,
}: FuncProps) => {
  const regex = {
    htmlTags: customRegex?.htmlTags || regexDefault.htmlTags,
    url: customRegex?.url || regexDefault.url,
    phone: customRegex?.phone || regexDefault.phone,
    breakline: customRegex?.breakline || regexDefault.breakline,
  };

  const formatOption: FormatOptionsProps = {
    htmlTags:
      typeof shouldFormat?.htmlTags !== "undefined"
        ? shouldFormat.htmlTags
        : shouldFormatDefault.htmlTagsDefault,
    url:
      typeof shouldFormat?.url !== "undefined"
        ? shouldFormat.url
        : shouldFormatDefault.urlDefault,

    phone:
      typeof shouldFormat?.phone !== "undefined"
        ? shouldFormat.phone
        : shouldFormatDefault.phoneDefault,
    breakline:
      typeof shouldFormat?.breakline !== "undefined"
        ? shouldFormat.breakline
        : shouldFormatDefault.breaklineDefault,
  };

  const format: FormatProps = {
    htmlTags: (msg: string) => msg.replace(regex.htmlTags, formatter.htmlTags),
    url: (msg: string) => msg.replace(regex.url, formatter.link),
    phone: (msg: string) => msg.replace(regex.phone, formatter.phone),
    breakline: (msg: string) =>
      msg.replace(regex.breakline, formatter.breakline),
  };

  const formattedMessage = Object.keys(formatOption).reduce(
    (acc, item) =>
      formatOption[`${item}`] === true ? format[`${item}`](acc) : acc,
    message
  );

  return formattedMessage;
};

export { formatChatMessage };
