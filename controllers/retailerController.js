import createHttpError from "http-errors";
import productModel from "../models/productModel.js";


export const retailProduct = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const retailer = req.user;
     
      const product = await productModel.findOne({ _id: productId });
  
      if (!product) {
        return res.status(404).json({ error: "Product Not Found" });
      }
      let status = product.status[product.status.length-1]
  
      if (status.currentStatus === 'Retailed') {
        return res.status(400).json({ error: "Product is already retailed" });
      }
    
      if (status.currentStatus !== 'Distributed') {
        return res.status(400).json({ error: "Product must be in distributed state to be Retailed" });
      }

      const newStatus = {
        currentStatus: 'Retailed',
        updatedTime: new Date(),
      };
  // adding reailer details and changing status to retailed
  await productModel.updateOne(
    
    { _id: productId },
    {
      $push: { status: [newStatus] }, // Add the new status to the status array
      $set: { retailer:retailer._id}, // Cast distributorId to ObjectId
    }
  );
  
  let currentStatus = newStatus.currentStatus
  let time = newStatus.updatedTime.toLocaleString()
  
      res.status(200).json({ message: 'Product retailed successfully', currentStatus,time });
    } catch (error) {
      console.error('Error retailing product:', error);
      return next(createHttpError(500, 'Failed to retail product.'));
    }
  };

  export const cancelRetailing = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const product = await productModel.findOne({ _id: productId });
  
      if (!product) {
        return res.status(404).json({ error: "Product Not Found" });
      }
      let status = product.status[product.status.length-1]

      if (status.currentStatus !== 'Retailed') {
        return res.status(400).json({ error: "Product must be in retailing state to cancel retail" });
      }
  
      // cancel retailing and changing status to disribute
      await productModel.updateOne(
        { _id: productId },
        {
          $unset: { retailer: 1 }, // Unset the distributor field
          $pop: { status: 1 }, // Remove the last element from the status array
        }
      );
      const currentStatus = "Distributed"
  
  
      res.status(200).json({ message: 'Retailing cancelled successfully',currentStatus });
    } catch (error) {
      console.error('Error deleting retailer details:', error);
      return next(createHttpError(500, 'Failed to delete distributor details.'));
    }
  };
  