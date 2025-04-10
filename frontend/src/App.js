import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${currentUser.id}`, currentUser);
        toast.success('User updated successfully');
      } else {
        await axios.post(API_URL, currentUser);
        toast.success('User added successfully');
      }
      
      setShowModal(false);
      fetchUsers();
      setCurrentUser({ id: null, name: '', email: '' });
      setIsEditing(false);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Operation failed';
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">User Management</h1>
      
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add User
      </Button>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        setIsEditing(false);
        setCurrentUser({ id: null, name: '', email: '' });
      }}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

export default App;