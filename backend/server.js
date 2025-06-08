import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Routers
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import modifyUiRouter from "./routes/modifyUiRoute.js";
import settingsRouter from "./routes/settingsRoutes.js";
import footerRouter from "./routes/footerRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/modify", modifyUiRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/footer", footerRouter);
app.use("/api/category", categoryRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => console.log("Server started on PORT : " + port));
