# 🧠 Project Management App

A modern, full-stack **Project & Task Management Web Application** built with **Django**, **Django REST Framework**, **React.js**, and **PostgreSQL**.

## 🌟 Features

### 🔐 Authentication & Roles
- Secure **JWT-based login system**
- Custom user model with roles: `Admin`, `Manager`, `Member`
- Role-based permissions to protect and customize views (e.g., only assigned users can edit tasks)

### 👤 User Profile
- Each user has a profile with:
  - `Username`
  - `Email`
  - `Role`
  - `Profile Picture` (with image upload functionality)

### 📁 Projects
- Create, view, and delete projects
- Assign projects to team members
- Only project creators can manage associated tasks

### ✅ Tasks
- Add, edit, delete tasks inside a project
- Assign tasks to team members
- Track task status: `In Progress`, `Completed`, `On Hold`
- Pagination and search supported
- File attachment support for each task

### 💬 Comments
- Team members can comment on tasks
- Shows real-time collaboration history

### 📌 Activity Logs
- Every important action (like task creation, updates, status changes) is logged
- Helps admins and managers track project changes

### 💅 Frontend UI
- Built with modern **React.js**
- Clean, responsive, and accessible layout
- Home page with:
  - Welcome message
  - Logged-in user profile display
  - Overview of project features
- Navigation bar, protected routes, login/logout, and dynamic role-based rendering

### 🛡 Backend
- **Django** + **Django REST Framework**
- Custom user model with image upload field
- JWT authentication using `SimpleJWT`
- Filter, Search, Ordering enabled via Django Filter backend

## 🛠️ Tech Stack

| Layer        | Tech                                 |
|--------------|--------------------------------------|
| Frontend     | React, Axios, React Router           |
| Backend      | Django, Django REST Framework        |
| Auth         | JWT (SimpleJWT)                      |
| Database     | PostgreSQL                           |
| Storage      | Local file storage (for attachments) |
| Dev Tools    | Git, VS Code, Postman, Vite          |


## 🚀 Getting Started

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

> Create `.env` file with:
```
DB_NAME=your_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Folder Structure

```
project-management-app/
├── backend/
│   ├── core/
│   ├── media/
│   ├── Backend/
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── context/
│   └── index.html
├── .gitignore
├── README.md
```

## 🧑‍💻 Author

**Sejal Singh**  
🌍 [GitHub Profile](https://github.com/sejalsingh123)

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
