import React, { useState, useEffect } from 'react';

import {Socket} from "phoenix"
import MessageElement from "./message_element"

import useIntersect from "./useIntersect";

const TrackedViewable = (props) => {
  const [ref, entry] = useIntersect({
    threshold: [.5],
    intersectCall: props.intersectCallback
  });

  return (
    <div ref={ref} ratio={entry.intersectionRatio} data-message-id={props.message.id}  >
      <span>{props.message.inserted_at} - {props.message.body} by {props.message.inserted_by} </span>
    </div>
  );
};

const Proto = (props) => {
  return (
    <div >
      {props.messages.map((message, i) => (
        <TrackedViewable message={message} initial={i % 2} key={i} intersectCallback={props.intersectCallback} />
      ))}
    </div>
  );
}


export default class Welcome extends React.Component {

  constructor (props) {
    super(props)
    const searchQuery = new URLSearchParams(window.location.search)
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
      currentUserId: searchQuery.get('view_as_user_id') || 1,
      recentMessages: [],
    }

    this.state.channel.on("new_msg", payload => {
      messages = this.state.recentMessages
      messages.push(payload)
      this.setState({recentMessages: messages})
    })

    this.state.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
  }

  sendChat = (e) => {
    console.log(this.state.chatMessage, this.state.currentUserId)
    const msgObj = { 
      body: this.state.chatMessage,
      userId: Number(this.state.currentUserId),
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
    this.setState({currentUserId: e.target.value})
  }

  trackIntercept = (observableEntry) => {
    setTimeout(function () {
      if (observableEntry.intersectionRatio >= .5) {
        console.log(observableEntry.target.dataset) 
      }
    }, 2000);
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
        <h3>current user id: {this.state.currentUserId} </h3>

        <section>
          <div id="messages" role="log" aria-live="polite" className='messages'>
            <Proto messages={this.state.recentMessages} intersectCallback={this.trackIntercept.bind(this)} />
            <Proto messages={this.props.messages} intersectCallback={this.trackIntercept.bind(this)}/>
          </div>
        </section>

        <label> Send Message As</label>
        <select id="currentUserId" onChange={this.updateUser} value={this.state.currentUserId}>
          {usersAsOpts}
        </select>
        <input type="text" label="chathere" value={this.state.chatMessage} onChange={this.updateMessage} />
        <input type="submit"  label="submit" value="Send!" onClick={this.sendChat} />
      </div>
    )
  }
}
