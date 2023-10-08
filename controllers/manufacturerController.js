import productModel from '../models/productModel.js';


export const addProduct = async (req,res) =>{
    try {
        // Retrieve product data from the request body
        const { name, description, price, quantity } = req.body;
        const manufacturer = req.user
        const defaultStatus = {
            Currentstatus: "Manufactured",
            timestamp: new Date(),
          };
        // Create a new product document
        const product = new productModel({
          name,
          description,
          price,
          quantity,
          manufacturer: manufacturer._id,
          status:[defaultStatus]
        });
    
        // Save the product to the database
        await product.save();

        const currentStatus = product.status[0];

    // Extract only the values of the current status object
    const currentStatusValues = {
        status: currentStatus.currentStatus,
        time: currentStatus.timestamp.toLocaleString(),
      };

    
        res.status(201).json({ message: "Product added successfully", Currentstatus:currentStatusValues.status, time:currentStatusValues.time});
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Failed to add product" });
      }
    }
    
