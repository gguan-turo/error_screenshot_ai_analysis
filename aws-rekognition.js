import dotenv from "dotenv";
import AWS from "aws-sdk";
import fs from "fs";

dotenv.config();

// This is my personal S3 bucket and contains all five images in Screenshots folder
const bucket = "turo.ai.screenshots"; // the bucketname without s3://
const photo = "res1_suspended.png"; // the name of file

new AWS.Config();
AWS.config.update({region: "us-west-1"});
const client = new AWS.Rekognition();
const params = {
  // Read Image from S3 bucket
  // Image: {
  //   S3Object: {
  //     Bucket: bucket,
  //     Name: photo,
  //   },
  // },
  Image: {
    Bytes: fs.readFileSync("./screenshots/ca-tollroad/res1_suspended.png"),
  },
};
client.detectText(params, function (err, response) {
  if (err) {
    console.log(err, err.stack); // handle error if an error occurred
  } else {
    // console.log(`Detected Text for: ${photo}`);
    console.log(response);
    // const allText = response.TextDetections.reduce(
    //   (text, curr) => (text += curr.DetectedText + " "),
    //   ""
    // );
    // console.log(allText);
  }
});
