<script lang="ts">
	import DiscordConversation from '$components/chat/discord_conversation.svelte';
	import { onMount } from 'svelte';
	import { getGroups } from '../../services/gqlGroups.js';
	import type { GroupInterface } from '../../interfaces/types.js';
	import { page } from '$app/stores';

	let groups: GroupInterface[] = [];
	let currentPage : string;

	page.subscribe(value => {
		currentPage = value.url.pathname;
	});

	onMount(async () => {
		try {
			groups = await getGroups();
		} catch (e) {}
	});
</script>

<div class="flex h-screen text-gray-100">
	<div class="hidden flex-col w-60 bg-gray-800 md:flex">
		<button
			class="flex items-center px-4 h-12 font-title text-[15px] font-semibold text-white hover:bg-gray-550/[0.16] shadow-sm transition"
		>
			<div class="relative mr-1 w-4 h-4" />
			Pong chat<svg viewBox="0 0 18 18" fill="none" class="ml-auto w-[18px] h-[18px] opacity-80">
				<path
					d="M5.20711 5.54289C4.81658 5.15237 4.18342 5.15237 3.79289 5.54289C3.40237 5.93342 3.40237 6.56658 3.79289 6.95711L5.20711 5.54289ZM9 10.75L8.29289 11.4571C8.68342 11.8476 9.31658 11.8476 9.70711 11.4571L9 10.75ZM14.2071 6.95711C14.5976 6.56658 14.5976 5.93342 14.2071 5.54289C13.8166 5.15237 13.1834 5.15237 12.7929 5.54289L14.2071 6.95711ZM3.79289 6.95711L8.29289 11.4571L9.70711 10.0429L5.20711 5.54289L3.79289 6.95711ZM9.70711 11.4571L14.2071 6.95711L12.7929 5.54289L8.29289 10.0429L9.70711 11.4571Z"
					fill="currentColor"
				/>
			</svg>
		</button>
		<div
			class="overflow-y-scroll max-w-full scrollbar-hide flex-1 pt-3 space-y-[21px] font-medium text-gray-300 "
		>
			<div>
				<div class="mt-[5px] space-y-0.5">
					<a
						class="bg-gray-550/[0.32] text-gray-400 {currentPage.includes("friends") && "bg-gray-600 text-white"} hover:bg-gray-600 hover:text-white flex items-center px-2 mx-2 py-2 rounded group relative"
						href="/messages/friends"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class=" mr-3 w-5 h-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
							/>
						</svg>
						Friends
					</a>
					<a
						class="bg-gray-550/[0.32] hover:bg-gray-600 text-gray-400 {currentPage.includes("channels") && "bg-gray-600 text-white"} hover:text-white flex items-center px-2 mx-2 py-2 rounded group relative"
						href="/messages/channels"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class=" mr-3 w-5 h-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
							/>
						</svg>
						Channels
					</a>
				</div>
			</div>
			<div>
				<button
					class="pl-3 text-gray-400 flex items-center px-0.5 mb-3 w-full font-title text-xs tracking-wide hover:text-gray-100 uppercase"
				>
					Direct messages
				</button>

				<div class="mx-2 text-gray-400">
					{#each groups as group}
						<DiscordConversation
							{group}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col flex-1 shrink min-w-0 bg-gray-700">
		<slot/>
	</div>
</div>
