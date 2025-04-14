# LangViz – Language Agnostic Visualization Web Application

## 🌟 Overview

**LangViz** is a lightweight and intuitive web application that enables users to generate static, interactive, and 3D visualizations by submitting scripts written in either **Python** or **R**. The system dynamically executes the code in isolated Docker environments and renders the resulting visual output seamlessly in the frontend UI.

This tool is ideal for learners, analysts, and educators who want a quick, browser-based way to test and visualize data using familiar scripting languages.

---

## 🔧 Features

- 🌐 **Language Support**: Python & R script execution
- 📜 **Code Editor**: Clean interface with language selection and code input
- 📊 **Visualization**: Displays resulting charts directly in the web interface
- 📦 **Docker-Based Backend**: Secure execution using language-specific containers
- 📈 **Supported Output Types**: 
  - Static visualizations
  - Interactive visualizations
  - 3D visualizations

---

## 🧱 Tech Stack

| Component  | Technology Used           |
|------------|---------------------------|
| Frontend   | React                     |
| Backend    | Flask (Python) + Docker   |
| Scripting  | Python & R                |
| Python Libs| Matplotlib, Plotly        |
| R Libs     | ggplot2, plotly, plot3D   |
| Execution  | Docker Compose (multi-service) |

---

## 🚀 How It Works

### Frontend (React)
- Dropdown to choose language (Python or R)
- Textarea to input code (supporting `matplotlib`, `plotly`, `ggplot2`, etc.)
- Button to trigger execution and fetch visualization
- Displays image returned from backend (`visualization.png`) dynamically

### Backend (Flask + Docker)
- Receives the submitted code and language choice via POST `/execute`
- Spins up the appropriate Docker container (`python-runner` or `r-runner`)
- Executes the script securely inside the container
- Saves the visualization to a public `output/` directory
- Returns the image for frontend display

---

### 🐳 Running LangViz Locally using Docker
LangViz provides full Docker support to easily run both Python & R environments for visualization generation.

📋 **Prerequisites**
Make sure you have the following installed:

-  Docker
-  Docker Compose (comes with Docker Desktop)

**🚀 Steps to Run LangViz using Docker**
1.  Clone the Repository

    git clone https://github.com/shubhams14-dev/LangViz.git

    cd LangViz

2.  Build & Start Backend using Docker

    docker-compose up --build

    This will:

    Build two images → one for Python execution & one for R execution.

    Start the Flask backend server at → http://localhost:5000

    Create an output/ folder in the backend to store generated visualizations.

3.  Start the Frontend

    cd frontend

    npm install

    npm start

    The frontend will be available at:
    http://localhost:3000

4.  Configure Environment Variable

    Inside the frontend/ directory, create a .env file:

    REACT_APP_BACKEND_URL=http://localhost:5000

5.  Access the Application

    http://localhost:3000

    You can:

    Choose Python or R

    Paste your visualization codes from the backend/sample_test_codes directory 

    Click “Generate” to see the output

6.  Stopping Docker Containers

    docker-compose down

📂 Output Location for Visualizations

All generated charts are saved in:

backend/output/visualization.png

🔥 Quick Commands Reference

Command	Purpose

-  docker-compose up --build	:Build & run backend containers
-  docker-compose down	:Stop all running containers
-  npm start (in frontend/)	:Start the frontend locally

---

## 🧪 Example Visualizations

