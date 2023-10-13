import client from "./apolloClient";
import { gql } from "@apollo/client/core/index.js";

export const testRequest = async () => {
	const response = await client.query({
		query: gql`
		  {
			testingConnexion
		  }
		`
	});
	console.log(response.data);
	return response.data;
}
