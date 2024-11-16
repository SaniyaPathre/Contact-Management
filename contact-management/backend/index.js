const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/contacts", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Routes
app.post("/contacts", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (err) {
    res.status(400).send({ message: "Error creating contact", error: err.message });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (err) {
    res.status(500).send({ message: "Error fetching contacts", error: err.message });
  }
});

app.put("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).send({ message: "Contact not found" });
    res.send(contact);
  } catch (err) {
    res.status(400).send({ message: "Error updating contact", error: err.message });
  }
});

app.delete("/contacts/:id", async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
    try {
      const { id } = req.params;
      const contact = await Contact.findByIdAndDelete(id);
      if (!contact) {
        return res.status(404).send({ error: "Contact not found" });
      }
      res.status(204).send(); // Success response
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(400).send({ error: "Failed to delete contact" });
    }
  });
  
  

// Dummy Contacts
const dummyContacts = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    company: "TechCorp",
    jobTitle: "Software Engineer"
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
    company: "BizInc",
    jobTitle: "Project Manager"
  },
  {
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    phone: "5555555555",
    company: "HealthCare Solutions",
    jobTitle: "Data Scientist"
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "4444444444",
    company: "BuildIt",
    jobTitle: "Architect"
  },
  {
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
    phone: "3333333333",
    company: "GreenWorld",
    jobTitle: "Environmental Specialist"
  }
];

// Insert Dummy Contacts
const insertDummyContacts = async () => {
  try {
    const count = await Contact.countDocuments();
    if (count === 0) {
      await Contact.insertMany(dummyContacts);
      console.log("Dummy contacts added to the database.");
    } else {
      console.log("Dummy contacts already exist in the database.");
    }
  } catch (err) {
    console.error("Error inserting dummy contacts:", err);
  }
};

insertDummyContacts();

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
