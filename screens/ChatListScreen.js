import React from 'react';
import firebase, { auth } from '../Firebase';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { GoogleAuthData } from 'expo-google-sign-in';
import { connect } from 'react-redux';

import ChatListItem from '../components/ChatListItem';
import { fetchChatrooms } from '../store/user';
import { fetchAllChats, setCurrentChat } from '../store/chats';

const dummyData = [
	{
		id: '5',
		title: 'Isra',
		lastMessage: 'Jacob: yo whats up'
	},
	{
		id: '4',
		title: 'Group Chat',
		lastMessage: 'Jacob: hello'
	},
	{
		id: '3',
		title: 'Lauryn',
		lastMessage: 'Lauryn: Ok sounds great'
	}
];

class ChatListScreen extends React.Component {
	constructor(props) {
		super(props);
		this.goToSingleChat = this.goToSingleChat.bind(this);
	}

	componentDidMount() {
		this.props.fetchChatrooms();
	}

	goToSingleChat(item) {
		// set current chat
		this.props.setCurrentChat();
		console.log('yes', this.props);
		this.props.navigation.navigate('SingleChat');
	}

	render() {
		console.log(this.props.chatrooms);
		return (
			<FlatList
				data={this.props.chatrooms}
				renderItem={({ item }) => <ChatListItem item={item} goToSingleChat={this.goToSingleChat} />}
				keyExtractor={(item, index) => index.toString()}
			/>
		);
	}
}

const mapState = state => ({
	chatrooms: state.user.chatrooms
});

const mapDispatch = dispatch => ({
	fetchChatrooms: () => dispatch(fetchChatrooms()),
	fetchAllChats: () => dispatch(fetchAllChats())
});

export default connect(mapState, mapDispatch)(ChatListScreen);
