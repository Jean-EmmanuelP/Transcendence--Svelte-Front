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

export const getUserInformationPerPseudo = async (pseudo: string) => {
	try {
		const response = await client.query({
			query: gql`
					query GetUserInformation($pseudo: String!) {
					getUserInformationWithPseudo(pseudo: $pseudo) {
						id
						email
						name
						pseudo
						avatar
						isTwoFactorEnabled
						status
					}
				}
			`,
			variables: {
				pseudo: pseudo
			}
		});
		return response.data.getUserInformationWithPseudo;
	} catch (error) {
		throw new Error(`Error to get information via Pseudo, ${error.message}`);
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
		if (!response.data)
			throw new Error('Error fetching user information');
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

export const changeUserPassword = async (currentPassword: string, newPassword: string) => {
	try {
		const response = await client.mutate({
			mutation: gql`
				mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
					changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
				}
			`,
			variables: {
				currentPassword,
				newPassword
			}
		});
		return response.data.changePassword;
	} catch (error) {
		console.log(error);
		throw new Error('Error changing user password');
	}
};

export const deleteAccount = async () => {
	try {
		const response = await client.mutate({
			mutation: gql`
				mutation {
					deleteAccount
				}
			`
		});
		console.log(`this is the response of the deleteAccount: `, response.data.deleteAccount);
		return response.data.deleteAccount;
	} catch (error) {
		console.log(error);
		throw new Error('Error deleting user account');
	}
};
