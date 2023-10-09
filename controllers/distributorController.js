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

    if (product.currentStatus === 'Distributed') {
      return res.status(400).json({ error: "Product is already distributed" });
    }

    if (product.currentStatus !== 'Manufactured') {
      return res.status(400).json({ error: "Product must be in manufactured state to distribute" });
    }

    await productModel.updateOne(
      { _id: productId },
      {
        $set: {
          currentStatus:'Distributed',
          distributor: {
            name: distributor.username,
            location: distributor.location,
            email: distributor.email,
            distributedDate: new Date().toLocaleString()
          }
        }
      }
    );

    const currentStatus = 'Distributed'; // Set the current status

    res.status(200).json({ message: 'Product distributed successfully', currentStatus });
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

    if (product.currentStatus !== 'Distributed') {
      return res.status(400).json({ error: "Product must be in distributed state to cancel distribute" });
    }
    // canceling distribution
    await productModel.updateOne(
      { _id: productId },
      {
        $unset: {
          'distributor': 1
        },
        $set: {
          'currentStatus': 'Manufactured'
        }
      }
    );
    const currentStatus = "Manufactured"


    res.status(200).json({ message: 'Distribute cancelled successfully',currentStatus });
  } catch (error) {
    console.error('Error deleting distributor details:', error);
    return next(createHttpError(500, 'Failed to delete distributor details.'));
  }
};
