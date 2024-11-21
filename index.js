const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalPrice = newItemPrice + cartTotal;
  res.send(totalPrice.toString());
});
function membershipDiscount(cartTotal, isMember) {
  if (isMember) {
    const discountPercentage = 10;
    const finalprice = cartTotal - (cartTotal * discountPercentage) / 100;
    return finalprice.toString();
  } else {
    finalprice = cartTotal;
    return finalprice.toString();
  }
}
app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true';

  res.send(membershipDiscount(cartTotal, isMember));
});
app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  let taxRate = 5;
  const taxAmount = cartTotal * (taxRate / 100);
  return res.send(taxAmount.toString());
});
function DeliveryEstimation(shippingMethod, distance) {
  if (shippingMethod === 'standard') {
    const TimeTaken = distance / 50;
    return TimeTaken.toString();
  } else if (shippingMethod === 'express') {
    const TimeTake = distance / 100;
    return TimeTake.toString();
  }
}
app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);
  res.send(DeliveryEstimation(shippingMethod, distance));
});
app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);

  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});
app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyRate = 2;

  const loyaltyPoints = purchaseAmount * loyaltyRate;
  return res.send(loyaltyPoints.toString());
});
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
