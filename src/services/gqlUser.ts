import client from "./apolloClient";
import { gql } from "@apollo/client/core/index.js";

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




