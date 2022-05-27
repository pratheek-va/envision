const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "995606782248-0roe6ldp75b9am26bdkl721lkd6s18rq.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04DgLV1K2jkMyCgYIARAAGAQSNwF-L9IrCiEkWSSjD4cH2kPiT3FUAzVWBb9GdMhAlrwPiJbEnznx6GoePIxcPn65LKrIUHy5mmk";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "pratheekvaberike@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "ENVISION <yours authorised email address@gmail.com>",
      to: "phantomyt971@gmail.com",
      subject: "Hello from gmail using API",
      text: "Hello from gmail email using API",
      html: "<div><h1>Event Name: Code Craft</h1><h1>Name: Pratheek V A</h1><h1>Email: pratheekvaberike@gmail.com</h1></div>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const users = [];

const razorpay = new Razorpay({
  key_id: "rzp_test_aBWE7tQVBCqwbL",
  key_secret: "jF0gLxTJBoivepyneYzfI5WA",
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  console.log(req.body);
  const amount = req.body.amount;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/verification", (req, res) => {
  const SECRET = "123456";
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    sendMail()
      .then((result) => console.log("Email sent...", result))
      .catch((error) => console.log(error.message));
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/build/index.html"))
);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 5000}`
  );
});
