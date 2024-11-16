import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableSortLabel, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "" });
  const [editId, setEditId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");

  const API_URL = "http://localhost:5000/contacts";

  // Fetch Contacts
  const fetchContacts = async () => {
    const res = await axios.get(API_URL);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setDialogOpen(false);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setForm(contact);
    setEditId(contact.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    console.log("Contact ID to delete:", id); // Log the ID to check
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      alert("Contact deleted successfully.");
      fetchContacts(); // Refresh the contact list
    } catch (error) {
      console.error("Error deleting contact:", error.response?.data || error.message);
      alert("Failed to delete contact. Please try again.");
    }
  };
  
  

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box padding={3}>
      <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Contact</Button>
      <Table>
        <TableHead>
          <TableRow>
            {["First Name", "Last Name", "Email", "Phone", "Company", "Job Title", "Actions"].map((col, idx) => (
              <TableCell key={idx}>
                <TableSortLabel
                  active={orderBy === col.toLowerCase()}
                  direction={orderBy === col.toLowerCase() ? order : "asc"}
                  onClick={() => handleSort(col.toLowerCase())}
                >
                  {col}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
            <TableRow key={contact.id}>
              {Object.keys(form).map((key) => <TableCell key={key}>{contact[key]}</TableCell>)}
              <TableCell>
                <Button onClick={() => handleEdit(contact)}>Edit</Button>
                <Button onClick={() => handleDelete(contact.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={contacts.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editId ? "Edit Contact" : "Add Contact"}</DialogTitle>
        <DialogContent>
          {Object.keys(form).map((key) => (
            <TextField
              key={key}
              label={key}
              name={key}
              value={form[key]}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default App;
