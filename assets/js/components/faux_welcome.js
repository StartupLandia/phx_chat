import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {Socket} from "phoenix"


function Example() {
  const [count, setCount] = useState(0);

// Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  let socket = new Socket("/socket", {params: {token: window.userToken}})

  socket.connect()

  let channelName = "room:" + window.location.pathname.split("").pop()
  let channel = socket.channel(channelName, {})
  let chatInput         = document.querySelector("#chat-input")
  let messagesContainer = document.querySelector("#messages")
  let submitButton = document.querySelector("#chatSubmit")
  let userSelector = document.querySelector("#userId")

  if (chatInput) {
    chatInput.addEventListener("keypress", event => {
      if(event.key === 'Enter'){
        channel.push("new_msg", {body: chatInput.value, userId: Number(userSelector.value), chatChannelId: Number(window.location.pathname.split("").pop())  })
        chatInput.value = ""
      }
    })

    submitButton.addEventListener("click", event => {
      channel.push("new_msg", {body: chatInput.value, userId: Number(userSelector.value), chatChannelId: Number(window.location.pathname.split("").pop())  })
      chatInput.value = ""
    })

    channel.on("new_msg", payload => {
      let messageItem = document.createElement("div")
      messageItem.innerText = `${payload.inserted_at} ${payload.body} by ${payload.submitted_by}`
      messagesContainer.appendChild(messageItem)
    })
  }


  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })
return (
  <div>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  </div>
);
}

export const Welcome = function(props) {
  const foo = Example()


  return (
    <div>
      { foo }
      <h1>Hello, {props.name} </h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
