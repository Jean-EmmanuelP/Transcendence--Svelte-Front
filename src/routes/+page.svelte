<script>
	import Sidebar from "$components/sidebar.svelte";
	import Navbar from "$components/navbar.svelte";
	import StoryPong from "$components/story_pong.svelte";
</script>
<div class="h-screen w-screen flex overflow-hidden">

	<div class="w-[25%] h-screen">
		<Sidebar />
	</div>
	<div class="w-full h-screen flex flex-col">
		<Navbar />
		<div class="flex bg-red-500 m-5 h-full">
			<div class="h-full w-[55%] bg-green-500">
				<div class="h-1/3 w-full bg-yellow-500">

				</div>
			</div>
			<div class="h-full w-1/2">
				
			</div>
		</div>
	</div>
	
</div>
