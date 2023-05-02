const { JSDOM } = require("jsdom");

//crawlPage() is the main logic for crawling through various pages, which takes parameters:
// baseURL - startingURL for the crawling process
// currentURL - currentURL being crawled/processed
// pages - key:value pairs where key is the url of the page & value is an array of urls present in the page
// visited - object that is used to show which urls have already been crawled
async function crawlPage(baseURL, currentURL, pages, visited) {
  //try catch block
  try {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
  
    //This condition is present so as to make sure that we dont add external site links
    if (baseURLObj.hostname !== currentURLObj.hostname) {
      return pages;
    }
  
    //normalizing URL so as to remove inconsistencies
    const normalizedCurrentURL = normalizeURL(currentURL);
  
    //If the current url has no entry than create a new entry with an empty array
    if (pages[normalizedCurrentURL] == null) pages[normalizedCurrentURL] = [];
  
    //If already visited then stop the process here
    if (visited[normalizedCurrentURL]) {
      return pages;
    }
  
    //If not visited, make it visited & log we are currently crawling said website
    visited[normalizedCurrentURL] = 1;
    console.log(`actively crawling: ${currentURL}`);

    //Fetching current url
    const resp = await fetch(currentURL);

    //log error if url cant be fetched due to some server or client error
    if (resp.status > 399) {
      console.log(
        `Error in fetch with status code: ${resp.status} on page: ${currentURL}`
      );
      return pages;
    }

    //logic to make sure the fetched data is a html file & not any other resource/content type
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Non HTML response, content type: ${contentType} on page: ${currentURL}`
      );
      return pages;
    }

    //if all above checks are passed, then get the htmlBody using the previous response of fetch
    const htmlBody = await resp.text();

    //use getURLsFromHTML helper function to get all urls in the current htmlBody
    const nextURLs = getURLsFromHTML(htmlBody, baseURLObj.origin);
    for (const nextURL of nextURLs) {
      const normalizedChildURL = normalizeURL(nextURL);
      const childURL = new URL(nextURL);
      //if pages keys doesnt have child i.e. that url hasnt been calculated
      //also since i dont want self links to be present I put the 2nd condition
      //and to make sure all childs being stored are of same hostname, we use the 3rd condition
      //upon satisfying the conditions we update pages
      if (
        !Object.keys(pages).includes(normalizedChildURL) &&
        normalizedChildURL !== normalizedCurrentURL &&
        childURL.hostname === baseURLObj.hostname
      ) {
        pages[normalizedCurrentURL].push(normalizedChildURL);
        if (pages[normalizedChildURL] == null) pages[normalizedChildURL] = [];
      }
    }

    //finally for every url you will perform the crawlPage function
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages, visited);
    }
  } catch (err) {
    console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`);
  }
  return pages;
}

//This function is used for getting all urls from the given htmlBody
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (!linkElement.href.startsWith("http")) {
      try {
        const urlObj = new URL(baseURL + linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative URL: ${err.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with absolute URL: ${err.message}`);
      }
    }
  }
  return urls;
}

//This function is used to normalize the given url
function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
