import React from "react";
import base64 from "base-64";
import firebase, { auth, db } from "../Firebase";
import { createCurrentChatId, addNewMembers } from "./chats";
import { addNewChatroom } from "./user";

const messagesRef = db.ref("messages");
const chatsRef = db.ref("chats");

// ---------- ACTION TYPES ---------- //
export const GET_MESSAGES = "GET_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
const SEND_MESSAGE_ERROR = "SEND_MESSAGE_ERROR";

// ---------- ACTION CREATORS ---------- //

export const getMessages = (messages) => ({ type: GET_MESSAGES, messages });
const addMessage = (message) => ({ type: ADD_MESSAGE, message });
const sendMessage = (message, user) => ({ type: SEND_MESSAGE, message });
const receiveMessage = (message) => ({ type: RECEIVE_MESSAGE, message });
const sendMessageError = (message) => ({ type: ADD_CONTACT_ERROR, message });

// ---------- THUNK CREATORS ---------- //

// GET MESSAGES FOR CURRENT CHAT
export const fetchMessages = () => (dispatch, getState) => {
  // query for all messages for the current chat, and add listener on child_added for new messages
  if (getState().chats.currentChat) {
    db.ref(`messages/${getState().chats.currentChat.id}`).on(
      "child_added",
      function (snapshot) {
        // format message object to be compatible GiftedChat
        const newMessage = {
          _id: snapshot.key,
          user: {
            _id: snapshot.val().senderId,
            name: snapshot.val().senderName,
          },
          text: snapshot.val().message,
          createdAt: snapshot.val().timestamp,
        };
        // add message to redux state
        dispatch(addMessage(newMessage));
      }
    );
  }
};

// SEND NEW MESSAGE
export const postMessage = (text) => async (dispatch) => {
  try {
    const {
      uid,
      displayName,
      contactId,
      contactName,
      currChatId,
      message,
      timestamp,
    } = text;
    const members = {
      [uid]: displayName,
      [contactId]: contactName,
    };

    console.log("CONTACT ID ", contactId);
    let chatId = currChatId;

    // if chatId doesn't exist, create id, new chatroom and add members
    if (!chatId) {
      chatId = await dispatch(createCurrentChatId());
      await dispatch(addNewChatroom(chatId, uid));
      await dispatch(addNewChatroom(chatId, contactId));
      await dispatch(addNewMembers(chatId, members));
    }

    // update chats node
    chatsRef
      .child(chatId)
      .update({
        lastMessage: message,
        senderId: uid,
        timestamp,
      })
      .then(() => {
        // update messages node
        db.ref(`messages/${chatId}`).push().set({
          message,
          senderId: uid,
          senderName: displayName,
          timestamp,
        });

        dispatch(notify(contactId, displayName, message));
      })
      .then(() => {
        dispatch(fetchMessages());
      })
      .catch((err) =>
        console.log("Error posting message to chats and messages", err)
      );
  } catch (err) {
    console.error("Error adding msg to db: ", err);
  }
};

export const notify = (contactId, senderName, message) => async (dispatch) => {
  try {
    const snapshot = await db
      .ref("/users/" + contactId + "/notifications/token")
      .once("value");

    const receiverToken = snapshot.val();
    console.log("RECEIVERTOKEN --- INSIDE NOTIFY", receiverToken);
    console.log("CONTACT ID --- INSIDE NOTIFY", contactId);
    console.log("SNAPSHOT --- INSIDE NOTIFY", snapshot);

    if (receiverToken) {
      const notification = {
        to: receiverToken,
        sound: "default",
        title: senderName,
        body: message,
        _displayInForeground: true,
      };
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });
    }
  } catch (err) {
    console.error("Error sending notification: ", err);
  }
};
// ---------- INITIAL STATE ---------- //

const defaultMessages = {
  messages: [],
  sendMessageError: "",
};

// ---------- REDUCER ---------- //
const messagesReducer = (state = defaultMessages, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.messages };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages
          .filter((msg) => msg._id !== action.message._id)
          .concat(action.message),
      };
    case SEND_MESSAGE:
      return { ...state };
    case RECEIVE_MESSAGE:
      return { ...state, messages: state.messages.concat(action.message) };
    case SEND_MESSAGE_ERROR:
      return { ...state, sendMessageError: action.message };
    default:
      return state;
  }
};

export default messagesReducer;
