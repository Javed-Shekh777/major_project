const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    const keyword = req.query?.q
      ? {
          $or: [
            { productName: { $regex: req.query.q, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const product = await productModel.find(keyword);
   

    // res.send(users);

    res.json({
      data: product,
      message: "Search Product list",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;
