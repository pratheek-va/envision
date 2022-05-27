export const displayRazorPay = async (name, email, contact, amount) => {
  const data = await fetch("https://envision22.herokuapp.com/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
    }),
  }).then((t) => t.json());

  console.log(data);

  var options = {
    key: "rzp_test_mbBz2fZlytAuDX",
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
