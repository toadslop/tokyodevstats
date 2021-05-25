import fetch from 'node-fetch';
import pkg from 'node-html-parser';
import { getJobsListItems, processResults } from './scraperHelpers.js';
const { parse } = pkg;

(async () => {
  const res = await fetch('https://www.tokyodev.com/');
  const body = await res.text();
  const parsedBody = parse(body);
  const jobsListItems = getJobsListItems(parsedBody);
  const results = processResults(jobsListItems);
  console.log(results);
})();
