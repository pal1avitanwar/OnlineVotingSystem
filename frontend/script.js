// ✅ User Registration
const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    try {
        const res = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        document.getElementById("userMsg").innerText = data.message || "User registered!";
    } catch (err) {
        console.error(err);
        document.getElementById("userMsg").innerText = "❌ Error registering user";
    }
});

// ✅ Candidate Registration
document.getElementById("candidateForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("candidateName").value;
    const party = document.getElementById("candidateParty").value;

    try {
        const res = await fetch("http://localhost:5000/api/candidates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, party })
        });

        const data = await res.json();
        document.getElementById("candidateMsg").innerText = data.message || "Candidate registered!";
    } catch (err) {
        document.getElementById("candidateMsg").innerText = "❌ Error registering candidate";
        console.error("❌ Error registering candidate:", err);
    }
});
// 🗳️ Show Candidates for Voting
async function loadCandidates() {
    try {
        const res = await fetch("http://localhost:5000/api/candidates");
        const candidates = await res.json();

        const list = document.getElementById("candidateList");
        list.innerHTML = "";

        candidates.forEach(candidate => {
            const div = document.createElement("div");
            div.innerHTML = `
                <strong>${candidate.name}</strong> (${candidate.party})
                <button onclick="vote('${candidate._id}')">Vote</button>
            `;
            list.appendChild(div);
        });
    } catch (err) {
        console.error("❌ Error loading candidates:", err);
    }
}

// 🗳️ Vote Function
async function vote(candidateId) {
    try {
        const res = await fetch(`http://localhost:5000/api/vote/${candidateId}`, {
            method: "POST",
        });

        const data = await res.json();
        alert(data.message || "Voted successfully!");

        loadCandidates(); // Refresh list if needed
    } catch (err) {
        console.error("❌ Error voting:", err);
        alert("Error submitting vote.");
    }
}

// Page load par candidates dikhao
window.onload = () => {
    loadCandidates();
};
// ✅ View Results Function
async function getResults() {
    try {
        const res = await fetch("http://localhost:5000/api/results");
        const candidates = await res.json();

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "<h3>📊 Vote Results</h3>";

        candidates.forEach(candidate => {
            resultsDiv.innerHTML += `
                <p>
                    <strong>${candidate.name}</strong> (${candidate.party}) - 
                    Votes: <strong>${candidate.voteCount}</strong>
                </p>
            `;
        });
    } catch (err) {
        console.error("❌ Error fetching results:", err);
        document.getElementById("results").innerHTML = "❌ Could not fetch results";
    }
}


