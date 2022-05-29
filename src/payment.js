export const displayRazorPay = async (
  name,
  email,
  college,
  phoneNumber,
  amount,
  usn,
  event
) => {
  const data = await fetch(`https://envision22.herokuapp.com/razorpay`, {
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
    }),
  }).then((t) => t.json());

  console.log(data);
  // https://envision22.herokuapp.com/razorpay
  var options = {
    key: "rzp_test_EOVG1JEwo2iuL6",
    amount: data.amount,
    currency: data.currency,
    name: "Technical Event/CS",
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
