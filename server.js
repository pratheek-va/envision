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
const mongoose = require('mongoose');

const eventRouter = require('./routes/eventRoutes');
const Event = require("./models/eventModel");

const csdetails = [
  {
    id: "IS01",
    department: "IS",
    name: "CounterStrike",
    type: "NT",
    venue: "ISE Lab, 4th Floor",
    rules: ["Individual Event.", "Multiplayer game", "Version 1.6"],
    details: "",
    orgname: "Abdul Khader Anshad",
    orgno: "7706753598",
    fee: 20,
    regfee: "Rs. 20 per head",
    date: "15/06/22",
    time: "11 AM - 1 PM",
    image: "cgames.png",
  },
  {
    id: "IS02",
    department: "IS",
    name: "Cyclopedia",
    type: "NT",
    venue: "College Ground.",
    rules: ["Solo event.", "Slow cycling race"],
    details: "",
    orgname: "Mohammad Thousif",
    orgno: "9845631414",
    fee: 20,
    regfee: "Rs. 20 per head",
    date: "14/06/22",
    time: "11 AM - 1 PM",
    image: "cyclopedia.png",
  },
  {
    id: "IS03",
    department: "IS",
    name: "Photo Montage",
    type: "NT",
    venue: "Room No: 404, Main Building",
    rules: ["2 members in a team.", "Solve the puzzle"],
    details: "",
    orgname: " Ashritha J Alva",
    orgno: "9480230525",
    fee: 20,
    date: "14/06/22",
    regfee: "Rs. 20 per team",
    time: "11 AM - 12:00 PM",
    image: "photomontage.png",
  },
  {
    id: "IS04",
    department: "IS",
    name: "Pyramid Break",
    type: "O",
    venue: "Butterfly Garden",
    rules: [" ", " "],
    details: "",
    orgname: "Namrtha",
    orgno: "9497340698",
    fee: 20,
    regfee: "Rs. 20 per team",
    time: " ",
    image: "pyramidbreak.png",
  },
  {
    id: "IS05",
    department: "IS",
    name: "Ring Toss",
    type: "O",
    venue: "Butterfly Garden",
    rules: [" ", " "],
    details: "",
    orgname: "Pranav P Rao",
    orgno: "7996021151",
    fee: 20,
    regfee: "Rs. 20 per team",
    time: " ",
    image: "ringtoss.png",
  },
  {
    id: "IS06",
    department: "IS",
    name: "Corporate Quiz",
    type: "T",
    venue: "Room No: 401, 4th Floor",
    rules: [
      "4 members in each team.",
      "Frame words with the help of pictures.",
      "1 minute for each question.",
    ],
    details: "",
    orgname: "Sonali T Chowta",
    orgno: "9480106096",
    //fee: 0,
    fee: 0,
    time: "10 AM - 11 AM",
    date: "14/06/22",
    image: "corporatequiz.jpg",
  },
  {
    id: "IS07",
    department: "IS",
    name: "Logic Tenacity",
    type: "T",
    venue: "ISE Lab, 4th Floor",
    rules: ["2 members from each team.", "Debugging the code from above hint."],
    details: "",
    orgname: "Rakshan B N",
    orgno: "9880803391",
    //fee: 00,
    date: "14/06/22",
    time: "2 PM to 3 PM",
    image: "logintenacity.png",
  },
  {
    id: "IS08",
    department: "IS",
    name: "Tech Hunt",
    type: "T",
    venue: "4th Floor",
    rules: [
      "4 members in a team.",
      "Hint about the next game will be provided.",
    ],
    details: "",
    orgname: "Pranav Rao",
    orgno: "7996021151",
    //fee: 0,
    date: "14/06/22",
    time: "3 PM to 4 PM",
    image: "techhunt.png",
  },
  {
    id: "IS09",
    department: "IS",
    name: "Trace Torch",
    type: "T",
    venue: "Badminton court",
    rules: [
      "4 members in a team.",
      "Contains 4 levels",
      "1 member will be unlocked after the completion of each round.",
    ],
    details: "",
    orgname: "Chintan BM",
    orgno: "9995441940",
    //fee: 0,
    date: "15/06/22",
    time: "10 AM to 12 PM",
    image: "tracetorch.png",
  },
];

const CLIENT_ID =
  "995606782248-0roe6ldp75b9am26bdkl721lkd6s18rq.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04KK5pgyGNTGiCgYIARAAGAQSNwF-L9IrzMlVS0CuWoRQz7cPr_9BCTpjFrNXvjQeb5N_572JFCJJT0P9-z2tmw-dqtBsLHNMP9s";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

let name, email, college, phone, paymentId, event, amount, usn, venue;

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
      usn: usn,
      amount: amount,
      paymentId: paymentId,
    };

    let strData = JSON.stringify(data);

    let qrcode;

    qrcode = await qr.toDataURL(strData);

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

dotenv.config({path: './.env'});

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((con) => {
  console.log('DB connection successful');
})

const app = express();

app.use(cors());
app.use(bodyParser.json());

// const importData = async () => {
//   try {
//     await Event.create(csdetails);
//     console.log('Data successfully loaded!');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// importData();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/v1/events', eventRouter);

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  name = req.body.name;
  email = req.body.email;
  usn = req.body.usn;
  phone = req.body.phoneNumber;
  college = req.body.college;
  amount = req.body.amount;
  event = req.body.event;
  venue = req.body.venue;
  // const keyId = req.body.key.id;
  // const keySecret = req.body.key.secret;

  const razorpay = new Razorpay({
    key_id: "rzp_test_pWtJFLGWsPGRO7",
    key_secret: "NBMsptSltj2XQWDQjTXBPB3y",
  });

  // const razorpay = new Razorpay({
  //   key_id: keyId,
  //   key_secret: keySecret,
  // });

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
  const crypto = require("crypto");
  const shasum = crypto.createHmac("sha256", secret);

  shasum.update(JSON.stringify(req.body));

  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
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
//   "Daron Jude Machado",
//   "daronmachado10@gmail.com",
//   "St.Joseph Engineering College",
//   "8277160288",
//   "4SO21CB016",
//   "Chess",
//   100,
//   "pay_JgpV0EiKPTKwpU"
// )
//   .then((result) => console.log("Email sent...", result))
//   .catch((error) => console.log(error.message));

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/build/index.html"))
);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 5000}`
  );
});