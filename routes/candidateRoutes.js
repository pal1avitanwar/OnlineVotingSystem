const express = require("express");
const Candidate = require("../models/Candidate"); // ✅ Candidate model
const router = express.Router();

console.log("✅ candidateRoutes.js loaded successfully!");

// ✅ POST: Add a new candidate
router.post("/", async (req, res) => {
    console.log("✅ POST /api/candidates called");
    try {
        const { name, party } = req.body;
        const newCandidate = new Candidate({ name, party });
        await newCandidate.save();
        console.log("✅ Candidate Added:", newCandidate);
        res.status(201).json({ message: "Candidate Added Successfully!" });
    } catch (error) {
        console.log("❌ Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ GET: Get all candidates
router.get("/", async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
