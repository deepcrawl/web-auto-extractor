import * as cheerio from "cheerio";

export function getCheerioObject(html) {
  let $html;
  if (typeof html === "string") {
    $html = cheerio.load(html, { xmlMode: true });
  } else if (html.prototype.cheerio) {
    $html = html;
  } else {
    throw new Error(
      "Invalid argument: pass valid html string or cheerio object"
    );
  }
  return $html;
}

export function cleanNewlinesMultispaceAndBackslashes(html) {
  return html.trim().replace(/(\r\n|\n|\r|\t)/gm, " ").replace(/\s\s+/gm, ' ').replace(/\\(?!\")/gm, "\\\\");
}

export function getJsonObject(html) {
  const openingBracket = html[0];
  const closingBracket = getClosingBracket(openingBracket);
  if (!closingBracket) return html;

  const { index } = Array.from(html).reduce((acc, char, index) => {
    if (acc.counter === 0 && acc.index && acc.index !== 0) return acc

    if (char === openingBracket) acc.counter += 1;
    if (char === closingBracket) acc.counter -= 1;
    if (acc.counter === 0) acc.index=index + 1;
    
    return acc;
  }, {index: undefined, counter: 0})
  
  if (!index) return html;
  return html.substring(0, index)
}

function getClosingBracket(openingBracket) {
  if (openingBracket === "[") return "]"
  if (openingBracket === "{") return "}"
  return undefined
}
