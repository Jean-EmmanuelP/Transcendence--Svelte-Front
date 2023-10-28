<script lang="ts">
	import type { FriendInterface } from '../../interfaces/types';
	export let user: FriendInterface;

</script>

<div class="flex w-full justify-between mb-3 content-center">
	<div class="flex items-center space-x-4">
		<img
			class="w-10 h-10 rounded-full"
			src="https://api.dicebear.com/7.x/bottts/svg?seed={user.pseudo}"
			alt=""
		/>
		<div class="font-medium">
			<div>{user.name}</div>
			<div class="text-sm text-gray-500">{user.pseudo}</div>
		</div>
	</div>
	<div>
		<a
			href="/messages/{user.channelId}"
			type="button"
			class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
			</svg>
		</a>
		<!-- <button
			type="button"
			class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
			</svg>
		</button> -->
	</div>

</div>
