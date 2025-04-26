import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.connect.js";

import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import categoryRoutes from "./routes/category.routes.js";
// import orderRoutes from "./routes/order.routes.js";
// import cartRoutes from "./routes/cart.routes.js";
// import reviewRoutes from "./routes/review.routes.js";
// import wishlistRoutes from "./routes/wishlist.routes.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/wishlist", wishlistRoutes);

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1); // Exit the process with failure
  }
})();
