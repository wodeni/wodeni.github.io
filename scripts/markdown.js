const fs = require("fs");
const path = require("path");
const marked = require("marked");

const markdownDirectory = "./posts";
const outputDirectory = "./src/posts";

fs.readdirSync(markdownDirectory).forEach((file) => {
  const markdownContent = fs.readFileSync(
    path.join(markdownDirectory, file),
    "utf-8"
  );
  const htmlContent = marked(markdownContent);
  const outputFilename = path.join(
    outputDirectory,
    file.replace(".md", ".html")
  );

  fs.writeFileSync(outputFilename, htmlContent);
});
