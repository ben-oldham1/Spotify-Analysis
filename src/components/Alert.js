import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible(props) {

  // We inherit the apiError and setApiError props from parent, which determines whether the error alert shows

  return (
    <>
      <Alert show={props.apiError} variant="warning" className="w-100 mx-auto my-3">
        <Alert.Heading>{props.headerText}</Alert.Heading>
        <p>
          {props.bodyText}
        </p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => props.setApiError(false)} variant="outline-warning">
            Dismiss
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertDismissible;