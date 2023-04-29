import React from 'react';

function Alert(props) {
    return <div className={"alert alert-" + props.type + " w-100"} role="alert">
    <h4 className="alert-heading">{props.heading}</h4>
    <p>{props.bodyText}</p>
  </div>;
}

export default Alert;