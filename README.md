# **🚀 Setting Up the Expense Tracker Locally**

## **📌 Prerequisites**

Before you begin, make sure you have the following installed on your system:

\- Node.js (Download from https://nodejs.org/)

\- MongoDB (For local database, install MongoDB Community Edition: https://www.mongodb.com/try/download/community)

\- Git (Download from https://git-scm.com/)

## **1️⃣ Clone the Repository**

Open a terminal (or Command Prompt) and run the following command:

git clone https://github.com/\<your-username\>/expense-tracker.git

Navigate into the project folder:

cd expense-tracker

## **2️⃣ Setting Up the Backend**

Navigate to the backend folder:

cd expense-tracker-backend

Install dependencies:

npm install

Create a \`.env\` file in \`expense-tracker-backend/\` and add:

PORT=5001  
MONGO\_URI=mongodb://localhost:27017/expense-tracker

Start the backend server:

npm start

Your backend will now run at \`http://localhost:5001\`

## **3️⃣ Setting Up the Frontend**

Navigate to the frontend folder:

cd ../expense-tracker-frontend

Install dependencies:

npm install

Create a \`.env\` file in \`expense-tracker-frontend/\` and add:

VITE\_API\_URL=http://localhost:5001

Start the frontend server:

npm run dev

Your frontend will be available at \`http://localhost:5173\`

## **4️⃣ Using the Expense Tracker**

Open your browser and visit \`http://localhost:5173\`

Features:

\- Manage expenses by adding, editing, and deleting transactions.

\- View a summary of monthly expenses.

## **5️⃣ Stopping the Application**

To stop the backend and frontend, press \`CTRL \+ C\` in the terminal where they are running.

## **📌 Troubleshooting**

❌ MongoDB Errors:

If MongoDB is not running, start it manually:

mongod

❌ Port Already in Use:

Change the PORT in the \`.env\` file and update the frontend \`VITE\_API\_URL\` accordingly.

❌ Frontend Not Loading:

Ensure the backend is running before starting the frontend. Check browser console logs for API errors.

 

