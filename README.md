## 🧩 Core Features of "LETS LEARN"

"Let's Learn" is an e-learning platform built for use in universities by **students and teachers**. Below are some of its core features:

---

### 📚 1. Course Creation with Topics

**Teachers** can easily upload a course and add multiple types of content under different topics, including:

- 📝 Quizzes  
- 📄 Assignments  
- 📚 Documents  
- 🎯 Discussions
- ...

**Students** can browse, view, and participate in each topic.

<img width="1295" height="722" alt="Screenshot 2025-07-11 092806" src="https://github.com/user-attachments/assets/f8832b48-d969-4d87-a8ef-542d5e6fa0bc" />

---

### 📆 2. Smart Calendar View

A built-in **calendar** shows the **start and end dates** of all tasks and activities (quizzes, assignments, etc.):

<img width="1020" height="508" alt="Screenshot 2025-07-11 093000" src="https://github.com/user-attachments/assets/5311a209-f9ae-449f-bf39-6fdabd752c87" />

---

### 📊 3. Detailed Dashboard for Teachers and Students

- **Teachers** get insight into student participation, submissions, and grading status.  
- **Students** can track their progress across courses, upcoming tasks, and results.

<img width="972" height="506" alt="Screenshot 2025-07-11 093040" src="https://github.com/user-attachments/assets/4638f3b4-51e4-4187-b785-cbf0cf4d159a" />

---

### And more...

<img width="970" height="490" alt="Screenshot 2025-07-11 092921" src="https://github.com/user-attachments/assets/471b4e4c-5eae-405c-8d8c-c9938524a63b" />

---

# LETS LEARN GUIDE

This guide provides step-by-step instructions to set up and run the Angular application locally.

## 🛠️ Setup Instructions

### 1. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

Then run the following command in the project root folder:

```bash
npm install
```

### 2. Configure Environment Variables

Open the file src/environments/environment.development.ts and fill in the following values:

```ts
export const environment = {
  production: false,
  BACKEND_URL: "http://localhost:8080",

  CLOUDINARY_CLOUD_NAME: "",
  UPLOAD_PRESET_NAME: "",
  CLOUDINARY_API_KEY: "",
  CLOUDINARY_API_SECRET: "",
};
```

⚠️ **Note**:

- Go to [Cloudinary](https://cloudinary.com/) to create an account and get your API keys.
- Go to [Let's learn backend](https://github.com/ptdat4823/spring-lets-learn-be) to set up the backend server for this application. (This backend server runs on port 8080 by default.)

### 3. Run the Application

Start the development server by running:

```bash
npm run dev
```

Once the server is running, open your browser and go to: **http://localhost:4200**

