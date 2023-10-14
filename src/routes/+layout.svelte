<script>
	import '../app.css';
	import Navbar from '$components/navbar.svelte';
	import Sidebar from '$components/sidebar/sidebar.svelte';
	import { page } from '$app/stores';
	let currentpage = $page.url.pathname;
	import { activePage } from '../stores/currentNavigation';
	$: console.log(`the current page is `, currentpage);
</script>

{#if currentpage !== '/register' && currentpage !== '/login'}
	<div class="h-screen w-screen flex overflow-hidden">
		<div class="w-[15%] h-screen">
			<Sidebar sidebar={`${$activePage !== 'dashboard' && 'icon'}`} />
		</div>
		<div class="w-full h-screen flex flex-col">
			<Navbar />
			<div class="flex rounded-md h-full ring-1 ring-gray-400/5">
				<slot />
			</div>
		</div>
	</div>
{:else}
	<slot />
{/if}
