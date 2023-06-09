require("dotenv").config();
const express = require("express");
const Order = require("../model/Order");
const Cart = require("../model/Cart");
const OrderProduct = require("../model/OrderProduct");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Handle POST request for creating a checkout session
router.post("/checkout", async (req, res) => {
  const line_items = req.body.cartItem.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const userId = req.body.cartItem[0].userId;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["VN"],
    },
    phone_number_collection: {
      enabled: true,
    },
    metadata: { UserID: userId },
    line_items,
    mode: "payment",
    success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/cart`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
});

// Stripe webhoook

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret;
    //webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      try {
        // Lấy thông tin về các mục trong giỏ hàng từ bảng "Cart" dựa trên userId
        const cartItems = await Cart.findAll({
          where: { userId: data.metadata.UserID },
        });
        // Tạo đơn hàng và các mục đơn hàng tương ứng trong bảng "Order" và "OrderItem"
        const order = await Order.create({
          UserId: data.metadata.UserID,
          status: data.status,
          email: data.customer_details.email,
          address: `${data.shipping_details.address.line1} ${data.shipping_details.address.line2} ${data.shipping_details.address.state} ${data.shipping_details.address.city} ${data.shipping_details.address.country} ${data.shipping_details.address.postal_code}`,
          phone: data.customer_details.phone,
          payment: data.payment_method_types[0],
        });

        for (const cartItem of cartItems) {
          await OrderProduct.create({
            OrderId: order.id,
            ProductVariantId: cartItem.ProductVariantId,
            quantity: cartItem.quantity,
          });
        }
        // Xóa các mục trong giỏ hàng sau khi tạo đơn hàng thành công (tuỳ chọn)
        await Cart.destroy({ where: { userId: data.metadata.UserID } });
        return res
          .status(201)
          .json({ message: "Đơn hàng đã được tạo thành công." });
      } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        return res
          .status(500)
          .json({ error: "Đã xảy ra lỗi khi tạo đơn hàng." });
      }
    }
    res.status(200).end();
  }
);

module.exports = router;
