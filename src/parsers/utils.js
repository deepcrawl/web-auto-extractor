import $ from "cheerio";

export function getCheerioObject(html) {
  let $html;
  if (typeof html === "string") {
    $html = $.load(html, { xmlMode: true });
  } else if ($(html).cheerio) {
    $html = html;
  } else {
    throw new Error(
      "Invalid argument: pass valid html string or cheerio object"
    );
  }
  return $html;
}

export function cleanNewlinesAndMultispace(html) {
  return html.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s\s+/g, ' ')
}