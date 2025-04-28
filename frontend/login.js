// frontend/login.js

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            document.getElementById("loginMessage").innerText = "✅ Login Successful!";
            // Store user data if needed, redirect, etc.
        } else {
            document.getElementById("loginMessage").innerText = "❌ " + data.error;
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("loginMessage").innerText = "❌ Something went wrong!";
    }
});
