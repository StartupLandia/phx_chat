// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket,
// and connect at the socket path in "lib/web/endpoint.ex".
//
// Pass the token on params as below. Or remove it
// from the params if you are not using authentication.
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

// Now that you are connected, you can join channels with a topic:
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

export default socket
