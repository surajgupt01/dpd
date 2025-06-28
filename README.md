# 🚀 DPD-Assignment - Full Stack Feedback Dashboard

A modern full-stack application built with:

- 🔧 **Frontend**: React + TypeScript + Tailwind CSS
- ⚙️ **Backend**: FastAPI + SQLAlchemy + PostgreSQL (optional)
- 🐳 **Dockerized**: Fully containerized with Docker and Docker Compose

---

## 📁 Project Structure

DPD-Assignment/
├── dashboard/             # React frontend
│   ├── Dockerfile
│   ├── package.json
│   └── ...                # src/, public/, etc.
│
├── dpdbackend/            # FastAPI backend
│   ├── Dockerfile
│   ├── main.py
│   ├── requirements.txt
│   └── ...                # Models, schemas, auth, routes
│
├── docker-compose.yml     # Compose config to run both services
└── README.md              # You're here!


---

## ⚙️ Features

- ✍️ Employee and Manager Signup/Login
- 📬 Submit and view feedback
- 📊 Visual analytics with Recharts (line charts)
- 🔒 JWT-based authentication
- 🌐 CORS support for frontend-backend communication
- 📦 Dockerized for consistent development & deployment

---

## 🚀 Getting Started



### 📦 Prerequisites



- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional: Node.js & Python for local setup without Docker)

---

### 🐳 Run with Docker Compose

1. **Clone the repository**:

```bash
git clone https://github.com/surajgupt01/dpd

docker-compose up --build

```
2. **Run Locally**:
🧠 Backend
```bash

cd dpdbackend
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
3. 🖥️ Frontend
```bash
cd dashboard
npm install
npm run dev

## 📬 Contact
```
For questions, feedback, or collaboration:

**👤 Suraj Gupta**  
📧 Email: [surajgupt880@gmail.com] 
🔗 LinkedIn: [https://www.linkedin.com/in/suraj-gupta-1894051ba/]


Feel free to reach out!




