<script lang="ts">
	import { onDestroy } from 'svelte';
	import { modalOpen } from '../stores/modal';
	import { authentication, type AuthenticationType } from '../stores/authentication';
	import ModalWrapper from '$components/modal_wrapper.svelte';
	import OnlineUserImg from './action_components/online-user.svelte';
	import {
		getPendingFriendRequests,
		rejectFriendRequest,
		acceptFriendRequest,
		searchUsersByNameOrPseudo
	} from '../services/gqlFriends';
	import { onMount } from 'svelte';
	import type Request from './notifications/request.svelte';
	import type { searchUser } from '../interfaces/types';
	import { goto } from '$app/navigation';

	let user: AuthenticationType;
	let pendingRequests: Request[] = [];
	let isModalOpen = $modalOpen === 'userMenu' || $modalOpen === 'notifications';
	let term = '';
	let users: searchUser[] = [];
	let isDropdownOpen: boolean = false;

	const unsubscribe = authentication.subscribe((value) => {
		user = value;
	});
	onDestroy(unsubscribe);

	$: isModalOpen = $modalOpen === 'userMenu' || $modalOpen === 'notifications';
	$: if (!isModalOpen && $modalOpen !== null) {
		modalOpen.set(null);
	}

	async function handleSearch() {
		if (term.trim() === '') {
			users = [];
			return;
		}

		try {
			users = await searchUsersByNameOrPseudo(term);
		} catch (error) {
			console.error('Error fetchnig the user', error);
		}
	}

	function toggleModal(modalType: string) {
		if ($modalOpen) {
			modalOpen.set(null);
		} else {
			modalOpen.set(modalType);
			console.log(`modalOpen === `, $modalOpen);
		}
	}
	onMount(loadPendingRequests);
	async function loadPendingRequests() {
		try {
			pendingRequests = await getPendingFriendRequests();
			console.log(`This is the pending Request : `, pendingRequests);
		} catch (error) {
			console.error(`Erreur lors du chargement des demandes d'amis`);
		}
	}

	async function handleAcceptFriendRequest(pseudo: string) {
		try {
			console.log(`It went here`, pseudo);
			const methodAcceptFriendRequest = await acceptFriendRequest(pseudo);
			console.log(methodAcceptFriendRequest);
		} catch (error) {
			console.error(`Error during the mutation accept friend request`);
		}
	}

	async function handleRefuseFriendRequest(pseudo: string) {
		try {
			console.log(`It went here`, pseudo);
			const methodRejectFriendRequest = await rejectFriendRequest(pseudo);
			console.log(methodRejectFriendRequest);
		} catch (error) {
			console.error(`Error during the mutation reject friend request`);
		}
	}

	function handleInputFocus() {
		isDropdownOpen = true;
	}

	function handleClickOutside(event: Event) {
		const target = event.target as HTMLElement;
		if (!target.closest('#search') && !target.closest('.dropdown-menu')) {
			isDropdownOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<header class="bg-white lg:static lg:overflow-y-visible">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
			<div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2" />
			<div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
				<div
					class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
				>
					<div class="w-full relative">
						<label for="search" class="sr-only">Search</label>
						<div class="relative group">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									class="h-5 w-5 text-[#808080] group-focus-within:text-black"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<input
								id="search"
								name="search"
								class="block w-1/2 bg-[#F4F4F4] group/icon_search rounded-full pr-16 border-0 py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:transition duration-300 focus:duration-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500/40 sm:text-sm sm:leading-6"
								placeholder="Search"
								type="search"
								autocomplete="off"
								bind:value={term}
								on:focus={handleInputFocus}
								on:input={handleSearch}
							/>
							{#if isDropdownOpen && users.length}
								<div
									class="dropdown-menu bg-white fixed rounded-md shadow-md ring-1 ring-slate-500/5 z-20 p-2 flex flex-col gap-2 max-h-80 w-80 overflow-hidden"
								>
									{#each users as user (user.id)}
										<div
											class="flex items-center p-2 w-full h-full gap-1 rounded-md hover:bg-gray-400/10"
											on:click={() => {
												goto(`/profile/${user.pseudo}`);
												isDropdownOpen = false;
											}}
										>
											<div class="h-full w-[30%]">
												<OnlineUserImg avatar={user.avatar} status={user.status} />
											</div>
											<div class="w-[70%] h-full flex items-center">
												<p>{user.name.split(' ')[0]}</p>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
			<div class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					aria-expanded="false"
				>
					<span class="absolute -inset-0.5" />
					<span class="sr-only">Open menu</span>
					<!--
              Icon when menu is closed.

              Menu open: "hidden", Menu closed: "block"
            -->
					<svg
						class="block h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<!--
              Icon when menu is open.

              Menu open: "block", Menu closed: "hidden"
            -->
					<svg
						class="hidden h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
				<button
					type="button"
					class="relative ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					on:click={() => toggleModal('notifications')}
				>
					<span class="absolute -inset-1.5" />
					<span class="sr-only">View notifications</span>
					{#if $modalOpen !== 'notifications'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							version="1.1"
							id="Layer_1"
							x="0px"
							y="0px"
							width="117.033px"
							height="122.88px"
							class="w-7 h-7"
							viewBox="0 0 117.033 122.88"
							enable-background="new 0 0 117.033 122.88"
							xml:space="preserve"
							><g
								><path
									d="M75.828,108.589c-0.381,2.005-1.053,3.845-2.021,5.521c-1,1.729-2.309,3.279-3.926,4.648 c-1.617,1.367-3.381,2.397-5.283,3.086c-1.906,0.689-3.934,1.035-6.076,1.035c-2.143,0-4.17-0.346-6.077-1.035 c-1.903-0.688-3.665-1.719-5.282-3.086c-1.618-1.369-2.927-2.92-3.927-4.648c-0.998-1.728-1.682-3.63-2.054-5.706 c-0.181-1.015,0.495-1.987,1.51-2.169c0.032-0.005,0.329-0.034,0.329-0.036h31.001c1.037,0,1.877,0.84,1.877,1.875 C75.898,108.253,75.875,108.425,75.828,108.589L75.828,108.589z M68.398,6.868c1.521,0.397,2.998,0.879,4.43,1.444 c2.109,0.832,4.135,1.836,6.076,3.007c0.076,0.047,0.15,0.097,0.223,0.148c1.861,1.144,3.592,2.401,5.189,3.772 c1.67,1.434,3.227,3.019,4.67,4.754l0.012,0.013L89,20.006c1.41,1.708,2.672,3.531,3.787,5.462 c1.119,1.941,2.076,3.962,2.867,6.056l0.004-0.001c0.818,2.154,1.43,4.362,1.834,6.622c0.406,2.271,0.607,4.599,0.607,6.984 c0,4.714,0,7.257,0.002,7.566c0.01,2.417,0.023,4.779,0.041,7.085v0.024l0,0c0.008,2.083,0.145,4.179,0.404,6.279 c0.256,2.077,0.631,4.083,1.115,6.014l0.004-0.001c0.486,1.904,1.143,3.735,1.967,5.493c0.846,1.81,1.875,3.58,3.086,5.311 l0.006-0.004c1.195,1.697,2.691,3.373,4.488,5.027c1.855,1.709,4.01,3.383,6.461,5.023c1.406,0.942,1.783,2.846,0.84,4.253 c-0.59,0.881-1.559,1.358-2.547,1.359v0.01H86.244H58.522H30.798H3.076C1.377,98.568,0,97.191,0,95.493 c0-1.117,0.595-2.094,1.485-2.633c2.491-1.686,4.63-3.354,6.416-5.008c1.777-1.646,3.265-3.33,4.462-5.055 c0.036-0.051,0.072-0.1,0.11-0.148c1.157-1.694,2.147-3.42,2.967-5.173c0.834-1.783,1.503-3.622,2.004-5.517 c0.01-0.04,0.021-0.079,0.033-0.118c0.475-1.84,0.837-3.779,1.088-5.812c0.252-2.047,0.378-4.161,0.378-6.337V45.129 c0-2.34,0.21-4.671,0.629-6.987c0.419-2.313,1.036-4.534,1.849-6.655c0.809-2.121,1.779-4.154,2.905-6.096 c1.119-1.929,2.397-3.763,3.828-5.496l0.017-0.02l-0.004-0.004c1.428-1.707,2.995-3.292,4.701-4.749 c1.683-1.437,3.5-2.743,5.45-3.914c1.975-1.179,4.015-2.169,6.128-2.971c1.469-0.558,2.979-1.026,4.529-1.405 c0.529-1.851,1.437-3.349,2.722-4.496C53.471,0.752,55.81-0.025,58.712,0c2.875,0.025,5.194,0.821,6.952,2.391 C66.953,3.542,67.865,5.034,68.398,6.868L68.398,6.868z M70.594,14.03c-1.701-0.67-3.436-1.198-5.203-1.577 c-1.361-0.176-2.482-1.253-2.656-2.677c-0.166-1.341-0.551-2.281-1.154-2.819c-0.605-0.541-1.578-0.817-2.917-0.829 c-1.33-0.012-2.291,0.246-2.882,0.774c-0.6,0.536-0.98,1.485-1.14,2.85l-0.003,0c-0.148,1.303-1.127,2.414-2.484,2.667 c-1.915,0.363-3.762,0.883-5.547,1.561c-1.782,0.676-3.495,1.507-5.143,2.49c-1.641,0.985-3.177,2.091-4.609,3.313 c-1.43,1.221-2.757,2.566-3.98,4.028l-0.004-0.003c-1.194,1.449-2.274,3.003-3.234,4.659c-0.945,1.629-1.771,3.366-2.473,5.207 c-0.702,1.83-1.222,3.682-1.56,5.55c-0.34,1.874-0.509,3.844-0.509,5.906v14.564c0,2.412-0.143,4.774-0.427,7.083 c-0.274,2.224-0.693,4.428-1.256,6.605c-0.01,0.047-0.021,0.095-0.033,0.142c-0.587,2.219-1.384,4.402-2.389,6.549 c-0.97,2.073-2.125,4.089-3.461,6.046c-0.038,0.064-0.078,0.127-0.121,0.189c-1.408,2.026-3.192,4.039-5.352,6.039l-0.078,0.071 h18.819h27.724h27.722h18.787c-2.111-1.946-3.887-3.942-5.328-5.989l0.004-0.004l-0.004-0.008 c-1.416-2.024-2.625-4.102-3.621-6.231c-1.018-2.172-1.809-4.364-2.375-6.575l0.002-0.001l-0.002-0.011 c-0.555-2.202-0.979-4.461-1.264-6.771c-0.271-2.209-0.416-4.54-0.428-6.992v-0.007c-0.018-2.278-0.031-4.656-0.041-7.133 c-0.018-4.584-0.025-7.086-0.025-7.566c0-2.024-0.17-3.992-0.512-5.902c-0.34-1.903-0.848-3.743-1.521-5.517l0.004-0.001 l-0.004-0.011c-0.691-1.829-1.504-3.557-2.439-5.178c-0.934-1.617-2.004-3.159-3.211-4.622l0.002-0.001 c-1.197-1.438-2.51-2.77-3.939-3.997c-1.385-1.188-2.848-2.256-4.393-3.207c-0.068-0.035-0.137-0.072-0.203-0.113 C74.066,15.577,72.354,14.724,70.594,14.03L70.594,14.03z"
								/></g
							></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							version="1.1"
							id="Layer_1"
							x="0px"
							y="0px"
							width="120.641px"
							height="122.878px"
							viewBox="0 0 120.641 122.878"
							class="w-7 h-7"
							enable-background="new 0 0 120.641 122.878"
							xml:space="preserve"
							><g
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M68.16,6.889c18.129,3.653,31.889,19.757,31.889,38.921 c0,22.594-2.146,39.585,20.592,54.716c-40.277,0-80.366,0-120.641,0C22.8,85.353,20.647,68.036,20.647,45.81 c0-19.267,13.91-35.439,32.182-38.979C53.883-2.309,67.174-2.265,68.16,6.889L68.16,6.889z M76.711,109.19 c-1.398,7.785-8.205,13.688-16.392,13.688c-8.187,0-14.992-5.902-16.393-13.688H76.711L76.711,109.19z"
								/></g
							></svg
						>
					{/if}
				</button>
				<!-- Profile dropdown -->
				<div class="relative ml-5 flex-shrink-0">
					<div>
						<button
							type="button"
							class="relative flex rounded-full bg-white focus:ring-offset-2"
							id="user-menu-button"
							aria-haspopup="true"
							on:click={() => toggleModal('userMenu')}
						>
							<span class="absolute -inset-1.5" />
							<span class="sr-only">Open user menu</span>
							<img class={`h-8 w-8 rounded-full ${$modalOpen === 'userMenu' && `border-[2.3px] border-black`}`} src={user.avatar} alt="" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<nav class="md:hidden" aria-label="Global">
		<div class="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
			<!-- Current: "bg-gray-100 text-gray-900", Default: "hover:bg-gray-50" -->
			<a
				href="#"
				aria-current="page"
				class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium"
				>Dashboard</a
			>
			<a href="#" class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium"
				>Friends</a
			>
		</div>
		<div class="border-t border-gray-200 pb-3 pt-4">
			<div class="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
				<div class="flex-shrink-0">
					<img
						class="h-10 w-10 rounded-full"
						src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</div>
				<div class="ml-3">
					<div class="text-base font-medium text-gray-800">Chelsea Hagon</div>
					<div class="text-sm font-medium text-gray-500">chelsea.hagon@example.com</div>
				</div>
				<button
					type="button"
					class="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<span class="absolute -inset-1.5" />
					<span class="sr-only">View notifications</span>

					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				</button>
			</div>
			<div class="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
				<a
					href="#"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
					>Profile</a
				>
				<a
					href="#"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
					>Settings</a
				>
				<a
					href="/signout"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
					>Sign out</a
				>
			</div>
		</div>
	</nav>
</header>
<ModalWrapper bind:isOpen={isModalOpen}>
	{#if $modalOpen === 'userMenu'}
		<div
			class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="user-menu-button"
			tabindex="-1"
		>
			<a
				href={`/profile/${user.pseudo}`}
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="user-menu-item-0">Profile</a
			>
			<a
				href="/settings"
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="user-menu-item-1">Settings</a
			>
			<a
				href="/signout"
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="user-menu-item-2">Sign out</a
			>
		</div>
	{:else if $modalOpen === 'notifications'}
		<div
			class="pl-4 absolute overflow-hidden right-0 h-48 w-[250px] bg-white origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
		>
			<header class="pt-2 text-left h-[30%] w-full">
				<h1 class="font-medium text-[15px]">Notifications</h1>
				<p class="text-gray-500 text-[13px]">Here are your friend requests</p>
			</header>
			<ul class="overflow-y-auto h-[70%] w-full">
				{#if pendingRequests.length > 1}
					{#each pendingRequests as request}
						<li
							class="flex w-full h-1/3 mb-[5px] rounded-md p-2 border-1 border-gray-400/90 shadow-sm"
						>
							<div class="h-full w-[20%]">
								<img src={request.sender.avatar} class="w-7 h-7 rounded-md" alt="avatar" />
							</div>
							<p class="h-full w-[40%] truncate">
								{request.sender.name.split(' ')[0]}
							</p>
							<div class="w-[50%] h-full gap-2 flex flex-row">
								<button
									on:click={() => handleAcceptFriendRequest(request.sender.pseudo)}
									class="truncate w-1/2 p-1 bg-green-500 hover:bg-green-600 rounded-md text-[10px]"
								>
									Accept
								</button>
								<button
									on:click={() => handleRefuseFriendRequest(request.sender.pseudo)}
									class="truncate w-1/2 p-1 bg-red-500 hover:bg-red-600 rounded-md text-[10px]"
									>Refuse</button
								>
							</div>
						</li>
					{/each}
				{:else}
					<p>Aucune demande d'ami</p>
				{/if}
			</ul>
		</div>
	{/if}
</ModalWrapper>
