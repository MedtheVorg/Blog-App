//  =================Script=====================
const pages = [
  'https://www.massmember.com/products/mass-subscription?page=1',
  'https://www.massmember.com/products/mass-subscription?page=2',
  'https://www.massmember.com/products/mass-subscription?page=3',
  'https://www.massmember.com/products/mass-subscription?page=4',
  'https://www.massmember.com/products/mass-subscription?page=5',
  'https://www.massmember.com/products/mass-subscription?page=6',
  'https://www.massmember.com/products/mass-subscription?page=7',
  'https://www.massmember.com/products/mass-subscription?page=8',
];
const pdfLinks = [];
async function fetchArticles(pageUrl) {
  const response = await fetch(pageUrl);
  const htmlContent = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const articles = Array.from(
    doc
      .querySelector(
        '[kjb-settings-id="sections_product_syllabus_settings_type"]'
      )
      .querySelectorAll('.syllabus__item > a')
  ).map((article) => article.href);

  articles.forEach(async (article) => {
    await fetchDownloadPage(article);
  });
}

async function fetchDownloadPage(articleUrl) {
  const response = await fetch(articleUrl);
  const htmlContent = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const downloadLinkUrl = doc
    .querySelector('.syllabus__heading')
    .nextElementSibling.querySelector('a').href;

  await fetchPdfLink(downloadLinkUrl);
}

async function fetchPdfLink(pdfUrl) {
  const response = await fetch(pdfUrl);
  const htmlContent = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const pdfDownloadLink = doc
    .querySelector('.panel__sub-title')
    .nextElementSibling.querySelector('a').href;
  const volumeTitle = doc.querySelector('.panel__sub-title').textContent;
  pdfLinks.push([volumeTitle, pdfDownloadLink]);
}

async function Execute() {
  console.log('==========  Script Started ===============');
  pages.forEach(async (page) => {
    await fetchArticles(page);
  });
  console.log('==========  Script finished ===============');
  console.log('======Data========');
  console.log(pdfLinks);
}

// uncomment to execute the script
// Execute();

