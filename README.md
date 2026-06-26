# VisionSort: Automated Multi-Category Waste Classification Pipeline

VisionSort is an AI-powered waste classification system designed to identify different categories of recyclable and non-recyclable waste from images. The system uses a custom Convolutional Neural Network (CNN), FastAPI backend, MongoDB storage, and a responsive industrial dashboard.

## Problem Statement

Material recycling centers suffer from high contamination rates because manual sorting lines fail to segregate plastics, metals, glass, paper, cardboard, and biological waste accurately. VisionSort aims to reduce sorting errors by using AI-based image classification.

## Features

- AI-based waste image classification
- Six waste categories: cardboard, glass, metal, paper, plastic, trash
- Confidence score generation
- Risk level detection
- Disposal recommendation
- FastAPI backend
- MongoDB prediction history
- Live dashboard using HTML, CSS, and JavaScript
- Analytics with prediction count and average confidence
- Doughnut chart for class distribution

## Tech Stack

- Python
- TensorFlow / Keras
- FastAPI
- MongoDB
- HTML
- CSS
- JavaScript
- Chart.js

## Project Architecture

```text
User Uploads Waste Image
        ↓
Frontend Dashboard
        ↓
FastAPI Backend
        ↓
CNN Classification Model
        ↓
Prediction + Confidence Score
        ↓
MongoDB Storage
        ↓
Dashboard Analytics