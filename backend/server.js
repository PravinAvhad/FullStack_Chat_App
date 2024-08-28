const app = require("./app");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

dotenv.config();
connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
})