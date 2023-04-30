const { normalizeURL, getURLsFromHTML, crawlPage } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>`;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="/path/">
                  Boot.dev Blog
              </a>
          </body>
      </html>`;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">
                    Boot.dev Blog
                </a>
                <a href="/path2/">
                    Boot.dev Blog
                </a>
            </body>
        </html>`;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">
                    Boot.dev Blog
                </a>
                <a href="/path2/">
                    Boot.dev Blog
                </a>
            </body>
        </html>`;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("crawlPage check for ", async () => {
  const actual = await crawlPage(
    "https://wagslane.dev/",
    "https://wagslane.dev/",
    {},
    {}
  );
  const expected = {
    "wagslane.dev": [
      "wagslane.dev/tags",
      "wagslane.dev/about",
      "wagslane.dev/index.xml",
      "wagslane.dev/posts/zen-of-proverbs",
      "wagslane.dev/posts/college-a-solution-in-search-of-a-problem",
      "wagslane.dev/posts/guard-keyword-error-handling-golang",
      "wagslane.dev/posts/no-one-does-devops",
      "wagslane.dev/posts/developers-learn-to-say-no",
      "wagslane.dev/posts/dark-patterns",
      "wagslane.dev/posts/func-y-json-api",
      "wagslane.dev/posts/seo-is-a-scam-job",
      "wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business",
      "wagslane.dev/posts/what-a-crazy-religion",
      "wagslane.dev/posts/collapsing-quality-of-devto",
      "wagslane.dev/posts/keep-your-data-raw-at-rest",
      "wagslane.dev/posts/continuous-deployments-arent-continuous-disruptions",
      "wagslane.dev/posts/kanban-vs-scrum",
      "wagslane.dev/posts/gos-major-version-handling",
      "wagslane.dev/posts/optimize-for-simplicit-first",
      "wagslane.dev/posts/go-struct-ordering",
      "wagslane.dev/posts/managers-that-cant-code",
      "wagslane.dev/posts/leave-scrum-to-rugby",
      "wagslane.dev/posts/a-case-against-a-case-for-the-book-of-mormon",
    ],
    "wagslane.dev/tags": [
      "wagslane.dev/tags/business",
      "wagslane.dev/tags/clean-code",
      "wagslane.dev/tags/devops",
      "wagslane.dev/tags/education",
      "wagslane.dev/tags/golang",
      "wagslane.dev/tags/management",
      "wagslane.dev/tags/philosophy",
      "wagslane.dev/tags/writing",
    ],
    "wagslane.dev/about": [],
    "wagslane.dev/index.xml": [],
    "wagslane.dev/posts/zen-of-proverbs": [],
    "wagslane.dev/posts/college-a-solution-in-search-of-a-problem": [],
    "wagslane.dev/posts/guard-keyword-error-handling-golang": [],
    "wagslane.dev/posts/no-one-does-devops": [],
    "wagslane.dev/posts/developers-learn-to-say-no": [],
    "wagslane.dev/posts/dark-patterns": [],
    "wagslane.dev/posts/func-y-json-api": [],
    "wagslane.dev/posts/seo-is-a-scam-job": [],
    "wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business": [],
    "wagslane.dev/posts/what-a-crazy-religion": [],
    "wagslane.dev/posts/collapsing-quality-of-devto": [],
    "wagslane.dev/posts/keep-your-data-raw-at-rest": [],
    "wagslane.dev/posts/continuous-deployments-arent-continuous-disruptions":
      [],
    "wagslane.dev/posts/kanban-vs-scrum": [],
    "wagslane.dev/posts/gos-major-version-handling": [],
    "wagslane.dev/posts/optimize-for-simplicit-first": [],
    "wagslane.dev/posts/go-struct-ordering": [],
    "wagslane.dev/posts/managers-that-cant-code": [],
    "wagslane.dev/posts/leave-scrum-to-rugby": [],
    "wagslane.dev/posts/a-case-against-a-case-for-the-book-of-mormon": [],
    "wagslane.dev/tags/business": [],
    "wagslane.dev/tags/clean-code": [],
    "wagslane.dev/tags/devops": [],
    "wagslane.dev/tags/education": [],
    "wagslane.dev/tags/golang": [],
    "wagslane.dev/tags/management": [],
    "wagslane.dev/tags/philosophy": [],
    "wagslane.dev/tags/writing": [],
  };
  expect(actual).toEqual(expected);
}, 30000);
