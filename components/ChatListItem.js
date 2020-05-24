import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import {auth} from '../Firebase'
import AvatarIcon from './AvatarIcon'
import {memberNameHelper} from '../utils'

export default function ChatListItem(props) {
  let members = props.item.members
  delete members[props.userId]

  members = memberNameHelper(Object.values(members))
  const avatarName = members[0]

  const messageDate = new Date(props.item.timestamp)

  // days enumeration
  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }

  // returns string with time that the last message was received
  const getTime = () => {
    const hours =
      messageDate.getHours() > 12
        ? messageDate.getHours() - 12
        : messageDate.getHours()
    const minutes = messageDate.getMinutes()

    return `${hours}:${minutes} ${messageDate.getHours() > 12 ? 'PM' : 'AM'}`
  }

  // returns string with the date that the last message was received
  const getDate = () => {
    return `${messageDate.getMonth()}/${messageDate.getDate()}/${messageDate.getFullYear()}`
  }

  const goToSingleChat = (chatId) => {
    // set current chatroom in redux
    props.setCurrentChat(chatId)
    // navigate to single chat page
    props.navigation.navigate('SingleChat', {
      contactId: props.id,
      name: props.name,
    })
  }

  return (
    <TouchableOpacity onPress={() => goToSingleChat(props.item.id)}>
      <View style={styles.itemView}>
        {props.imageUrl ? (
          <AvatarIcon src={props.imageUrl} style={styles.image} />
        ) : (
          <AvatarIcon style={styles.image} name={avatarName} />
        )}
        <View style={styles.detailsWrapper}>
          <View style={styles.chatNameWrapper}>
            <Text style={styles.chatName}>
              {members.length > 1
                ? `${members[0]} & ${members.length - 1} others`
                : members}
            </Text>
            <Text>
              {Date.now() - props.item.timestamp < 86400000
                ? getTime()
                : Date.now() - props.item.timestamp < 86400000 * 7
                ? days[messageDate.getDay()]
                : getDate()}
            </Text>
          </View>
          <View style={styles.messageWrapper}>
            <Text style={styles.message}>{props.item.lastMessage}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#b7b7b7',
    backgroundColor: '#fff',
  },
  chatName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 17,
    color: '#aaa',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  detailsWrapper: {
    marginLeft: 10,
    width: '80%',
  },
  chatNameWrapper: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageWrapper: {
    flex: 1,
    marginTop: 5,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})
