<script>
	import '../app.css';
	import Navbar from '$components/navbar.svelte';
	import Sidebar from '$components/sidebar/sidebar.svelte';
	import { page } from '$app/stores';
	import { activePage } from '../stores/currentNavigation';

	let currentpage = $page.url.pathname;
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
