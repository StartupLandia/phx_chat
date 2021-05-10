import React from 'react';

function MessageElement(props) {
 
  return(
    <div>
      <span>{props.message.inserted_at} - {props.message.body} by {props.message.inserted_by} </span>
    </div>
  )
}
 
export default MessageElement;
