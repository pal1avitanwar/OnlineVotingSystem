console.log("✅ Server Start Ho Raha Hai...");

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/myDatabase"; // Apna MongoDB database

// ✅ Step 1: MongoDB Connect Karein
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error: ", err));

// ✅ Step 2: Routes Include Karo
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const voteRoutes = require("./routes/voteRoutes");

// ✅ Step 3: Routes Setup Karo
app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api", voteRoutes);  // ✅ This registers the vote route like /api/vote/:id

// ✅ Step 4: Serve Frontend Static Files
app.use(express.static(path.join(__dirname, 'frontend')));

// ✅ Step 5: Catch-All Route (Ye sabse aakhri mein hona chahiye!)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ✅ Step 6: Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
