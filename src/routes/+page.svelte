<script>
	import Sidebar from '$components/sidebar.svelte';
	import Navbar from '$components/navbar.svelte';
	import StoryPong from '$components/story_pong.svelte';
</script>

<div class="h-screen w-screen flex overflow-hidden">
	<div class="w-[25%] h-screen">
		<Sidebar />
	</div>
	<div class="w-full h-screen flex flex-col">
		<Navbar />
		<div class="flex m-10 rounded-md h-1/2 w-1/2">
			<iframe
				src="https://giphy.com/embed/xUOxfhGCOiD9JS3ANG"
				width="100%"
				height="100%"
				class="pointer-events-none"
				allowFullScreen
			/>
		</div>
	</div>
</div>
