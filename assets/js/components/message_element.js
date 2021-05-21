import React from 'react';

function MessageElement(props) {
  console.log('props', props.message.id)
  return(
    <div>
      <span>{props.message.inserted_at} - {props.message.body} by {props.message.inserted_by} </span>
    </div>
  )
}
 
export default MessageElement;
