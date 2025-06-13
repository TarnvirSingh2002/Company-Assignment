import express from "express";
import cors from "cors";
import dotenv from"dotenv"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/bookings", bookingsRoutes);


app.listen(4000,()=>{
    console.log("port at 4000");
})