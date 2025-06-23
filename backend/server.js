import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";

// Required to use __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routers
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import modifyUiRouter from "./routes/modifyUiRoute.js";
import settingsRouter from "./routes/settingsRoutes.js";
import footerRouter from "./routes/footerRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import backgroundVideoRouter from "./routes/backgroundVideoRoute.js";
import carouselRouter from "./routes/carouselRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect DB and cloud storage
connectDB();
connectCloudinary();

// Middleware: parse JSON
app.use(express.json());

// ✅ Proper CORS setup
const allowedOrigins = [
  "http://localhost:5173", // your local frontend dev
  "https://your-frontend.vercel.app", // replace with actual Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from this origin"));
    }
  },
  credentials: true, // allow cookies or Authorization headers
}));

// Routers
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/modify", modifyUiRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/footer", footerRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/background_video", backgroundVideoRouter);
app.use("/api/carousel", carouselRouter);

// Static video files
app.use("/uploads/videos", express.static(path.join(__dirname, "uploads/videos")));

// Default test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(port, () => console.log("Server started on PORT : " + port));
