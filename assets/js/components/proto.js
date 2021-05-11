import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import useIntersect from "./useIntersect";
import MessageElement from "./message_element"

const IntersectBox = props => {

  const [ref, entry] = useIntersect({
    threshold: [.5]
  });

  return (
    <div {...props} ref={ref} ratio={entry.intersectionRatio}>
      <span>{props.message.inserted_at} - {props.message.body} by {props.message.inserted_by} </span>
    </div>
  );
};

function Proto(props) {
  return (
    <div className="App">
      {props.messages.map((message, i) => (
        <IntersectBox message={message} initial={i % 2} key={i}  />
      ))}
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Proto />, rootElement);

export default Proto;
