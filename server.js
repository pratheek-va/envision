const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const qr = require("qrcode");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const Axios = require("axios");

const CLIENT_ID =
  "995606782248-0roe6ldp75b9am26bdkl721lkd6s18rq.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04gHK-t6s6GNpCgYIARAAGAQSNwF-L9IrajCMLiqWNocYVomyrrfuTyMJAEKuhUsbB2a_Cof32pkPS-Joz7Y5Uc1vWtcCtMMWIc0";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

let name, email, college, phone, paymentId, event, amount, venue;

const sendMail = async (
  name,
  email,
  college,
  phoneNumber,
  usn,
  event,
  amount,
  paymentId
) => {
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

    let data = {
      name: name,
      email: email,
      college: college,
      phoneNumber: phoneNumber,
      event: event,
      use: usn,
      amount: amount,
      paymentId: paymentId,
    };

    let strData = JSON.stringify(data);

    let qrcode;

    qrcode = await qr.toDataURL(strData);

    console.log(qrcode);

    const mailOptions = {
      from: "ENVISION <yours authorised email address@gmail.com>",
      to: email,
      subject: "Use this ticket to enter the event",
      text: "Hey there have fun",
      attachDataUrls: true,
      html: ` <div
      style="
        width: 350px;
        height: 600px;
        background-color: black;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
      "
    >
      <h1 style="color: white; border-bottom: solid 1px gold; padding: 10px">
        ${event}
      </h1>
      <p style="color: white">${name}</p>
      <p style="color: white">${usn}</p>
      <p style="color: white">${venue}</p>
      <p style="color: white; font-size: 40px">₹${amount}</p>
      <img src=${qrcode}} />
      
    </div>`,
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

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  console.log(req.body);

  name = req.body.name;
  email = req.body.email;
  usn = req.body.usn;
  phone = req.body.phoneNumber;
  college = req.body.college;
  amount = req.body.amount;
  event = req.body.event;
  venue = req.body.venue;
  keyId = req.body.key.id;
  keySecret = req.body.key.secret;

  // const razorpay = new Razorpay({
  //   key_id: "rzp_test_EOVG1JEwo2iuL6",
  //   key_secret: "KzrVXdNwqpAN4extXi7qktYF",
  // });

  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  // const { name, email, college, paymentId } = req.body;
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

app.post("/verification", async (req, res) => {
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");

    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
  }
  Axios.post(
    "https://envision-d8105-default-rtdb.firebaseio.com/registration.json",
    {
      name: name,
      email: email,
      college: college,
      phoneNumber: phone,
      event: event,
      usn: usn,
      amount: amount,
      paymentId: digest,
    }
  );

  sendMail(name, email, college, phone, usn, event, amount, digest)
    .then((result) => console.log("Email sent...", result))
    .catch((error) => console.log(error.message));
  res.json({ status: "ok" });
});

// sendMail(
//   "Vaibhavi",
//   "vaibhaviadiga@gmail.com",
//   "SIT",
//   "9995126846",
//   "4SN20IS019",
//   "Technical Event/IS",
//   100,
//   "pay_JdJIOFPDZjErDZ"
// )
//   .then((result) => console.log("Email sent...", result))
//   .catch((error) => console.log(error.message));

// Axios.post(
//   "https://envision-d8105-default-rtdb.firebaseio.com/registration.json",
//   {
//     name: "Vaibhavi",
//     email: "vaibhaviadiga@gmail.com",
//     college: "SIT",
//     phoneNumber: "9995126846",
//     event: "Technical Event/IS",
//     usn: "4SN20IS019",
//     amount: 100,
//     paymentId: "pay_JdJIOFPDZjErDZ",
//   }
// );

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/build/index.html"))
);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 5000}`
  );
});
