import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

// function to encode image file data to base64 encoded string
function base64_encode(file) {
  return fs.readFileSync(file, "base64");
}

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "This is error screenshot of toll agency. Only return a result one of following, only return the option below. Case 1: Suspended, Case 2: Wrong credential, Case 3: Stop in Login screen, Case 4: Blank screen. If none of the above, please return Case 5: Others",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64_encode(
                "./screenshots/ca-tollroad/stg.png"
              )}`,
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}
main();
