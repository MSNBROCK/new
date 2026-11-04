```javascript
// NORTHSTAR BANKING MANAGEMENT SYSTEM
// Educational simulator - fictional sample accounts only.

const clients = [
    ["Shreyas","BRCLT-45871293","SHR129",450000,420000],
    ["Zain","BRCLT-797555","ZAI129",110000,85000],
    ["Rana","BRCLT-808835","RAN129",250000,200000],
    ["Nadeem","BRCLT-91274051","NAD129",350000,300000],
    ["Gani","BRCLT-34781926","GAN129",180000,150000],
    ["Dhanush","BRCLT-62845017","DHA129",220000,190000],
    ["Vinayak","BRCLT-73456218","VIN129",300000,250000],
    ["Shabana","BRCLT-SHABANA","SHA129",160000,130000],
    ["Devraj","BRCLT-DEVRAJ","DEV129",190000,150000],
    ["Bharth","BRCLT-BHARTH","BHA129",210000,180000],
    ["Yashvantha","BRCLT-YASHVANTHA","YAS129",270000,230000],
    ["Adarsh","BRCLT-ADARSH","ADA129",140000,110000],
    ["Sadik","BRCLT-ADIK","SAD129",175000,145000],
    ["Tanveer","BRCLT-TANVEER","TAN129",200000,170000]
];

// These are fictional demonstration figures.
let currentClient = null;
let withdrawal = 0;
let requests = [];

function money(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
}

function login() {
    const id = document.getElementById("clientId").value.trim();
    const password = document.getElementById("password").value;

    const client = clients.find(c => c[1] === id && c[2] === password);

    if (!client) {
        document.getElementById("loginError").textContent =
            "Invalid sample Client ID or Password.";
        return;
    }

    currentClient = client;

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    document.getElementById("welcome").textContent =
        "Welcome, " + client[0];

    document.getElementById("userId").textContent =
        "Client ID: " + client[1];

    document.getElementById("balance").textContent = money(client[3]);
    document.getElementById("totalBalance").textContent = money(client[3]);
    document.getElementById("investment").textContent = money(client[4]);

    // Sample IPO amount
    document.getElementById("ipo").textContent = money(0);

    showSection("termsSection", false);
    showSection("kycSection", false);
    showSection("successSection", false);
}

function logout() {
    currentClient = null;

    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");

    document.getElementById("clientId").value = "";
    document.getElementById("password").value = "";
}

function showSection(id, visible) {
    document.getElementById(id).classList.toggle("hidden", !visible);
}

function startWithdrawal() {
    const amount = Number(
        document.getElementById("withdrawAmount").value
    );

    if (!Number.isFinite(amount) || amount <= 0 || amount > 100000) {
        document.getElementById("withdrawError").textContent =
            "Enter a sample amount between ₹1 and ₹1,00,000.";
        return;
    }

    withdrawal = amount;

    document.getElementById("withdrawError").textContent = "";
    showSection("termsSection", true);

    const box = document.getElementById("termsBox");
    box.scrollTop = 0;

    document.getElementById("agreeBtn").disabled = true;
}

document.getElementById("termsBox").addEventListener("scroll", function() {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight - 5) {
        document.getElementById("agreeBtn").disabled = false;
        document.getElementById("scrollMessage").textContent =
            "Terms reviewed. You can continue.";
    }
});

function showKyc() {
    showSection("termsSection", false);
    showSection("kycSection", true);

    document.getElementById("kycName").value = currentClient[0];
}

function cancelWithdrawal() {
    showSection("termsSection", false);
    document.getElementById("withdrawAmount").value = "";
    document.getElementById("withdrawError").textContent =
        "Practice request cancelled.";
}

function submitKyc() {
    const name = document.getElementById("kycName").value.trim();

    const checks = document.querySelectorAll(".doc");

    if (!name || [...checks].some(c => !c.checked)) {
        document.getElementById("kycError").textContent =
            "Enter a sample name and complete the checklist.";
        return;
    }

    document.getElementById("kycError").textContent = "";

    const reference =
        "NSB-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    document.getElementById("reference").textContent = reference;
    document.getElementById("finalAmount").textContent = money(withdrawal);

    const stages = [
        ["Day 1", "Sample request recorded"],
        ["Day 5", "Sample review"],
        ["Day 10", "Illustrative processing stage"],
        ["Day 15", "Sample review checkpoint"],
        ["Day 20", "Preparation demonstration"],
        ["Day 25", "Final sample review"],
        ["Day 30", "Simulation complete"]
    ];

    document.getElementById("timeline").innerHTML = stages.map((stage, i) => `
        <div class="event">
            <strong>${stage[0]} – ${stage[1]}</strong>
            <small>${i === 0
                ? "Recorded for this demonstration"
                : "Illustrative milestone only"}</small>
        </div>
    `).join("");

    requests.push({
        name: currentClient[0],
        amount: withdrawal,
        reference: reference
    });

    document.getElementById("history").innerHTML =
        requests.map(r => `
            <div style="padding:12px;border-bottom:1px solid #ddd">
                <strong>${r.reference}</strong><br>
                ${r.name} – ${money(r.amount)}<br>
                <small>Simulation only</small>
            </div>
        `).join("");

    showSection("kycSection", false);
    showSection("successSection", true);
}
```
