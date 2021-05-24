import fetch from 'node-fetch';
import pkg from 'node-html-parser';
const { parse } = pkg;

fetch('https://www.tokyodev.com/')
  .then(res => res.text())
  .then(body => {
    const parsedBody = parse(body);
    const companyElements = parsedBody.querySelectorAll('.media-object-text > a');
    //companyElements.forEach(element => console.log(element.rawAttrs))
    const companyNames = companyElements.filter(element => element.rawAttrs.match(/href="\/companies\/\w+\/"\w?/))
      .map(element => element.childNodes[0].rawText);
    console.log(companyNames);
  });
