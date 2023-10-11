import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/Testing'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class TestingStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "TestingStore",
			variables: false,
		})
	}
}

export async function load_Testing(params) {
	await initClient()

	const store = new TestingStore()

	await store.fetch(params)

	return {
		Testing: store,
	}
}
