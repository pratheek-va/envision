export const displayRazorPay = async (
  name,
  email,
  college,
  phoneNumber,
  amount,
  usn,
  event,
  venue,
  key
) => {
  const data = await fetch('http://localhost:5000/razorpay', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      college,
      phoneNumber,
      amount,
      event,
      usn,
      venue,
      key,
    }),
  }).then((t) => t.json());

  // https://envision22.herokuapp.com/razorpay
  var options = {
    key: key.id,
    amount: data.amount,
    currency: data.currency,
    name: event,
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: data.id,
    callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",

    prefill: {
      name: name,
      email: email,
      contact: phoneNumber,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  var rzp1 = new window.Razorpay(options);

  rzp1.open();
};
