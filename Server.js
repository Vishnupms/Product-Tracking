import express from "express";
import cors from "cors";
import connect from "./config/db.js";
import "dotenv/config.js";
import authRoute from "./routes/authRoutes.js";
import manufacturerRoute from "./routes/manufacturerRoute.js";
import distributorRoute from "./routes/distributorRoute.js";
import customerRoute from './routes/customerRoute.js'
import retailerRoute from './routes/retailerRoute.js'
import testRoute from './routes/testRoute.js'
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { verifyDistributor } from "./middlewares/verifyDistributor.js";
import { verifyManufacturer } from "./middlewares/verifyManufacturer.js";
import productModel from "./models/productModel.js";
import { verifyRetailer } from "./middlewares/verifyRetailer.js";
import { verifyCustomer } from "./middlewares/verifyCustomer.js";

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
app.use(
  "/api/retailer",
  authMiddleware,
  verifyRetailer,
  retailerRoute
);
app.use(
  "/api/customer",
  authMiddleware,
  verifyCustomer,
  customerRoute
);
app.use('/test', testRoute)

//get all details of a product

app.get('/api/product-details/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productModel.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return next(createHttpError(500, 'Failed to fetch product.'));
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
