const Cart = require("../model/Cart");
const Order = require("../model/Order");
const OrderProduct = require("../model/OrderProduct");
const ProductVariant = require("../model/ProductVariant");
const User = require("../model/User");
const { verifyToken } = require("./verifyToken");
const router = require("express").Router();
router.post("/", verifyToken, async (req, res) => {
  try {
    const userid = req.user.id;
    const { email, address, phone, country } = req.body;

    // Lấy thông tin về các mục trong giỏ hàng từ bảng "Cart" dựa trên userId
    const cartItems = await Cart.findAll({ where: { userId: userid } });
    console.log(cartItems);
    // Tạo đơn hàng và các mục đơn hàng tương ứng trong bảng "Order" và "OrderItem"
    const order = await Order.create({
      UserId: userid,
      email,
      address: `${address} ${country}`,
      phone,
      payment: "cash on delivery",
    });

    for (const cartItem of cartItems) {
      await OrderProduct.create({
        OrderId: order.id,
        ProductVariantId: cartItem.ProductVariantId,
        quantity: cartItem.quantity,
      });

      const productVariant = await ProductVariant.findByPk(
        cartItem.ProductVariantId
      );
      if (productVariant) {
        const updatedQuantity = productVariant.quantity - cartItem.quantity;
        await productVariant.update({ quantity: updatedQuantity });
      }
    }

    // Xóa các mục trong giỏ hàng sau khi tạo đơn hàng thành công (tuỳ chọn)
    await Cart.destroy({ where: { userId: userid } });

    return res
      .status(201)
      .json({ message: "Đơn hàng đã được tạo thành công." });
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    return res.status(500).json({ error: "Đã xảy ra lỗi khi tạo đơn hàng." });
  }
});

router.get("/find", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { UserId: userId },
      include: {
        model: User,
        include: { model: Cart, include: { model: ProductVariant } },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
module.exports = router;
