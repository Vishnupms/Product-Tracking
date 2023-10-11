import productModel from '../models/productModel.js';


export const addProduct = async (req,res) =>{
    try {
        // Retrieve product data from the request body
        const { name, description, price } = req.body;
        const manufacturer = req.user
        // Create a new product document
        const product = new productModel({  
          name,
          description,
          price,
          MFG:new Date(),
          status:[
            {
              currentStatus: 'Manufactured',
              updatedTime: new Date(),
            },
          ],
          manufacturer:manufacturer._id
        });
    
      
        await product.save();

        const status = product.status[0]
        let manufactureName = manufacturer.username
        let productName = product.name
        let currentStatus = status.currentStatus
        let time = status.updatedTime.toLocaleString()

        res.status(201).json({ message: `${productName} added successfully by ${manufactureName}`, currentStatus,time,productId:product._id});
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Failed to add product" });
      }
    }
    
export const deleteProduct= async(req,res)=>{
  try {
    const productId = req.params.productId;

    const product = await productModel.findOne({ _id: productId });

    let status = product.status[product.status.length-1]
    

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }
    if(status.currentStatus !== "Manufactured"){
      return  res.status(403).json({message:"You cannot delete a distributed product"});
    }
    await productModel.findByIdAndDelete(productId);

      res.status(200).json({ message: 'Product deleted successfully'});
    }
    
   catch (error) {
    console.error('Error deleting product:', error);
    return next(createHttpError(500, 'Failed to delete product.'));
  }
}