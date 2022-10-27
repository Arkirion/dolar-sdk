// need to required like this to be use on web  https://github.com/jsdom/jsdom/issues/1284#issuecomment-154397199
const JSDOM = require('jsdom');

class HTMLParser {
  rawHTML: string;
  document: Document;
  constructor(rawHTML: string) {
    this.rawHTML = rawHTML;
    this.parseRawHtml();
  }

  private parseRawHtml(): void {
    try {
      this.document = new JSDOM(this.rawHTML).window.document;
    } catch (error) {
      throw new Error(`Error trying to parse raw html : ${error}`);
    }
  }

  public querySelector(selector: string): Element {
    return this.document.querySelector(selector);
  }

  public findText(selector: string): string {
    return this.querySelector(selector).textContent;
  }
}

export default HTMLParser;
