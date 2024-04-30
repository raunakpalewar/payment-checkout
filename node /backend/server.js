const express = require('express');
const stripe = require('stripe')('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');

const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/payment', async (req, res) => {
  try {
    const { amount, token } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: token.id,
      confirm: true,
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 