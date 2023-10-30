<script lang="ts">
	import { onMount } from 'svelte';
	import type { GroupInterface, GroupMemberInterface } from '../../interfaces/types';

	export let member: GroupMemberInterface;
	export let channel: GroupInterface;

	let isAdmin = false;
	let isOwner = channel.ownerId === member.id;

	for (let i = 0; i < channel.admins.length; i++) {
		if (channel.admins[i].id === member.id) isAdmin = true;
	}

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	onMount(() => {
		window.addEventListener('click', handleOutsideClick);
	});

	function handleOutsideClick(event: any) {
		const menuButton = document.getElementById('menu-button-' + member.id);
		if (menuButton && !menuButton.contains(event.target)) {
			menuOpen = false;
		}
	}
</script>

<div class="relative inline-block text-left">
	<div>
		<button
			type="button"
			id="menu-button-{member.id}"
			on:click={toggleMenu}
			aria-expanded={menuOpen}
			aria-haspopup="true"
			class="px-2 py-1 my-1 w-full flex items-center rounded-md font-title text-xs tracking-wide hover:text-gray-100 hover:bg-gray-600"
		>
			<img
				class="w-8 h-8 rounded-full bg-indigo-400"
				src="https://api.dicebear.com/7.x/bottts/svg?seed={member.pseudo}"
				alt="chat-user"
			/>
			<div
				class="ml-3 flex flex-col justify-start content-start place-content-start justify-items-start"
			>
				<p class="text-sm text-left font-semibold text-gray-300">
					{member.name}
					{isOwner ? '👑' : ''}
					{isAdmin ? '🤡' : ''}
				</p>
			</div>
		</button>

	</div>

	{#if menuOpen}
		<div
			class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<div class="py-1 w-full" role="none">
				<button
					class="text-gray-400 w-full text-left block px-4 py-2 text-sm hover:bg-gray-900 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0"
				>
					Kick
				</button>
				<button
					class="text-gray-400 w-full text-left block px-4 py-2 text-sm hover:bg-gray-900 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0"
				>
					Ban
				</button>
				<button
					class="text-gray-400 w-full text-left block px-4 py-2 text-sm hover:bg-gray-900 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0"
				>
					Mute
				</button>
				<button
					class="text-gray-400 w-full text-left block px-4 py-2 text-sm hover:bg-gray-900 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0"
				>
					Grant Admin
				</button>

			</div>
		</div>
	{/if}
</div>
