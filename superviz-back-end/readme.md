# Industrial Data Processing and Insights Backend

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Node.js&message=runtime&color=green&style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/static/v1?label=Docker&message=containerization&color=blue&style=for-the-badge&logo=docker"/>
  <img src="https://img.shields.io/static/v1?label=Raspberry Pi&message=hardware&color=red&style=for-the-badge&logo=raspberry-pi"/>
  <img src="https://img.shields.io/static/v1?label=SuperViz&message=real-time&color=purple&style=for-the-badge&logo=none"/>
</p>

## Project Status: ⚠ In Development

### Description

The *Industrial Data Processing Backend* is responsible for handling and transforming real-time data from a Festo industrial plant. The backend is split into two parts: a *Raspberry Pi* layer that communicates with the plant and sends data to *Gemini AI* for analysis, and a *Node.js* layer that uses *SuperViz SDK* to relay real-time insights to the frontend dashboard.

### ⚙ Features

- *Data Collection from Industrial Plant: Connects to the Festo plant, extracting key data points via **pymodbus*.
- *AI Insights: Processes production data through **Gemini AI* to derive actionable insights.
- *Real-Time Data Transmission: Using **SuperViz SDK*, the backend ensures data continuity to the frontend for instant analysis.

### 📚 Project Vision

By enabling real-time data processing and AI analysis, this backend architecture demonstrates the potential of smart industrial solutions in providing valuable insights, improving production efficiency, and making data accessible across Industry 4.0 environments.

### 📋 Table of Contents

- [Getting Started](#getting-started)
- [How to Run](#how-to-run)
- [Development](#development)
- [Authors](#authors)

## 🚀 Getting Started

Ensure you have the following prerequisites before setting up the backend.

### 📋 Prerequisites

- Node.js
- Docker
- pymodbus (for Raspberry Pi setup)

### 🔧 Installation

1. Clone the repository:

   bash
   git clone https://github.com/LuizDelgado/SupervizRealtime-Industrial-Interface.git
   

2. Navigate to the backend directory:

   bash
   cd SupervizRealtime-Industrial-Interface/backend
   

3. Install dependencies:

   bash
   npm install
   

4. Copy the .env file:

   bash
   cp .env.example .env
   

5. Start the Docker container (Raspberry Pi):

   bash
   docker-compose up
   

## ⚙ How to Run

To start the backend:

bash
npm start


## 📦 Deployment

The backend Node.js server is hosted on *Railway*, and the Raspberry Pi runs Docker to manage the data collection process. Deployment requires Docker setup on Raspberry Pi and Node.js server hosting.

## 🛠 Built With

- [Node.js](https://nodejs.org/) - Backend runtime environment
- [Docker](https://www.docker.com/) - Containerization for Raspberry Pi
- [SuperViz](https://superviz.com/) - Real-time SDK for data transmission
- [Gemini AI](https://gemini.ai/) - AI service for data insights
- [MongoDB Atlas](https://www.mongodb.com/) - Database service for data storage

## ✒ Author

- *My Myself and I* - [GitHub](https://github.com/LuizDelgado)