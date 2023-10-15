import client from './apolloClient';
import { gql } from '@apollo/client/core/index.js';

type CreateChannelInput = {
	name: String;
	isPrivate: Boolean;
	password: String;
}

export const getGroups = async () => {
	try {
		const response = await client.query({
			query: gql`
				{
					getUsersChannel {
						id
						name
						isPrivate
						isDirectMessage
						ownerId
						owner {
							name
							avatar
							status
						}
						members {
							name
							avatar
							status
						}
						admins {
							name
							avatar
							status
						}
					}
				}
			`
		});
		return response.data.getUsersChannel;
	} catch (error) {
		console.log(error);
		throw new Error('Error fetching groups');
	}
};

export const createGroup = async (name: string, isPrivate: boolean,
	password: string) => {
	try {
		const response = await client.mutate({
			mutation: gql`
				mutation createChannel($input: CreateChannelInput!) {
					createChannel(input: $input) {
						success
					}
				}
			`,
			variables: {
				input: {
					name,
					isPrivate,
					password
				}
			}
		});
		return response.data.createChannel;
	} catch (error) {
		console.log(error);
		throw new Error('Error updating groups');
	}
};
