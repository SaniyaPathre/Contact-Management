# Contact Management - Mini CRM Feature

This project is a Contact Management system designed as a mini feature for a Customer Relationship Management (CRM) tool. It allows users to manage contacts by adding, viewing, editing, and deleting them via an intuitive React frontend and a robust Node.js backend.

---

## Project Description

The application simplifies contact management for users, particularly in business contexts, by organizing customer/client information in one place. It provides the following features:

- **Add Contacts:** Allows users to create new entries with essential information.
- **View Contacts:** Displays all contacts in a paginated, sortable table for easy navigation.
- **Edit Contacts:** Enables users to update contact details when needed.
- **Delete Contacts:** Removes outdated or unnecessary contacts.

### Major Technical Decisions

1. **React with Material-UI (MUI):** Selected for building a modern, responsive frontend UI.
2. **Node.js with Express.js:** Chosen for simplicity and efficiency in creating REST APIs.
3. **MongoDB:** Used as the database for its scalability and flexibility in managing contact information.
4. **Axios:** Used for smooth API communication between frontend and backend.
5. **CORS Configuration:** Enabled to allow communication between the React app (localhost:3000) and the backend server (localhost:5000).

---

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd contact-management
   ```

2. **Backend Setup**
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Ensure MongoDB is running on `mongodb://127.0.0.1:27017`.
   - Start the backend server:
     ```bash
     node index.js
     ```

3. **Frontend Setup**
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

4. **Access the Application**
   - Visit `http://localhost:3000` in your web browser.

---

## Database Schema Script

Below is the MongoDB schema used for the project:

```javascript
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
```

---

## How the App Works

### Frontend
- Built using **React.js** with **Material-UI**.
- Contains:
  - **Form:** For adding/editing contacts.
  - **Contact Table:** Displays contacts with pagination, sorting, and action buttons for editing and deleting.

### Backend
- Built with **Node.js** and **Express.js**.
- API Endpoints:
  - **POST /contacts:** Add a new contact.
  - **GET /contacts:** Retrieve all contacts.
  - **PUT /contacts/:id:** Update contact details by ID.
  - **DELETE /contacts/:id:** Delete a contact by ID.

### Data Flow
1. User interacts with the React frontend.
2. Frontend sends API requests to the backend server using Axios.
3. Backend performs CRUD operations on the MongoDB database.

---

## Challenges and Solutions

### **Challenge 1: API Integration Issues**
- **Problem:** Delete operation returned a 400 error due to incorrect ID formatting.
- **Solution:** Ensured the ID passed from the frontend matches the `_id` format used in MongoDB. Added debugging logs and verified the response from the API.

### **Challenge 2: Cross-Origin Resource Sharing (CORS)**
- **Problem:** Frontend requests were blocked by the browser due to CORS issues.
- **Solution:** Configured the backend to enable CORS with the following middleware:
  ```javascript
  const cors = require("cors");
  app.use(cors());
  ```

### **Challenge 3: Data Validation**
- **Problem:** Users could submit incomplete or duplicate data.
- **Solution:** Added validation for required fields in the schema and unique constraints for email:
  ```javascript
  email: { type: String, required: true, unique: true }
  ```

### **Challenge 4: Frontend Refresh After Actions**
- **Problem:** Contact list didn’t update automatically after CRUD operations.
- **Solution:** Added `fetchContacts()` calls to reload the data after each action.

---

## Future Enhancements

- Add authentication for secure access.
- Enhance UI with search and filter functionality.
- Implement bulk upload for contacts via CSV files.

---

## Author

Developed by Saniya Pathre.