### ✅ Python
- Static: Bar chart using `matplotlib`

  ![image](https://github.com/user-attachments/assets/80a08dce-6374-4f0c-93d9-6d3a443f4b07)



- Interactive: Line chart using `plotly`

  ![image](https://github.com/user-attachments/assets/b2724198-fc68-4f23-801c-5129df26d610)
  

- 3D: Surface plot using `plotly.graph_objects`

  ![image](https://github.com/user-attachments/assets/3ae9453d-8e15-47de-9da9-6922238dd033)


### ✅ R
- Static: Scatter plot using `ggplot2`

  ![image](https://github.com/user-attachments/assets/730b40f2-d20c-4503-8f3e-58df0b2f6e7a)


- Interactive: Line chart using `plotly`

  ![image](https://github.com/user-attachments/assets/36f14e60-6e74-42a4-8ae4-63cd6c9931a7)


- 3D: Surface plot using `plot3D`


![image](https://github.com/user-attachments/assets/6da5b6fb-af39-4207-b546-2e84ec92a7bb)

---

## 🐞 Challenges Faced & Solutions

### 1. **Docker Runtime Issues**
   - **Problem**: Python/Plotly visualizations didn’t render properly in containers initially.
   - **Solution**: Used correct `ENTRYPOINT` and ensured virtual environment paths were accurately set. Switched from `show()` to `savefig()` programmatically.

### 2. **Frontend Image Caching**
   - **Problem**: Browser cached the same image even after updates.
   - **Solution**: Appended timestamps to image URLs (`?t=${Date.now()}`) to prevent caching.

### 3. **R Plot Export Failures**
   - **Problem**: R `plotly` and `plot3D` charts failed with `webshot2`.
   - **Solution**: Switched to basic `png()` device-based saving for better compatibility within Docker.

---

## 📦 Repository Structure

![image](https://github.com/user-attachments/assets/fe642eb9-c546-4ce1-80cf-cf33c3fbdb19)



---

## 📺 Demo Recording

📹 **[Screen Recording Link]**:  https://drive.google.com/file/d/1TXiAUfg1gbFY0DCuhuGPy0mU-7Qhs7S7/view?usp=sharing

_Covers Python and R visualizations – static, interactive, and 3D._

---

## 🌐 Live Demo

🖥️ **Website**: [https://shubhams14-dev.github.io/LangViz/](https://shubhams14-dev.github.io/LangViz/)

---

## 🛠️ GitHub Actions
This project uses GitHub Actions to automate both backend testing and frontend deployment:

✅ **Backend CI Workflow (docker-ci.yml)**

-  Triggered on every push or pull request to the main branch.

-  It performs the following tasks:

-  Checks out the repository

-  Sets up Docker Buildx for multi-platform build support

-  Builds the backend Docker image using ./backend/Dockerfile

-  Runs a Python test to verify static chart generation using Matplotlib

-  Runs an R test to verify static chart generation using Rscript and plot()

🚀 **Frontend Deployment Workflow (frontend-deploy.yml)**

-  Triggered on every push to the main branch.

-  It performs the following tasks:

-  Checks out the repository

-  Sets up Node.js (v18)

-  Installs frontend dependencies using npm ci

-  Builds the React frontend using npm run build

-  Deploys the build folder (frontend/build) to GitHub Pages

-  Deployment uses peaceiris/actions-gh-pages with your GITHUB_TOKEN for authentication.

Once deployed, the site becomes available at:
📍 https://shubhams14-dev.github.io/LangViz/

---

## ⚠️ Error Handling
LangViz includes basic error handling to ensure smooth user experience and quick debugging:

Invalid Language Selection:
If a user selects one language (e.g., Python) but submits code written in a different language (e.g., R), the backend may fail to execute it correctly. In such cases:

The app displays an alert message
This is triggered on any failure in backend execution or visualization rendering.

Silent Failures or Missing Plots:
If the code does not generate or save a plot in the expected format (output/visualization.png), the frontend will not render any image, and a fallback alert is shown.

Network or API Errors:
If the backend is unreachable or there's a server error, the frontend catches it using try/catch in Axios and informs the user with a similar alert.

Note: All errors are logged to the console (browser and server) to assist in debugging during development and testing.

---
## 👨‍💻 Author

**Shubham Sandip Salunke**  
Graduate Student – Computer Science @ Indiana University Bloomington  
Email: ssalunke@iu.edu | GitHub: [shubhams14-dev](https://github.com/shubhams14-dev)

---


