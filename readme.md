# Industrial Data Processing and Insights Backend
<p align="center">
  <img src="https://img.shields.io/static/v1?label=React&message=library&color=blue&style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/static/v1?label=Vercel&message=hosting&color=black&style=for-the-badge&logo=vercel"/>
  <img src="https://img.shields.io/static/v1?label=SuperViz&message=real-time&color=red&style=for-the-badge&logo=none"/>
</p>
<p align="center">
  <img src="https://img.shields.io/static/v1?label=Node.js&message=runtime&color=green&style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/static/v1?label=Docker&message=containerization&color=blue&style=for-the-badge&logo=docker"/>
  <img src="https://img.shields.io/static/v1?label=Raspberry Pi&message=hardware&color=red&style=for-the-badge&logo=raspberry-pi"/>
  <img src="https://img.shields.io/static/v1?label=SuperViz&message=real-time&color=purple&style=for-the-badge&logo=none"/>
</p>

## Project Status: ⚠ In Development

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

A cutting-edge proof of concept (POC) showcasing real-time industrial monitoring and AI-driven insights for Industry 4.0, using a **Festo industrial plant**. This project leverages **SuperViz’s real-time SDK** and **Gemini AI** to deliver precise insights on production efficiency, marking a new frontier in intelligent manufacturing. Developed as part of the SuperHackathon, the application demonstrates how real-time communication can revolutionize industrial environments by offering a live and actionable dashboard experience.

### 📋 Table of Contents

