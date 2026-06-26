const API_URL = "http://127.0.0.1:8000";

let totalPredictions = 0;
let confidenceSum = 0;

let classCounts = {
    cardboard: 0,
    glass: 0,
    metal: 0,
    paper: 0,
    plastic: 0,
    trash: 0
};

let wasteChart = null;

window.onload = function () {
    initializeChart();
};

function initializeChart() {
    const ctx = document.getElementById("wasteChart").getContext("2d");

    wasteChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Cardboard", "Glass", "Metal", "Paper", "Plastic", "Trash"],
            datasets: [{
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    "#f59e0b",
                    "#38bdf8",
                    "#94a3b8",
                    "#22c55e",
                    "#3b82f6",
                    "#ef4444"
                ],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#e5e7eb"
                    }
                }
            }
        }
    });
}

async function predictWaste() {
    const input = document.getElementById("imageInput");
    const file = input.files[0];

    if (!file) {
        alert("Please upload a waste image first.");
        return;
    }

    const preview = document.getElementById("previewImage");
    preview.src = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);

    const warningBox = document.getElementById("warningBox");
    warningBox.innerText = "Analyzing image...";
    warningBox.style.background = "#374151";

    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        document.getElementById("predictedClass").innerText =
            data.predicted_class.toUpperCase();

        document.getElementById("confidenceText").innerText =
            data.confidence + "%";

        document.getElementById("confidenceBar").style.width =
            data.confidence + "%";

        document.getElementById("riskLevel").innerText =
            data.risk_level;

        document.getElementById("inferenceTime").innerText =
            data.inference_time_ms + " ms";

        document.getElementById("disposal").innerText =
            data.disposal_instruction;

        warningBox.innerText = data.warning;

        if (data.risk_level === "LOW") {
            warningBox.style.background = "#166534";
        } else if (data.risk_level === "MEDIUM") {
            warningBox.style.background = "#854d0e";
        } else {
            warningBox.style.background = "#7f1d1d";
        }

        addHistoryRow(data);
        updateLocalAnalytics(data);

    } catch (error) {
        console.error(error);
        alert("Backend not running. Please start FastAPI server.");
    }
}

function addHistoryRow(data) {
    const table = document.getElementById("historyTable");

    if (table.children.length === 1 && table.children[0].children[0].colSpan === 4) {
        table.innerHTML = "";
    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${data.predicted_class}</td>
        <td>${data.confidence}%</td>
        <td>${data.risk_level}</td>
        <td>${data.timestamp}</td>
    `;

    table.prepend(row);
}

function updateLocalAnalytics(data) {
    totalPredictions++;
    confidenceSum += Number(data.confidence);

    document.getElementById("totalPredictions").innerText = totalPredictions;

    const avgConfidence = confidenceSum / totalPredictions;
    document.getElementById("avgConfidence").innerText =
        avgConfidence.toFixed(1) + "%";

    const cls = data.predicted_class.toLowerCase();
    if (classCounts[cls] !== undefined) {
        classCounts[cls]++;
    }

    wasteChart.data.datasets[0].data = [
        classCounts.cardboard,
        classCounts.glass,
        classCounts.metal,
        classCounts.paper,
        classCounts.plastic,
        classCounts.trash
    ];

    wasteChart.update();
}
async function loadSavedHistory() {
    try {
        const response = await fetch(`${API_URL}/history`);
        const data = await response.json();

        if (!data.mongo_available || !data.history || data.history.length === 0) {
            return;
        }

        const table = document.getElementById("historyTable");
        table.innerHTML = "";

        data.history.reverse().forEach(item => {
            addHistoryRow(item);
            updateLocalAnalytics(item);
        });

    } catch (error) {
        console.log("Saved history unavailable");
    }
}
loadSavedHistory();