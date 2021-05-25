export const getJobsListItems = parsedBody =>
  parsedBody.querySelectorAll('.jobs-list-item').slice(1);

export const processResults = jobsListItems => {
  return jobsListItems
    .map(item => {
      const fields = getFields(item);
      if (fields.length != 3) return null;
      const companyName = getCompanyName(fields[0])
      const jobTitle = getJobTitle(fields[1]);
      const tags = getTags(fields[2])
      return { name: companyName, title: jobTitle, tags };
    })
    .filter(item => item);
};

const getFields = row =>
  row.childNodes.filter(column => column?.rawAttrs?.match(/jobs-list-column/));

const getCompanyName = companyField =>
  companyField.childNodes.find(node =>
    node?.rawAttrs?.match(/media-object-text/),
  ).childNodes[0].childNodes[0]?.rawText;

const getJobTitle = jobTitleField => jobTitleField?.childNodes[1].childNodes[0]?.rawText;

const getTags = tagsField => tagsField.childNodes[1].childNodes
  .filter(node => node?.rawAttrs?.match(/class="tag"/))
  .map(node2 => node2.childNodes[0]?.rawText);