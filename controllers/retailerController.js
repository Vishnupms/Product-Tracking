import createHttpError from "http-errors";
import productModel from "../models/productModel.js";


export const retailProduct = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const retailer = req.user;
     
      const product = await productModel.findOne({ _id: productId });

      console.log(product.currentStatus,"cc")
  
      if (!product) {
        return res.status(404).json({ error: "Product Not Found" });
      }
  
      if (product.currentStatus === 'Retailed') {
        return res.status(400).json({ error: "Product is already retailed" });
      }

      if(product.currentStatus === "Manufactured"){
        return res.status(400).json({ error: "Product must be in distributed state to be Retailed" });
      }
  
      if (product.currentStatus !== 'Distributed') {
        return res.status(400).json({ error: "Product must be in distributed state to be Retailed" });
      }
  
      await productModel.updateOne(
        { _id: productId },
        {
          $set: {
            currentStatus:'Retailed',
            retailer: {
              name: retailer.username,
              location: retailer.location,
              email: retailer.email,
              retailedDate: new Date().toLocaleString()
            }
          }
        }
      );
  
      const currentStatus = 'Retailed'; 
  
      res.status(200).json({ message: 'Product retailed successfully', currentStatus });
    } catch (error) {
      console.error('Error retailing product:', error);
      return next(createHttpError(500, 'Failed to retail product.'));
    }
  };