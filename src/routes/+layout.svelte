<script>
	import '../app.css';
	import Navbar from '$components/navbar.svelte';
	import Sidebar from '$components/sidebar.svelte';
</script>

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