const links = [
  [
    'Volume 1, Issue 2',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/ISSUE+2.pdf',
  ],
  [
    'Volume 1, Issue 6',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Issue+6.pdf',
  ],
  [
    'Volume 1, Issue 4',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/MASS+Issue+4.pdf',
  ],
  [
    'Volume 1, Issue 7',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Issue+7.pdf',
  ],
  [
    'Volume 1, Issue 5',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/MASS+Issue+5.pdf',
  ],
  [
    'Volume 1, Issue 8',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Issue+8/Issue+8.pdf',
  ],
  [
    'Volume 1, Issue 1',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/MASS+Sample+Issue.pdf',
  ],
  [
    'Volume 1, Issue 9',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Issue+9/Issue+9.pdf',
  ],
  [
    'Volume 1, Issue 3',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/MASS+Issue+3.pdf',
  ],
  [
    'Volume 2, Issue 12',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+12/MASS+Vol+2+Issue+12-uW9%40q.pdf',
  ],
  [
    'Volume 2, Issue 11',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+11/MASS+Vol+2+Issue+11-drkbn.pdf',
  ],
  [
    'Volume 2, Issue 10',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+10/MASS+Vol+2+Issue+10-ffjks.pdf',
  ],
  [
    'Volume 2, Issue 9',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+9/Vol+2+Issue+9-DQt8R8.pdf',
  ],
  [
    'Volume 2, Issue 8',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+8/MASS+Vol+2+Issue+8-pass145.pdf',
  ],
  [
    'Volume 2, Issue 7',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+7/MASS+Vol+2+Issue+7.pdf',
  ],
  [
    'Volume 2, Issue 6',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+6/MASS+Vol+2+Issue+6.pdf',
  ],
  [
    'Volume 2, Issue 5',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+5/MASS+Vol+2+Issue+5.pdf',
  ],
  [
    'Volume 2, Issue 4',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+4/MASS+Vol+2+Issue+4.pdf',
  ],
  [
    'Volume 2, Issue 3',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+3/Vol+2+Issue+3.pdf',
  ],
  [
    'Volume 2, Issue 2',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+2/Vol+2+Issue+2.pdf',
  ],
  [
    'Volume 2, Issue 1',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+1/Vol+2+Issue+1.pdf',
  ],
  [
    'Volume 3, Issue 8',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3+Issue+8/MASS+Volume+3%2C+Issue+8.pdf',
  ],
  [
    'Volume 3, Issue 11',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3%2C+Issue+11/Volume+3%2C+Issue+11.pdf',
  ],
  [
    'Volume 3, Issue 10',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+3+Issue+10/MASS+Volume+3%2C+Issue+10.pdf',
  ],
  [
    'Volume 3, Issue 12',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3+Issue+12/MASS+Volume+3%2C+Issue+12.pdf',
  ],
  [
    'Volume 3, Issue 9',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3%2C+Issue+9/MASS+Volume+3%2C+Issue+9.pdf',
  ],
  [
    'Volume 3, Issue 7',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3+Issue+7/MASS+Volume+3%2C+Issue+7-k4D3%40.pdf',
  ],
  [
    'Volume 3, Issue 6',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3+Issue+6/MASS+Volume+3%2C+Issue+6-j2M5!.pdf',
  ],
  [
    'Volume 3, Issue 4',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+3+Issue+4/MASS+Volume+3%2C+Issue+4.pdf',
  ],
  [
    'Volume 3, Issue 3',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+3+Issue+3/MASS+Volume+3+Issue+3-xWBP9Y.pdf',
  ],
  [
    'Volume 3, Issue 2',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+3+Issue+2/MASS+Vol+3+Issue+2-gO8%26J.pdf',
  ],
  [
    'Volume 3, Issue 1',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+3+Issue+1/MASS+Vol+3+Issue+1-yR%25u9.pdf',
  ],
  [
    'Volume 3, Issue 5',
    'https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Volume+3+Issue+5/MASS+Volume+3%2C+Issue+5.pdf',
  ],
  [
    'Volume 4, Issue 3',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+3/MASS+Volume+4+Issue+3.pdf',
  ],
  [
    'Volume 4, Issue 4',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+4/MASS+Volume+4%2C+Issue+4.pdf',
  ],
  [
    'Volume 4, Issue 5',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4%2C+Issue+5/MASS_May2020_Volume4Issue5.pdf',
  ],
  [
    'Volume 4, Issue 2',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+2/Volume+4%2C+Issue+2.pdf',
  ],
  [
    'Volume 4, Issue 1',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+1/MASS+Volume+4%2C+Issue+1.pdf',
  ],
  [
    'Volume 4, Issue 12',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+12/MASS+Vol+4+Issue+12.pdf',
  ],
  [
    'Volume 4, Issue 10',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+10/MASS_Oct2020_v2.pdf',
  ],
  [
    'Volume 4, Issue 9',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+9/MASS_Sept2020_v4.pdf',
  ],
  [
    'Volume 4, Issue 8',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+8/MASS_August2020_v2.pdf',
  ],
  [
    'Volume 4, Issue 7',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+7/MASS_July2020_v2.pdf',
  ],
  [
    'Volume 4, Issue 6',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+4%2C+Issue+6/MASS_June2020_F.pdf',
  ],
  [
    'Volume 4, Issue 11',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+11/MASS_2020_11-v2.pdf',
  ],
  [
    'Volume 5, Issue 3',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+5%2C+Issue+3/MASS_2021_03-v2.pdf',
  ],
  [
    'Volume 5, Issue 2',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+5+Issue+2/MASS_2021_02-v2.pdf',
  ],
  [
    'Volume 5, Issue 1',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+5+Issue+1/MASS_2021_01-v2.pdf',
  ],
  [
    'Volume 5 Issue 12',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+12/MASS_2021_12-v2.pdf',
  ],
  [
    'Volume 5 Issue 11',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+11/MASS_2021_11-v2.pdf',
  ],
  [
    'Volume 5, Issue 10',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+10/MASS_2021_10-v2.pdf',
  ],
  [
    'Volume 5, Issue 9',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+9/MASS_2021_09-v2.pdf',
  ],
  [
    'Volume 5, Issue 8',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+8/MASS_2021_08-v2.pdf',
  ],
  [
    'Volume 5, Issue 7',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+7/MASS+Vol+5+Issue+7.pdf',
  ],
  [
    'Volume 5, Issue 6',
    'https://mass-new.s3-us-west-2.amazonaws.com/Volume+5/Issue+6/MASS_2021_06-v2.pdf',
  ],
  [
    'Volume 5, Issue 5',
    'https://mass-new.s3-us-west-2.amazonaws.com/Volume+5/Issue+5/MASS_2021_05-v2.pdf',
  ],
  [
    'Volume 5, Issue 4',
    'https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+5+Issue+4/MASS_2021_04-v2.pdf',
  ],
  [
    'Volume 6 Issue 1',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+1/MASS_2022_01-v2.pdf',
  ],
  [
    'Volume 6, Issue 11',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+11/MASS_2022_11-v2.pdf',
  ],
  [
    'Volume 6, Issue 10',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+10/MASS_2022_10-v2.pdf',
  ],
  [
    'Volume 6, Issue 9',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+9/MASS_2022_09-v2.pdf',
  ],
  [
    'Volume 6, Issue 8',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+8/MASS_2022_08-v2.pdf',
  ],
  [
    'Volume 6, Issue 7',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+7/MASS_2022_07-v3.pdf',
  ],
  [
    'Volume 6, Issue 6',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+6/MASS_2022_06-v2(1).pdf',
  ],
  [
    'Volume 6, Issue 5',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+5/MASS_2022_05-v2.pdf',
  ],
  [
    'Volume 6, Issue 4',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+4/MASS_2022_04-v2.pdf',
  ],
  [
    'Volume 6, Issue 3',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+3/MASS_2022_03-v2.pdf',
  ],
  [
    'Volume 6 Issue 2',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+2/MASS_2022_02-v2.pdf',
  ],
  [
    'Volume 6, Issue 12',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+12/MASS_2022_12-v2.pdf',
  ],
  [
    'Volume 7, Issue 8',
    'https://mass.s3.us-west-2.amazonaws.com/Volume+7+Issue+8/MASS_2023_08_v1.pdf',
  ],
  [
    'Volume 7, Issue 7',
    'https://mass.s3.us-west-2.amazonaws.com/Volume+7+Issue+7/MASS_2023_07_v1.pdf',
  ],
  [
    'Volume 7, Issue 6',
    'https://mass.s3.us-west-2.amazonaws.com/Volume+7+Issue+6/MASS_2023_06_r2.pdf',
  ],
  [
    'Volume 7, Issue 5',
    'https://mass.s3.us-west-2.amazonaws.com/Volume+7+Issue+5/MASS_2023_05_r2.pdf',
  ],
  [
    'Volume 7, Issue 4',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+7/Issue+4/MASS_2023_04_r1.pdf',
  ],
  [
    'Volume 7, Issue 3',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+7/Issue+3/MASS_2023_03_v1.pdf',
  ],
  [
    'Volume 7, Issue 2',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+7/Issue+2/MASS_2023_02_v2.pdf',
  ],
  [
    'Volume 7, Issue 1',
    'https://mass-new.s3.us-west-2.amazonaws.com/Volume+7/Issue+1/MASS_2023_v2.pdf',
  ],
];

