import * as cheerio from 'cheerio'
import MicroRdfaParser from './parsers/micro-rdfa-parser.js'
import JsonldParser from './parsers/jsonld-parser.js'

export default function () {
  let $html = null

  const loadCheerioObject = function (_$html) {
    $html = _$html
  }

  const parse = function (html, options) {
    if (!($html && $html.prototype && $html.prototype.cheerio)) {
      $html = cheerio.load(html, options)
    }

    return {
      microdata: safely(() => MicroRdfaParser(html, 'micro')),
      rdfa: safely(() => MicroRdfaParser(html, 'rdfa')),
      jsonld: safely(() => JsonldParser($html))
    }
  }

  return {
    parse,
    loadCheerioObject
  }
}

function safely(op) {
  try {
    return op();
  } catch (err) {
    return {};
  }
}
