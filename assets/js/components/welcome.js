import React, { useState, useEffect } from 'react';

import {Socket} from "phoenix"

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:  useEffect(() => {    // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default class Welcome extends React.Component {

  constructor (props) {
    super(props)
    let socket = new Socket("/socket", {params: {token: window.userToken}})
    socket.connect()
    let channelId = window.location.pathname.split("").pop()
    let channelName = "room:" + channelId 
    this.state = { 
      chatSocket: socket,
      channelId: channelId,
      channelName: channelName,
      channel: socket.channel(channelName, {}),
      chatMessage: '',
      userId: 1,
      recentMessages: []
    }

    this.state.channel.on("new_msg", payload => {
      console.log('payload', payload)
      messages = this.state.recentMessages
      messages.push(payload)
      this.setState({recentMessages: messages})
    })

    this.state.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
  }

  foo = (props) => {
    console.log(this.state)
  }

  sendChat = (e) => {
    console.log(this.state.chatMessage, this.state.userId)
    const msgObj = { 
      body: this.state.chatMessage,
      userId: Number(this.state.userId),
      chatChannelId: Number(this.state.channelId)
    }

    this.state.channel.push("new_msg", msgObj)
  }

  updateMessage = (e) => {
    this.setState({chatMessage: e.target.value})
  }

  asOptions = () => {
    const bar = this.props.users.map( (ele,i) => {
      return <option value={ele[1]} key={i}>{ele[0]}</option>
    })
    return(
      bar
    )
  }

  updateUser = (e) => {
    this.setState({userId: e.target.value})
  }

  render() {
    const usersAsOpts = this.asOptions()
    const messages = this.state.recentMessages.map( (ele,i) => {
      return(
        <div key={i}>
          <span>{ele.inserted_at} {ele.body} by {ele.submitted_by}</span>
        </div>
      )
    })
    return (
      <div>
        {messages}
        <label> Send Message As</label>
        <select id="userId" onChange={this.updateUser} value={this.state.userId}>
          {usersAsOpts}
        </select>
        <input type="text" label="chathere" value={this.state.chatMessage} onChange={this.updateMessage} />
        <input type="submit"  label="submit" value="Send!" onClick={this.sendChat} />
      </div>
    )
  }
}