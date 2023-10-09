import express from "express";
import cors from "cors";
import http from 'http'
import 'dotenv/config.js'
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
import manufacturerRoute from "./routes/manufacturerRoute.js";
import distributorRoute from "./routes/distributorRoute.js";
import customerRoute from './routes/customerRoute.js'
import retailerRoute from './routes/retailerRoute.js'
import testRoute from './routes/testRoute.js'
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { verifyDistributor } from "./middlewares/verifyDistributor.js";
import { verifyManufacturer } from "./middlewares/verifyManufacturer.js";
import { verifyRetailer } from "./middlewares/verifyRetailer.js";
import { verifyCustomer } from "./middlewares/verifyCustomer.js";

const app = express();

const server = http.createServer(app)
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
app.use('/api/test', testRoute)
app.get('/api/*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = process.env.PORT;

mongoose.connect(process.env.DB_STRING).then(() => {
  try {
      server.listen(port, () => {
          console.log(`server connected to PORT:${port}`);
      })
  } catch (error) {
      console.log('cannot connect to the server');
  }
}).catch(error => {
  console.log('Invalid Database Connection...!')
})