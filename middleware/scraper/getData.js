import fetch from 'node-fetch';
import pkg from 'node-html-parser';
const { parse } = pkg;

fetch('https://www.tokyodev.com/')
  .then(res => res.text())
  .then(body => {
    const parsedBody = parse(body);
    const jobsItems = parsedBody.querySelectorAll('.jobs-list-item').slice(1);
    const results = jobsItems.map(item => {
      const columns = item.childNodes.filter(column => column?.rawAttrs?.match(/jobs-list-column/));
      const companyName = columns[0].childNodes.find(node => node?.rawAttrs?.match(/media-object-text/)).childNodes[0].childNodes[0]?.rawText
      const jobTitle = columns[1]?.childNodes[1].childNodes[0]?.rawText
      const tags = columns[2]?.childNodes[1].childNodes.filter(node => node?.rawAttrs?.match(/class="tag"/)).map(node2 => node2.childNodes[0]?.rawText)
      return { name: companyName, title: jobTitle, tags }
    })
      .filter(item => item.name && item.title && item.tags)
    console.log(results)
  });
