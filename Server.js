import express from "express";
import cors from "cors";
import connect from "./config/db.js";
import "dotenv/config.js";
import authRoute from "./routes/authRoutes.js";
import manufacturerRoute from "./routes/manufacturerRoute.js";
import distributorRoute from "./routes/distributorRoute.js";
import testRoute from './routes/testRoute.js'
import productModel from "./models/productModel.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { verifyDistributor } from "./middlewares/verifyDistributor.js";
import { verifyManufacturer } from "./middlewares/verifyManufacturer.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use(
  "/api/manufacturer",
  authMiddleware,
  verifyManufacturer,
  manufacturerRoute
);
app.use(
  "/api/distributor",
  authMiddleware,
  verifyDistributor,
  distributorRoute
);
app.use('/test', testRoute)

app.get("/api/get-product-details/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    productModel
      .findById(productId)
      .populate({
        path: "manufacturer distributor retailer customer",
        select: "username email phone location -_id",
      })
      .exec()
      .then((product) => {
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        // Find and extract the latest status object
        const latestStatus = product.status[product.status.length-1];
        let time = latestStatus.timestamp.toLocaleString();
        // Construct the response object with the latest status
        const response = {
          _id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          isInStock: product.isInStock,
          manufacturer: product.manufacturer,
          distributor: product.distributor,
          retailer: product.retailer,
          customer: product.customer,
          latestStatus: latestStatus.currentStatus,
          time, // Include the latest status
        };

        res.status(200).json({ product: response });
      });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connect();
    console.log(`server connected to http://localhost:${port}`);
  } catch (error) {
    console.log(error);
  }
});
