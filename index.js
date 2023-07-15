import fs from "fs";
import { ConsoleLogColors } from "js-console-log-colors";

import config from "./config.js";
const out = new ConsoleLogColors();

const threadsRawJSON = getFileJSON("threads.json").result;

const threadsParsedJSON = {};
for (const thread of threadsRawJSON.threads) {
  let title = thread.title;
  try {
    title = decodeURIComponent(title);
  } catch (error) {}
  threadsParsedJSON[thread.id] = {
    title: title,
    plaintext: thread.plaintext,
  };
}

saveJSONtoFile("threads-parsed.json", threadsParsedJSON);

function getFileJSON(filename) {
  try {
    // Read the JSON file
    const data = fs.readFileSync(filename, "utf8");
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    out.error("Error parsing JSON:");
    out.error(err);
    return {};
  }
}

function saveJSONtoFile(filename, jsonData) {
  try {
    // Convert JSON data to a string
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Write the JSON string to a file synchronously
    fs.writeFileSync(filename, jsonString, "utf8");

    console.log("File saved successfully");
  } catch (err) {
    console.error("Error saving file:", err);
  }
}
