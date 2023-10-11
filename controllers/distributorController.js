import createHttpError from "http-errors";
import productModel from '../models/productModel.js';



export const distributeProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    
    const distributor = req.user;

    const product = await productModel.findOne({ _id: productId });
    
    if (!product) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    let status = product.status[product.status.length-1]

    if (status.currentStatus === 'Distributed') {
      return res.status(400).json({ error: "Product is already distributed" });
    }

    if (status.currentStatus !== 'Manufactured') {
      return res.status(400).json({ error: "Product must be in manufactured state to distribute" });
    }
    const newStatus = {
      currentStatus: 'Distributed',
      updatedTime: new Date(),
    };

    await productModel.updateOne(
      { _id: productId },
      {
        $push: { status: [newStatus] }, // Add the new status to the status array
        $set: { distributor:distributor._id}, // Cast distributorId to ObjectId
      }
    );
    let distributerName = distributor.username
    let currentStatus = newStatus.currentStatus
    let productName = product.name
    let time = newStatus.updatedTime.toLocaleString()

    res.status(200).json({ message: `${productName} distributed successfully by ${distributerName}`, currentStatus,time });
  } catch (error) {
    console.error('Error distributing product:', error);
    return next(createHttpError(500, 'Failed to distribute product.'));
  }
};


export const deleteDistributorDetails = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productModel.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    let status = product.status[product.status.length-1]

    if (status.currentStatus !== 'Distributed') {
      return res.status(400).json({ error: "Product must be in distributed state to cancel distribute" });
    }
    // canceling distribution
    await productModel.updateOne(
      { _id: productId },
      {
        $unset: { distributor: 1 }, // Unset the distributor field
        $pop: { status: 1 }, // Remove the last element from the status array
      }
    );
    const currentStatus = "Manufactured"


    res.status(200).json({ message: 'Distribute cancelled successfully',currentStatus });
  } catch (error) {
    console.error('Error deleting distributor details:', error);
    return next(createHttpError(500, 'Failed to delete distributor details.'));
  }
};
