import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function SettingsModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Removes the authorisation token, thus logging the user out from Spotify
    const logout = () => {
        props.setToken("")
        window.sessionStorage.removeItem("token")
    }

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                Settings
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Select aria-label="Default select example">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={logout}>
                        Logout
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SettingsModal;