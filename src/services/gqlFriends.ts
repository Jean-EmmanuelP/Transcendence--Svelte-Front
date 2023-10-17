import client from './apolloClient';
import { gql } from '@apollo/client/core/index.js';


export const getUsers = async () => {
	try {
		const response = await client.query({
			query: gql`
				{
					users {
						id
						email
						name
						pseudo
						avatar
						status
					}
				}
			`
		});
		return response.data.users;
	} catch (error) {
		console.log(error);
		throw new Error('Error fetching user information');
	}
};

export const getFriends = async () => {
	try {
		const response = await client.query({
			query: gql`
				{
					getAllFriendsOfUser {
						id
						email
						name
						pseudo
						avatar
						isTwoFactorEnabled
						status
					}
				}
			`
		});
		return response.data.getAllFriendsOfUser;
	} catch (error) {
		console.log(error);
		throw new Error('Error fetching user information');
	}
};

export const getPendingFriendRequests = async () => {
	try {
		const response = await client.query({
			query: gql`
				{
					getPendingSentFriendRequests {
						id
						senderId
						receiverId
						status
						sender {
							avatar
							name
						}
					}
				}
			`
		});
		return response.data.getPendingSentFriendRequests;
	} catch (error) {
		console.log(error);
		throw new Error('Error fetching user information');
	}
};

export const sendFriendRequest = async (pseudo: string) => {
	try {
		const response = await client.mutate({
			mutation: gql`
				mutation sendFriendRequest($pseudo: String!) {
					sendFriendRequest(receiverPseudo: $pseudo)
				}
			`,
			variables: {
				pseudo: pseudo
			}
		});
		return response.data.sendFriendRequest;
	} catch (error) {
		console.log(error);
		throw new Error('Error updating user pseudo');
	}
};
