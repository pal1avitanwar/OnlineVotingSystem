console.log("✅ voteRoutes.js loaded successfully!");

const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// ✅ Vote for a candidate 
router.post("/vote/:id", async (req, res) => {
    try {
        const candidateId = req.params.id;

        // Find the candidate
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) return res.status(404).json({ message: "Candidate not found" });

        // Increment vote count
        candidate.voteCount += 1;
        await candidate.save();

        res.status(200).json({ message: "Vote submitted successfully", candidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Get vote count of all candidates
router.get("/results", async (req, res) => {
    try {
        const candidates = await Candidate.find().select("name party voteCount");
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