- [Project Vision](#project-Overview)
- [Tech Stack](#tech-stack)
- [Mental Map](#mentalmap)
- [Features](#features)
- [Project Structure](#Project-Structure)
- [Getting Started](#getting-started)
- [Installation and Setup](#installation-and-setup)
- [Running the Project](#running-the-project)
- [Future Development](#future-development)
- [Authors](#authors)

---

## 🚀 Project Overview
This project serves as a proof of concept to show the potential of real-time communication and AI insights in enhancing **Industry 4.0 workflows**. Developed in collaboration with the **Centro de Inovação Tecnológica INNOVATION-ENIAC Guarulhos (CITIG)**, the project provides a seamless integration between SuperViz and Gemini, turning raw industrial data into meaningful insights.

### 🌟 Key Highlights
- **Real-Time Monitoring** with SuperViz SDK
- **AI-Generated Insights** powered by Gemini API
- **Dynamic Data Visualization** via React and Vercel
- **Scalable Backend Architecture** using Node.js, pymodbus, Docker, and MongoDB Atlas


### 📈 About SuperViz and Its Role in the Project

*SuperViz* is a cutting-edge technology that enables real-time communication and presence tracking in collaborative environments. In this project, *SuperViz SDK* serves as the backbone for real-time communication between the Festo industrial plant and the frontend, ensuring that data is continuously transmitted, processed, and visualized without delay. This continuous data stream allows stakeholders to monitor, analyze, and respond to production metrics instantaneously.

*Why SuperViz is Essential*:
- *Instantaneous Monitoring*: Provides real-time visibility into production, supporting immediate reactions to efficiency changes.
- *Future Applications*: SuperViz can be expanded into remote monitoring for complex systems, predictive maintenance, and more advanced industrial monitoring, making it an invaluable tool for digital transformation in manufacturing.

---


## ⚙️ Tech Stack
| **Component**               | **Technology**                                    |
|-----------------------------|---------------------------------------------------|
| Frontend                    | React (deployed on Vercel)                        |
| Backend - Communication     | Node.js, SuperViz SDK, pymodbus (Raspberry Pi)    |
| Insights & Data Processing  | Gemini AI API                                     |
| Database                    | MongoDB Atlas                                     |
| DevOps                      | Docker, Railway                                   |

## 📊 Mental Map of Functionality

To understand the logic flow and functional connections within the project, refer to our detailed mental map here: **[Functionality Map](https://excalidraw.com/#json=u1WAfk8vR7z43_E9Diw1b,R5BWO12pS4HtPVSSsZIUkw)**.

## 📑 Features

- *Real-Time Communication*: Achieved via SuperViz SDK, enabling instantaneous data transmission.
- *AI-Generated Insights*: Uses Gemini AI to analyze production data and predict improvement areas.
- *Dynamic Data Visualization*: The dashboard, built with React, provides interactive charts for performance analysis.
- *Scalable Architecture*: Backend consists of a Raspberry Pi layer and a Node.js server, optimized for industrial applications.

---


## 📑 Project Structure
The backend architecture is divided into two components to ensure robust communication between the plant and the dashboard:
1. **Backend on Raspberry Pi**: Runs a Docker container to communicate with the Festo plant via `pymodbus`. Data collected is sent to **Gemini AI** for advanced insights, such as production time analysis.
2. **Backend 2 on Node.js**: After insights are generated, data is passed to Backend 2 using the **SuperViz real-time SDK** for immediate storage in **MongoDB Atlas**. This setup enables instant visibility of production data on the frontend, hosted on **Vercel**.

## 🖥️ Dashboard and Data Visualization
The dashboard, built in React, showcases real-time production data through an interactive interface, including:
- **Color-Coded Production Counts**: Silver, Red, Black parts produced.
- **Last Produced Item**: Details of the most recent part, including production time and Gemini’s insights.
- **Performance Graphs**: Production times and efficiency metrics visualized in real time.

## 🔄 How Real-Time and AI Integration Elevate Industrial Monitoring
The real-time SDK by **SuperViz** is central to this project, providing an uninterrupted data flow from the production floor to the user interface. Coupled with **Gemini AI’s deep analysis**, the application does more than just report data – it contextualizes information, helping users understand performance trends, anticipate production times, and identify potential efficiency improvements.

### 🛠️ Core Functionalities Enabled by SuperViz and Gemini
1. **Instant Production Monitoring**: Using SuperViz, production updates appear in real-time, allowing a proactive approach to monitoring.
2. **Advanced AI Insights**: Gemini delivers insights such as production speed analysis and anomaly detection, helping stakeholders make informed decisions.
3. **Interactive Dashboard Visualization**: The dashboard displays color-coded production data, time trends, and detailed analysis for a comprehensive view of the production process.

## 🏗️ Development Status
**Current Status:** In Development 🚧  
This project is actively being developed as a proof of concept, with upcoming improvements focusing on expanding real-time interaction capabilities and enhancing AI-driven insights. Contributions and suggestions are welcome to drive the project forward.

## 📖 Getting Started

### Prerequisites
- **Node.js** and **npm** installed on your local environment.
- Access to **MongoDB Atlas** and **Gemini API** for data storage and AI processing.
- **Docker** for Raspberry Pi backend containerization.
- **SuperViz API keys** for real-time data streaming.

## 🔧 Installation and Setup

### Clone the Repository

1. Clone the project repository:

   bash
   git clone https://github.com/LuizDelgado/SupervizRealtime-Industrial-Interface.git
   

2. Move into the project directory:

   bash
   cd SupervizRealtime-Industrial-Interface
   

### Backend Setup

#### Raspberry Pi Backend (Docker and pymodbus)

1. Navigate to the backend folder:

   bash
   cd backend
   

2. Copy the environment configuration file and set it up with necessary credentials:

   bash
   cp .env.example .env
   

3. Install dependencies:

   bash
   npm install
   

4. Start the Docker container on Raspberry Pi:

   bash
   docker-compose up
   

5. Ensure the Raspberry Pi is connected to the Festo industrial plant and receiving data via pymodbus.

#### Node.js Backend

1. Navigate to the Node.js backend folder:

   bash
   cd backend/nodejs
   

2. Install dependencies:

   bash
   npm install
   

3. Set up the environment variables for MongoDB, SuperViz, and Gemini in the .env file.

### Frontend Setup

1. Navigate to the frontend directory:

   bash
   cd ../frontend
   

2. Install dependencies:

   bash
   npm install
   

3. Start the development server:

   bash
   npm start
   

---

## 🎯 Running the Project

After completing the installation steps, run both backends and the frontend simultaneously to connect the data pipeline.

### Backend (Raspberry Pi)

bash
cd backend && docker-compose up


### Backend (Node.js)

bash
cd backend/nodejs && npm start


### Frontend

bash
cd frontend && npm start


The frontend should now be accessible on your local server (e.g., http://localhost:3000), displaying real-time data from the Festo plant through the SuperViz-powered pipeline.

---

## 🏗 Future Development

This proof of concept lays the groundwork for a more robust, scalable industrial monitoring tool. Future enhancements include:

1. *Predictive Maintenance*: Leveraging machine learning to predict failures based on trends.
2. *Expanded AI Capabilities*: Integrating additional analytical models for deeper insights.
3. *Remote Control Capabilities*: Allowing for remote adjustments and fine-tuning directly from the dashboard.
4. *Improved Data Privacy*: Enhanced data security measures to ensure compliance with industrial data standards.

---

## ✒ Authors

My Myself and I - Developer - [GitHub](https://github.com/LuizDelgado)  
See the full list of contributors who participated in this project.

🔗 **Link to the project**: [superviz-frontend.vercel.app](https://superviz-frontend.vercel.app)



