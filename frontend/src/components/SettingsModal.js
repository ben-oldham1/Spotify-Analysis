import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap';

function SettingsModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Removes the authorisation token, thus logging the user out from Spotify
    const logout = () => {
        props.setToken("")
        window.sessionStorage.removeItem("token")
    }

    const handleTermChange = (e) => {
        props.onTermChange(e.target.value);
    };

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
                    <Row>
                        <div>
                            How far back should we analyse?
                        </div>
                    </Row>

                    <Form>
                        <Form.Group as={Row}>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="Short-term"
                                    name="term"
                                    id="short-term"
                                    value="short_term"
                                    checked={props.selectedTerm === 'short_term'}
                                    onChange={handleTermChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Medium-term"
                                    name="term"
                                    id="medium-term"
                                    value="medium_term"
                                    checked={props.selectedTerm === 'medium_term'}
                                    onChange={handleTermChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Long-term"
                                    name="term"
                                    id="long-term"
                                    value="long_term"
                                    checked={props.selectedTerm === 'long_term'}
                                    onChange={handleTermChange}
                                />
                            </Col>
                        </Form.Group>
                    </Form>

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