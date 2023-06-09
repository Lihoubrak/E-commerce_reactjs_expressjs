const { model } = require("mongoose");
const categoryIndex = require("../constant/categoryIndex");
const Product = require("../model/Product");
const ProductVariant = require("../model/ProductVariant");

const router = require("express").Router();

//Create Product
router.post("/", async (req, res) => {
  try {
    const { title, desc, price, category, imageDefault, productVariants } =
      req.body;

    const newProduct = await Product.create({
      title: title,
      desc: desc,
      price: price,
      imageDefault: imageDefault,
      category: categoryIndex[parseInt(category)],
    });

    const productVariantPromises = productVariants.map(
      async (productVariant) => {
        const { size, color, quantity, image } = productVariant;
        const newProductVariant = await ProductVariant.create({
          size: size,
          color: color,
          image: image,
          quantity: quantity,
          ProductId: newProduct.id,
        });
        return newProductVariant;
      }
    );

    const productVariant = await Promise.all(productVariantPromises);

    // Return newProduct and its associated productVariants
    res.status(200).json({
      newProduct: newProduct,
      productVariants: productVariant,
    });
  } catch (error) {
    res.status(300).json({ message: error });
  }
});
//get Product by Category
router.get("/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    let products;
    if (req.query.size || req.query.color) {
      products = await ProductVariant.findAll({
        where: {
          size: req.query.size,
          color: req.query.color,
        },
        include: {
          model: Product,
          where: { category: categoryId },
          attributes: ["category"],
        },
      });
    } else {
      products = await Product.findAll({
        where: { category: categoryId },
      });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get one Product
router.get("/find/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({
      where: { id: productId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: ProductVariant,
          attributes: ["id", "size", "color", "quantity", "image"],
        },
      ],
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(300).json({ message: error });
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const { title, desc, price, image, category, productVariants } = req.body;
    const productId = req.params.productId;
    // update the product
    const updatedProduct = await Product.update(
      {
        title: title,
        desc: desc,
        price: price,
        image: image,
        category: categoryIndex[parseInt(category)],
      },
      { where: { id: productId } }
    );
    if (updatedProduct === 0) {
      return res.status(301).json("Update Unsuccessfully !!!");
    } else {
      res.status(200).json("Update Successfully !!!");
    }
  } catch (error) {
    res.status(300).json({ message: error });
  }
});
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deleteProduct = await Product.destroy({ where: { id: productId } });
    if (deleteProduct === 0) {
      return res.status(301).json("Delete Unsuccessfully !!!");
    } else {
      res.status(200).json("Delete Successfully !!!");
    }
  } catch (error) {
    res.status(300).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const qNew = req.query.product;
    const qCategory = req.query.category;
    let allProduct;
    if (qNew) {
      allProduct = await Product.findAll({
        order: [["price", "DESC"]],
        limit: 8,
      });
    } else if (qCategory) {
      allProduct = await Product.findAll({
        where: { category: qCategory },
        order: [["price", "DESC"]],
        limit: 8,
      });
    } else {
      allProduct = await Product.findAll({
        include: {
          model: ProductVariant,
          attributes: ["image", "size", "color"],
        },
      });
    }
    res.status(200).json(allProduct);
  } catch (error) {
    res.status(300).json({ message: error });
  }
});
module.exports = router;
