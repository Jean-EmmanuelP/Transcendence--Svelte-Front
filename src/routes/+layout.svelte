<script lang="ts">
	import '../app.css';
	import Navbar from '$components/navbar.svelte';
	import Sidebar from '$components/sidebar/sidebar.svelte';
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
	import { activePage } from '../stores/currentNavigation';

	let menuOpen = false;

	function closeMenus() {
		menuOpen = false;
	}
</script>

{#if currentpage !== '/register' && currentpage !== '/login'}
	<div class="h-screen w-screen flex overflow-hidden" on:click={closeMenus}>
		<div class={`${$activePage === 'dashboard' ? `w-[15%]` : `w-[5%]`} h-screen`}>
			<Sidebar sidebaricon={$activePage !== 'dashboard' ? 'icon' : 'normal'} />
		</div>
		<div class="w-full h-screen flex flex-col">
			<Navbar bind:menuOpen />
			<div class="flex rounded-md h-full ring-1 ring-gray-400/5">
				<slot />
			</div>
		</div>
	</div>
{:else}
	<slot />
{/if}
