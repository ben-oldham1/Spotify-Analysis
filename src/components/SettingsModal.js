import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
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
                            <h5>
                                Analysis period
                            </h5>
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


                        <Row className='mb-3'>
                            <h5>Disclaimer</h5>
                            <p>
                                This website is developed by a third party with no affiliation to Spotify. Data is provided through the Spotify 
                                web API. Your data is not stored by the developer(s) of this site.
                            </p>


                        </Row>

                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-danger" onClick={logout}>
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