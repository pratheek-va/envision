const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");

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
  key_id: "rzp_live_G8LET5JgQ4zvHV",
  key_secret: "jKEBW0vjfUjIIAlecpmitQsv",
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
    // process it
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
