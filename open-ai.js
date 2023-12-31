import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const CA_TOLLOROAD_TEST_PHOTOS = {
  blankScreen: "./screenshots/ca-tollroad/res1_blank_screen.png",
  stopInLoginScreen: "./screenshots/ca-tollroad/res1_stop_in_login_screen.png",
  reactivated: "./screenshots/ca-tollroad/res1_reactivated.png",
  suspended: "./screenshots/ca-tollroad/res1_suspended.png",
  wrongCredential: "./screenshots/ca-tollroad/res1_wrong_credential.png",
};

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
            text: "This is error screenshot of toll agency. Only return the text from following 4 options. 'Suspended', 'Wrong credential', 'Stop in Login screen', 'Blank screen'. If none of the above, please return 'Others'",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64_encode(
                CA_TOLLOROAD_TEST_PHOTOS.suspended
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
