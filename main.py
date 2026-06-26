import os
import time
from datetime import datetime

import numpy as np
import tensorflow as tf
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from pymongo import MongoClient

app = FastAPI(title="VisionSort API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "../model/waste_classifier.keras"
CLASS_NAMES_PATH = "../model/class_names.txt"
IMG_SIZE = (224, 224)

model = tf.keras.models.load_model(MODEL_PATH)

with open(CLASS_NAMES_PATH, "r") as f:
    class_names = [line.strip() for line in f.readlines()]

try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=1000)
    client.server_info()
    db = client["visionsort_db"]
    collection = db["predictions"]
    mongo_available = True
except Exception:
    mongo_available = False
    collection = None


DISPOSAL_GUIDE = {
    "cardboard": "Send to dry recycling. Keep it clean and flattened.",
    "glass": "Send to glass recycling bin. Avoid mixing with general waste.",
    "metal": "Send to metal recycling stream. Remove food residue if possible.",
    "paper": "Send to paper recycling. Keep it dry and uncontaminated.",
    "plastic": "Send to plastic recycling. Check local recycling code.",
    "trash": "Send to general waste. Manual inspection may be needed."
}


@app.get("/")
def home():
    return {
        "message": "VisionSort API is running",
        "model_loaded": True,
        "mongo_available": mongo_available,
        "classes": class_names
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    start_time = time.time()

    image = Image.open(file.file).convert("RGB")
    image = image.resize(IMG_SIZE)

    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)

    predictions = model.predict(image_array)
    predicted_index = int(np.argmax(predictions[0]))
    confidence = float(np.max(predictions[0]) * 100)
    predicted_class = class_names[predicted_index]

    inference_time_ms = round((time.time() - start_time) * 1000, 2)

    risk_level = "LOW"
    warning = "No fault detected"

    if confidence < 60:
        risk_level = "HIGH"
        warning = "Low confidence. Manual verification required."
    elif confidence < 80:
        risk_level = "MEDIUM"
        warning = "Moderate confidence. Review recommended."

    result = {
        "filename": file.filename,
        "predicted_class": predicted_class,
        "confidence": round(confidence, 2),
        "disposal_instruction": DISPOSAL_GUIDE.get(predicted_class, "No disposal instruction available."),
        "risk_level": risk_level,
        "warning": warning,
        "inference_time_ms": inference_time_ms,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    if mongo_available:
        collection.insert_one(result.copy())

    return result


@app.get("/history")
def history():
    if not mongo_available:
        return {
            "mongo_available": False,
            "message": "MongoDB is not running. History is disabled.",
            "history": []
        }

    records = list(collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(20))
    return {
        "mongo_available": True,
        "history": records
    }


@app.get("/metrics")
def metrics():
    if not mongo_available:
        return {
            "mongo_available": False,
            "total_predictions": 0,
            "class_distribution": {}
        }

    records = list(collection.find({}, {"_id": 0}))
    total = len(records)

    class_distribution = {}
    for item in records:
        cls = item.get("predicted_class", "unknown")
        class_distribution[cls] = class_distribution.get(cls, 0) + 1

    return {
        "mongo_available": True,
        "total_predictions": total,
        "class_distribution": class_distribution
    }