<script>
	import Sidebar from "../components/sidebar.svelte";
	import Navbar from "../components/navbar.svelte";
</script>
<div class="h-screen w-screen flex overflow-hidden">

	<div class="w-[25%] h-screen">
		<Sidebar />
	</div>
	<div class="w-full">
		<Navbar />
	</div>
	
</div>
