# ♻️ VisionSort – Automated Multi-Category Waste Classification Pipeline

## 📌 Overview

VisionSort is an AI-powered waste classification system designed to improve recycling efficiency by automatically identifying different types of waste materials using Deep Learning and Computer Vision.

The project integrates a **Custom Convolutional Neural Network (CNN)**, **FastAPI**, **MongoDB**, and a responsive **HTML/CSS/JavaScript Dashboard** to provide real-time waste classification, confidence scores, disposal recommendations, prediction history, and analytics.

---

## 🚀 Features

* 🤖 AI-powered waste classification
* 📷 Image upload and real-time prediction
* 📊 Confidence score visualization
* ♻️ Disposal recommendation
* 📜 Prediction history
* 📈 Analytics dashboard using Chart.js
* 💾 MongoDB integration
* ⚡ FastAPI REST API
* 🎨 Responsive industrial-style dashboard

---

## 🧠 Waste Categories

The CNN model classifies waste into the following six categories:

* 📦 Cardboard
* 🍾 Glass
* 🔩 Metal
* 📄 Paper
* 🧴 Plastic
* 🗑️ Trash

---

# 🏗️ System Architecture

```text
                Waste Image
                     │
                     ▼
      Frontend Dashboard (HTML/CSS/JS)
                     │
                     ▼
            FastAPI Backend API
                     │
                     ▼
      CNN Image Classification Model
                     │
                     ▼
      Prediction + Confidence Score
                     │
                     ▼
          MongoDB Prediction History
                     │
                     ▼
      Dashboard Analytics & Results
```

---

# ⚙️ Technology Stack

| Layer                | Technology            |
| -------------------- | --------------------- |
| Programming Language | Python                |
| AI Framework         | TensorFlow / Keras    |
| Backend              | FastAPI               |
| Database             | MongoDB               |
| Frontend             | HTML, CSS, JavaScript |
| Charts               | Chart.js              |
| Image Processing     | Pillow                |
| Development Tool     | Visual Studio Code    |

---

# 📂 Project Structure

```text
VisionSort/
│
├── backend/
│   ├── main.py
│   ├── train_model.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── dataset/
│
├── model/
│
├── screenshots/
│
├── report/
│
└── README.md
```

---

# 🔄 Workflow

```text
Upload Waste Image
        │
        ▼
Frontend Dashboard
        │
        ▼
FastAPI Backend
        │
        ▼
Image Preprocessing
        │
        ▼
CNN Model Prediction
        │
        ▼
Confidence Score
        │
        ▼
MongoDB Storage
        │
        ▼
Dashboard Analytics
```

---

# 📊 Model Performance

| Metric              | Value     |
| ------------------- | --------- |
| Training Accuracy   | ~84%      |
| Validation Accuracy | ~64%      |
| Number of Classes   | 6         |
| Input Resolution    | 224 × 224 |

---

# 📷 Project Screenshots

Add screenshots in the `screenshots/` folder:

* Dashboard Home
* Prediction Result
* Analytics Dashboard
* Prediction History
* System Information
* Model Performance

---

# ▶️ Installation

### Clone the repository

```bash
git clone https://github.com/rosh-624/VisionSort-AI-Pipeline.git
cd VisionSort-AI-Pipeline
```

### Install dependencies

```bash
pip install -r backend/requirements.txt
```

### Start the FastAPI server

```bash
cd backend
uvicorn main:app --reload
```

Open the frontend by launching `frontend/index.html` in your browser.

---

# 🌱 Future Enhancements

* 🎥 Real-time camera-based waste detection
* 📦 Conveyor belt automation
* 🛰️ IoT-enabled smart recycling bins
* ☁️ Cloud deployment (Docker/Kubernetes)
* 📱 Mobile application
* 🧠 Transfer Learning using MobileNetV2 or YOLOv8

---

# 🎯 Conclusion

VisionSort demonstrates how Artificial Intelligence can automate waste classification and support sustainable recycling practices. By combining Deep Learning, FastAPI, MongoDB, and an interactive dashboard, the project provides an end-to-end intelligent waste management solution that can be extended for industrial and smart city applications.

---

# 👩‍💻 Author

**Roshna Geekuri**

Bachelor of Technology – Computer Science & Engineering

---

# 📜 License

This project is developed for educational and internship purposes.
