import createHttpError from "http-errors";
import productModel from '../models/productModel.js';


export const distributeProduct = async (req, res, next) => {
    try {
      // Verify that the product exists and is owned by the manufacturer
      const productId = req.params.productId;
    
      const distributor = req.user;
  
      const product = await productModel.findOne({ _id: productId});
  
      if (!product) {
        return res.status(404).json({ error: "product Not Found" });    
      }
      
      const latestStatus = product.status[product.status.length-1];
      // Check if the product status is "Manufactured" before distributing
      if (latestStatus.currentStatus !== 'Manufactured') {
        return next(createHttpError(400, 'Product must be in "Manufactured" status to distribute.'));
      }
      const newStatus = {
        currentStatus: 'Distributed', // Set the new status
        timestamp: new Date(), // Set the distribution timestamp
      };
      // Update the product status to "Distributed" and set the distributed timestamp
      product.status.push(newStatus);
      product.distributor = distributor._id; // You can set this to the distributor's ID
      console.log(latestStatus,"cs")
     let time = newStatus.timestamp.toLocaleString()
      // Save the updated product
      await product.save();
  
      res.status(200).json({ message: 'Product distributed successfully',Currentstatus:newStatus.currentStatus, time:time });
    } catch (error) {
      console.error('Error distributing product:', error);
      return next(createHttpError(500, 'Failed to distribute product.'));
    }
  };