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
  return html.replace(/(\r\n|\n|\r|\t)/gm, " ").replace(/\s\s+/gm, ' ').replace(/(\\)/gm, "\\\\");
}
