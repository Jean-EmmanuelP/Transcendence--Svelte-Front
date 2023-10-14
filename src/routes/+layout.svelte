<script lang="ts">
	import '../app.css';
	import Navbar from '$components/navbar.svelte';
	import Sidebar from '$components/sidebar.svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { authentication } from "../stores/authentication";
	import { onDestroy, onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { userInformationNoToken } from '../services/gqlUser';

	export let data: LayoutData;
	if (data.user)
		authentication.setUser(data.user);

	onMount(async () => {
		const userInfo = await userInformationNoToken();
		console.log(userInfo.userInformation);
		console.log("Access", Cookies.get("access_token"));
	})
	let currentpage = $page.url.pathname;
	const unsubscribe = page.subscribe(value => {
		currentpage = value.url.pathname;
	})
	onDestroy(unsubscribe)
	$: console.log(`the current page is `, currentpage);
</script>

{#if currentpage !== '/register' && currentpage !== '/login'}
	<div class="h-screen w-screen flex overflow-hidden">
		<div class="w-[25%] h-screen">
			<Sidebar />
		</div>
		<div class="w-full h-screen flex flex-col">
			<Navbar />
			<div class="flex m-10 rounded-md h-full ring-1 ring-gray-400/5">
				<slot />
			</div>
		</div>
	</div>
{:else}
	<slot />
{/if}
