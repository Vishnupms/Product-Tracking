import productModel from "../models/productModel.js";
import createHttpError from "http-errors";

export const deliverProduct = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const customer = req.user;
  
      const product = await productModel.findOne({ _id: productId });
  
      if (!product) {
        return res.status(404).json({ error: "Product Not Found" });
      }
  
      if (product.currentStatus === 'Sold') {
        return res.status(400).json({ error: "Product is already delivered" });
      }
  
      if (product.currentStatus !== 'Retailed') {
        return res.status(400).json({ error: "Product is not reached in retailer shop" });
      }
  
      await productModel.updateOne(
        { _id: productId },
        {
          $set: {
            currentStatus:'Sold',
            customer: {
              name: customer.username,
              location: customer.location,
              email: customer.email,
              phone:customer.phone,
              soldDate: new Date().toLocaleString()
            }
          }
        }
      );
  
      const currentStatus = 'Sold'; 
  
      res.status(200).json({ message: 'Product delivered successfully', currentStatus });
    } catch (error) {
      console.error('Error delivering product:', error);
      return next(createHttpError(500, 'Failed to deliver product.'));
    }
  };