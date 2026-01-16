# Document Management System – Frontend Assignment

## ✨ Features Implemented

### 1️⃣ Launch Page
- Entry page with **Login** and **Register** actions
- Simple and clean UI

### 2️⃣ OTP-based Login
- Generate OTP using mobile number
- Validate OTP
- Token stored in `localStorage`
- Protected routes after login

### 3️⃣ Static Admin User Creation Page
- UI-only implementation (as backend API not provided)
- Fields: Username, Password, Role
- Displays success message on submission

### 4️⃣ Document Listing
- Displays documents in a tabular format
- Columns: Document ID, Category, Date, Actions
- Data fetched from Search Document API

### 5️⃣ Upload Document
- Upload document using modal
- Fields:
  - Document Date
  - Category
  - Sub Category
  - Tags
  - Remarks
  - File upload (PDF / Image)
- Integrated with backend upload API

### 6️⃣ Filter Documents
- Filter modal with:
  - Category
  - Sub Category
  - Date Range
  - Tags
- Applies filters using Search API

### 7️⃣ Preview & Download
- Preview:
  - Images shown inside modal
  - PDFs opened via iframe (depends on signed URL permissions)
- Download:
  - Redirects to signed S3 URL

### 8️⃣ Navigation Bar
- App title
- Logout button
- Visible on authenticated pages

---

## 🛠 Tech Stack

- **React (Vite + SWC)**
- **Material UI (MUI)**
- **React Router DOM**
- **Axios**
- **Day.js**
- **MUI X Date Pickers**

---

## ▶️ How to Run the Project

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Steps

```bash
git clone <repository-url>
cd document-management-frontend
npm install
npm run dev
