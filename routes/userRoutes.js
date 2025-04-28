const express = require("express");
const User = require("../models/User"); 
const router = express.Router();

console.log("✅ userRoutes.js loaded successfully!");

// ✅ User Register Route (Agar user register bhi karna hai)
router.post("/register", async (req, res) => {
    console.log("✅ POST /api/users/register called"); 
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log("✅ User Registered:", newUser);
        res.status(201).json({ message: "User Registered Successfully!" });
    } catch (error) {
        console.log("❌ Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});
// ✅ User Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ Get All Users Route
router.get("/", async (req, res) => { 
    console.log("✅ GET /api/users called"); // Debugging ke liye
    try {
        const users = await User.find();
        console.log("✅ Users fetched:", users); // Debugging
        res.json(users);
    } catch (error) {
        console.log("❌ Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;




