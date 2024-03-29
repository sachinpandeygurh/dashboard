import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from 'axios';

function ViewDetails(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/v1/user/finduser/${props.id}`);
        console.log("response.data.result", response.data);
        setUsers(response.data);
      } catch (error) {
        console.warn("error:", error);
      }
    };

    getUserDetails();
  }, [props.id]);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        {users.map((user, index) => (
          <Card key={index}>
            <Card.Img className="rounded" variant="top" src={user.profilePicture} />
            <Card.Body>
              <Card.Title>
                {user.firstName} {user.lastName}
              </Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>Status: {user.status}</Card.Text>
              <Card.Text>Phone Number: {user.phoneNumber}</Card.Text>
              <Card.Text>Address: {user.address}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        {users.length === 0 && <p>Loading user details...</p>}
      </Modal.Body>
      <Modal.Footer>
        <Link onClick={props.onHide}>Close</Link>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewDetails;
