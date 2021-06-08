import React, { useState, useEffect, useRef } from 'react';

import {Socket} from "phoenix"
import MessageElement from "./message_element"

import useIntersect from "./useIntersect";

const TrackedViewable = (props) => {
  let ref = useRef(null)
  let entry  = {}

  // console.log(props.message.id)
  if (props.message.id == props.messageStartId) {
    console.log('trig', props.message.id, props.messageStartId, props.message)
    useEffect(() => {
      ref.current.scrollIntoView()
    }, [])
  } else { 
     [ref, entry] = useIntersect({
      threshold: [.5],
      intersectCall: props.intersectCallback
    });
  }

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
        <TrackedViewable  message={message} initial={i % 2} key={i} intersectCallback={props.intersectCallback} messageStartId={props.messageStartId} />
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

    const messageStartId = props.lastViewedMessageId || props.messages[props.messages.length -1].id

    console.log('lastviewedid', messageStartId)
    this.state = { 
      chatSocket: socket,
      channelId: channelId,
      channelName: channelName,
      channel: socket.channel(channelName, {}),
      chatMessage: '',
      currentUserId: searchQuery.get('currentUserId') || 1,
      recentMessages: [],
      messageStartId: messageStartId,
      scrollToRef: null
    }

    this.state.channel.on("new_msg", payload => {
      let messages = this.state.recentMessages
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

    const viewedOpts = {
      messageId: observableEntry.target.dataset.messageId,
      userId: this.state.currentUserId,
      chatChannelId: this.state.channelId
    }
    const broadCastChannel = this.state.channel
    setTimeout(function () {
      if (observableEntry.intersectionRatio >= .5) {
        broadCastChannel.push("msg_viewed", viewedOpts)
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

    const currentUserEle = this.props.users.filter((usr) => usr[1] == this.state.currentUserId)[0]

    return (
      <div>
        <section>
          <span>last viewed message id: { this.state.messageStartId }</span>
          <div id="messages" role="log" aria-live="polite" className='messages'>
            <Proto messages={this.state.recentMessages} intersectCallback={this.trackIntercept.bind(this)} />
            <Proto
              currentUserId={this.state.currentUserId}
              chatChannelId={this.state.channelId}
              messages={this.props.messages}
              intersectCallback={this.trackIntercept.bind(this)}
              messageStartId={this.state.messageStartId}
            />
          </div>
        </section>

        <label> Send Message As</label>

        <h3>{currentUserEle[0]} User id: {this.state.currentUserId} </h3>
        <input type="text" label="chathere" value={this.state.chatMessage} onChange={this.updateMessage} />
        <input type="submit"  label="submit" value="Send!" onClick={this.sendChat} />
      </div>
    )
  }
}
