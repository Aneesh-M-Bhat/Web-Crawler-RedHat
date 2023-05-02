const { crawlPage } = require("./crawl.js");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// cors - cross origin resource sharing
app.use(cors());

// routing get HTTP request to crawl
app.get("/crawl", async (req, res) => {
  const baseURL = req.query.url;
  const pages = await crawlPage(baseURL, baseURL, {}, {});
  res.send(pages);
});

//Listening to specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
