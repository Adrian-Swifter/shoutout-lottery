import React from "react";

function Button(props) {
  return (
    <button className={props.classes} onClick={props.fn}>
      {props.title}
    </button>
  );
}

export default Button;
