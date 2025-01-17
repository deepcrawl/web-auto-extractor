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
  if (!closingBracket) return JSON.parse(html);
  return extractJson(html, closingBracket);
}

function extractJson(html, closingBracket) {
  const closingBracketIndex = html.lastIndexOf(closingBracket);
  if (closingBracketIndex === -1) throw Error("Not able to extract json");
  const jsonCandidate = html.substring(0, closingBracketIndex + 1);
  try {
    return JSON.parse(jsonCandidate);
  } catch (e) {
    return extractJson(html.substring(0, closingBracketIndex), closingBracket);
  }
}

function getClosingBracket(openingBracket) {
  if (openingBracket === "[") return "]"
  if (openingBracket === "{") return "}"
  return undefined
}
