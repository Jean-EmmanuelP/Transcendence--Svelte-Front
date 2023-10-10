<script>
	import Sidebar from '$components/sidebar.svelte';
	import Navbar from '$components/navbar.svelte';
	import StoryPong from '$components/story_pong.svelte';
	import Gif from '../components/gif.svelte';
</script>

<div class="h-screen w-screen flex overflow-hidden">
	<div class="w-[25%] h-screen">
		<Sidebar />
	</div>
	<div class="w-full h-screen flex flex-col">
		<Navbar />
		<div class="flex justify-center items-center h-full w-full">
			<Gif />
		</div>
	</div>
</div>
