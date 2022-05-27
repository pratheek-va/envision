export const displayRazorPay = async (name, email, contact, amount) => {
  const data = await fetch(`http://localhost:5000/razorpay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
    }),
  }).then((t) => t.json());

  console.log(data);
  // https://envision22.herokuapp.com/razorpay
  var options = {
    key: "rzp_test_aBWE7tQVBCqwbL",
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
      contact: contact,
      college: "srinivas institute of technology",
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
