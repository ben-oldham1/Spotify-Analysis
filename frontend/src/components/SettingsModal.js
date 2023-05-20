import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Container } from 'react-bootstrap';
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
                    <Container>
                        <Row className='mb-1'>
                            <div>
                                How far back should we analyse?
                            </div>
                        </Row>

                        <Row className='mb-3'>
                            <Form>

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
                            </Form>
                        </Row>

                        <Row className='mb-2'>
                            <div>
                                Logout?
                            </div>
                        </Row>
                        <Row className='mb-1'>
                            <Button variant="outline-danger" onClick={logout}>
                                Logout
                            </Button>
                        </Row>

                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SettingsModal;