const volume1 = links.filter((link) => link[0].includes('Volume 1'));
const volume2 = links.filter((link) => link[0].includes('Volume 2'));
const volume3 = links.filter((link) => link[0].includes('Volume 3'));
const volume4 = links.filter((link) => link[0].includes('Volume 4'));
const volume5 = links.filter((link) => link[0].includes('Volume 5'));
const volume6 = links.filter((link) => link[0].includes('Volume 6'));
const volume7 = links.filter((link) => link[0].includes('Volume 7'));

const allLinks = volume1.concat(
  volume2,
  volume3,
  volume4,
  volume5,
  volume6,
  volume7
);
console.log('array length', allLinks.length);
allLinks.forEach((element) => {
  console.log(element[1]);
});


https://s3-us-west-2.amazonaws.com/strengtheory/MASS/ISSUE+2.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Issue+6.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/MASS+Issue+4.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Issue+7.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/MASS+Issue+5.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Issue+8/Issue+8.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/MASS+Sample+Issue.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Issue+9/Issue+9.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/MASS+Issue+3.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+12/MASS+Vol+2+Issue+12-uW9%40q.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+11/MASS+Vol+2+Issue+11-drkbn.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+10/MASS+Vol+2+Issue+10-ffjks.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+9/Vol+2+Issue+9-DQt8R8.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+8/MASS+Vol+2+Issue+8-pass145.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+7/MASS+Vol+2+Issue+7.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+6/MASS+Vol+2+Issue+6.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+5/MASS+Vol+2+Issue+5.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+4/MASS+Vol+2+Issue+4.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+3/Vol+2+Issue+3.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+2/Vol+2+Issue+2.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+2+Issue+1/Vol+2+Issue+1.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3+Issue+8/MASS+Volume+3%2C+Issue+8.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3%2C+Issue+11/Volume+3%2C+Issue+11.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+3+Issue+10/MASS+Volume+3%2C+Issue+10.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3+Issue+12/MASS+Volume+3%2C+Issue+12.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3%2C+Issue+9/MASS+Volume+3%2C+Issue+9.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3+Issue+7/MASS+Volume+3%2C+Issue+7-k4D3%40.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+3+Issue+6/MASS+Volume+3%2C+Issue+6-j2M5!.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+3+Issue+4/MASS+Volume+3%2C+Issue+4.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+3+Issue+3/MASS+Volume+3+Issue+3-xWBP9Y.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+3+Issue+2/MASS+Vol+3+Issue+2-gO8%26J.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Vol+3+Issue+1/MASS+Vol+3+Issue+1-yR%25u9.pdf
https://s3-us-west-2.amazonaws.com/strengtheory/MASS/Volume+3+Issue+5/MASS+Volume+3%2C+Issue+5.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+3/MASS+Volume+4+Issue+3.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+4/MASS+Volume+4%2C+Issue+4.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4%2C+Issue+5/MASS_May2020_Volume4Issue5.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+2/Volume+4%2C+Issue+2.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+1/MASS+Volume+4%2C+Issue+1.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+12/MASS+Vol+4+Issue+12.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+10/MASS_Oct2020_v2.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+9/MASS_Sept2020_v4.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+8/MASS_August2020_v2.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+7/MASS_July2020_v2.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Volume+4%2C+Issue+6/MASS_June2020_F.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+4+Issue+11/MASS_2020_11-v2.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+5%2C+Issue+3/MASS_2021_03-v2.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+5+Issue+2/MASS_2021_02-v2.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+5+Issue+1/MASS_2021_01-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+12/MASS_2021_12-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+11/MASS_2021_11-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+10/MASS_2021_10-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+9/MASS_2021_09-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+8/MASS_2021_08-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+5/Issue+7/MASS+Vol+5+Issue+7.pdf
https://mass-new.s3-us-west-2.amazonaws.com/Volume+5/Issue+6/MASS_2021_06-v2.pdf
https://mass-new.s3-us-west-2.amazonaws.com/Volume+5/Issue+5/MASS_2021_05-v2.pdf
https://strengtheory.s3-us-west-2.amazonaws.com/MASS/Vol+5+Issue+4/MASS_2021_04-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+1/MASS_2022_01-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+11/MASS_2022_11-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+10/MASS_2022_10-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+9/MASS_2022_09-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+8/MASS_2022_08-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+7/MASS_2022_07-v3.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+6/MASS_2022_06-v2(1).pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+5/MASS_2022_05-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+4/MASS_2022_04-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+3/MASS_2022_03-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+2/MASS_2022_02-v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+6/Issue+12/MASS_2022_12-v2.pdf
https://mass.s3.us-west-2.amazonaws.com/Volume+7+Issue+8/MASS_2023_08_v1.pdf
https://mass.s3.us-west-2.amazonaws.com/Volume+7+Issue+7/MASS_2023_07_v1.pdf
https://mass.s3.us-west-2.amazonaws.com/Volume+7+Issue+6/MASS_2023_06_r2.pdf
https://mass.s3.us-west-2.amazonaws.com/Volume+7+Issue+5/MASS_2023_05_r2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+7/Issue+4/MASS_2023_04_r1.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+7/Issue+3/MASS_2023_03_v1.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+7/Issue+2/MASS_2023_02_v2.pdf
https://mass-new.s3.us-west-2.amazonaws.com/Volume+7/Issue+1/MASS_2023_v2.pdf