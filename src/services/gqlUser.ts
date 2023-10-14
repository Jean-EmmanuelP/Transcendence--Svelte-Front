import Cookies from 'js-cookie';
import client from './apolloClient';
import { gql } from '@apollo/client/core/index.js';

export const userInformation = async (access_token: string) => {
	try {
		const response = await client.query({
			query: gql`
				{
					userInformation {
						id
						email
						password
						name
						pseudo
						avatar
						isTwoFactorEnabled
						status
					}
				}
			`,
			context: {
				headers: {
					Authorization: `Bearer ${access_token}` // Add the access token to the Authorization header
				}
			}
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error('Error fetching user information');
	}
};

export const userInformationNoToken = async () => {
	try {
		const response = await client.query({
			query: gql`
				{
					userInformation {
						id
						email
						password
						name
						pseudo
						avatar
						isTwoFactorEnabled
						status
					}
				}
			`
		});
		return response.data.userInformation;
	} catch (error) {
		console.log(error);
		throw new Error('Error fetching user information');
	}
};

export const updateUserPseudo = async (newPseudo: string) => {
	try {
		const response = await client.mutate({
			mutation: gql`
				mutation updatePseudo($newPseudo: String!) {
					updatePseudo(newPseudo: $newPseudo)
				}
			`,
			variables: {
				newPseudo: newPseudo
			}
		});
		return response.data.updatePseudo;
	} catch (error) {
		console.log(error);
		throw new Error('Error updating user pseudo');
	}
};
