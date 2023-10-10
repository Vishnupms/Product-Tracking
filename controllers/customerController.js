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
      let status = product.status[product.status.length-1]
  
      if (status.currentStatus === 'Sold') {
        return res.status(400).json({ error: "Product is already delivered" });
      }
  
      if (status.currentStatus !== 'Retailed') {
        return res.status(400).json({ error: "Product is not reached in retailer shop" });
      }
      const newStatus = {
        currentStatus: 'Sold',
        updatedTime: new Date(),
      };
      await productModel.updateOne(
        { _id: productId },
        {
          $push: { status: [newStatus] }, // Add the new status to the status array
          $set: { customer:customer._id}, // Cast distributorId to ObjectId
        }
      );
  
      let currentStatus = newStatus.currentStatus
      let time = newStatus.updatedTime.toLocaleString()
  
      res.status(200).json({ message: 'Product delivered successfully', currentStatus,time });
    } catch (error) {
      console.error('Error delivering product:', error);
      return next(createHttpError(500, 'Failed to deliver product.'));
    }
  };


  export const trackMyProduct = async(req,res)=>{
    try {
      const productId = req.params.productId;
      
      const product = await productModel.findById(productId)
      .populate({
        path: 'manufacturer distributor retailer customer',
        select: 'username email phone location -_id', // Exclude the _id field
      })
      .exec()

      if(!product){
        return res.status(404).json({ message: 'Product not found' });
      }
      const status = product.status[product.status.length-1]
      let currentStatus = status.currentStatus
      let time = status.updatedTime.toLocaleString()

    // Construct the response object with the latest status
    const response = {
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      tracking:product.status,
      currentStatus:currentStatus,time,
      manufacturer: product.manufacturer,
      distributor: product.distributor,
      retailer: product.retailer,
      customer: product.customer,
    };

    res.status(200).json({ message:"product details get successfully",product: response });

  
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }


  }