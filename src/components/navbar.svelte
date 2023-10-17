<script lang="ts">
	import { onDestroy } from 'svelte';
	import { modalOpen } from '../stores/modal';
	import { authentication, type AuthenticationType } from '../stores/authentication';
	import ModalWrapper from '$components/modal_wrapper.svelte';

	let user: AuthenticationType;
	let isUserMenuOpen = false;
	let isModalOpen = $modalOpen === 'userMenu' || $modalOpen === 'notifications';

	const unsubscribe = authentication.subscribe((value) => {
		user = value;
	});
	onDestroy(unsubscribe);

	$: isModalOpen = $modalOpen === 'userMenu' || $modalOpen === 'notifications';
	$: if (!isModalOpen && $modalOpen !== null) {
		modalOpen.set(null);
	}

	function toggleModal(modalType: string) {
		if ($modalOpen) {
			modalOpen.set(null);
		} else {
			modalOpen.set(modalType);
		}
	}
</script>

<header class="bg-white shadow-sm lg:static lg:overflow-y-visible">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
			<div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2" />
			<div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
				<div
					class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
				>
					<div class="w-full relative">
						<label for="search" class="sr-only">Search</label>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									class="h-5 w-5 text-gray-400"
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
								class="block w-full rounded-md pr-16 border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								placeholder="Search"
								type="search"
							/>
							<kbd
								class="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 rounded border border-gray-200 px-1 font-sans text-xs text-gray-400"
								>⌘K</kbd
							>
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
					<svg
						width="15"
						height="15"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="mt-px h-6 w-6"
						><path
							d="M8.60124 1.25086C8.60124 1.75459 8.26278 2.17927 7.80087 2.30989C10.1459 2.4647 12 4.41582 12 6.79999V10.25C12 11.0563 12.0329 11.7074 12.7236 12.0528C12.931 12.1565 13.0399 12.3892 12.9866 12.6149C12.9333 12.8406 12.7319 13 12.5 13H8.16144C8.36904 13.1832 8.49997 13.4513 8.49997 13.75C8.49997 14.3023 8.05226 14.75 7.49997 14.75C6.94769 14.75 6.49997 14.3023 6.49997 13.75C6.49997 13.4513 6.63091 13.1832 6.83851 13H2.49999C2.2681 13 2.06664 12.8406 2.01336 12.6149C1.96009 12.3892 2.06897 12.1565 2.27638 12.0528C2.96708 11.7074 2.99999 11.0563 2.99999 10.25V6.79999C2.99999 4.41537 4.85481 2.46396 7.20042 2.3098C6.73867 2.17908 6.40036 1.75448 6.40036 1.25086C6.40036 0.643104 6.89304 0.150421 7.5008 0.150421C8.10855 0.150421 8.60124 0.643104 8.60124 1.25086ZM7.49999 3.29999C5.56699 3.29999 3.99999 4.86699 3.99999 6.79999V10.25L4.00002 10.3009C4.0005 10.7463 4.00121 11.4084 3.69929 12H11.3007C10.9988 11.4084 10.9995 10.7463 11 10.3009L11 10.25V6.79999C11 4.86699 9.43299 3.29999 7.49999 3.29999Z"
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
						/></svg
					>
				</button>

				<!-- Profile dropdown -->
				<div class="relative ml-5 flex-shrink-0">
					<div>
						<button
							type="button"
							class="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							id="user-menu-button"
							aria-haspopup="true"
							on:click={() => toggleModal('userMenu')}
						>
							<span class="absolute -inset-1.5" />
							<span class="sr-only">Open user menu</span>
							<img class="h-8 w-8 rounded-full" src={user.avatar} alt="" />
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
				href="/profile"
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
			<ul class="pt-2 overflow-y-auto h-[70%] w-full">
				{#each { length: 30 } as _, i}
					<li class="flex w-full h-1/3 border border-black mb-[2px] rounded-md p-2">
						<p class="h-full w-2/3 border border-black">
							{i + 1}
						</p>
						<div class="w-1/3 h-full border border-black gap-2 flex flex-row">
							<button class="truncate w-1/2 p-1 bg-green-500 rounded-md text-[10px]">
								Accept
							</button>
							<button class="truncate w-1/2 p-1 bg-red-500 rounded-md text-[10px]">Refuse</button>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</ModalWrapper>
