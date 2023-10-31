<script lang="ts">
	import { getUserInformationPerPseudo } from '../services/gqlUser';
	import type { searchUser } from '../interfaces/types';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { authentication, type AuthenticationType } from '../stores/authentication';
	import { sendFriendRequest } from '../services/gqlFriends';
	import Progress from './action_components/progress.svelte';
	import Device from 'svelte-device-info';

	let isLoading = true;
	let isError = false;
	let userPseudo = $page.params.pseudo;
	let isCurrentUserProfile: boolean = false;

	let userStore: AuthenticationType;
	const unsubscribe = authentication.subscribe((value) => {
		userStore = value;
	});
	onDestroy(unsubscribe);

	$: isMobile = Device.isMobile;
	$: {
		isCurrentUserProfile = userStore.pseudo === userPseudo;
	}
	$: {
		userPseudo = $page.params.pseudo;
		getUserInformation(userPseudo);
	}
	let user: searchUser;
	onMount(() => getUserInformation(userPseudo));
	async function getUserInformation(userPseudo: string) {
		try {
			user = await getUserInformationPerPseudo(userPseudo);
			isLoading = false;
		} catch (error) {
			console.error(error);
			isLoading = false;
			isError = true;
		}
	}
	async function handleSendFriendRequest() {
		try {
			const result = await sendFriendRequest(userPseudo);
			console.log(result);
		} catch (error) {
			console.error('Error sending friend request:', error.message);
			alert(error.message);
		}
	}

	let slideLevel: number = 0;
	async function Slide(slideNumber: number) {
		slideLevel += slideNumber;
		console.log(slideLevel);
	}
</script>

{#if isLoading}
	<p>Loading...</p>
{:else if isError}
	<p>Somethign went wrong. Please try again.0</p>
{:else}
	<div class="w-full h-full flex text-white items-center justify-center px-20 py-4 overflow-y-auto no-scrollbar">
		<div class="h-full w-full flex flex-col">
			<!-- le haut de ma page -->
			<div
				class="flex flex-col sm:flex-row px-2 py-2 h-[50%] w-full gap-2 rounded-md"
			>
				<!-- Image div to the left -->
				<div class="relative h-full w-full sm:w-[21%] flex items-center justify-start rounded-md">
					<div class="relative w-full h-full">
						<div
							class="absolute -inset-0.5 bg-gradient-to-r from-red-800 to-blue-800 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
						/>
						<img
							src={user.avatar}
							class="relative rounded-md w-auto h-full object-cover ring-1 ring-slate-600 shadow-lg"
							alt=""
						/>
					</div>
				</div>
				<!-- Information div to the right -->
				<div class={`pl-2 ${!isCurrentUserProfile && 'pb-2'} h-full w-full sm:w-[35%]`}>
					{#if isCurrentUserProfile}
						<div
							class="flex gap-2 ring-1 ring-slate-800 shadow-md bg-slate-900/40 flex-col items-center justify-center mb-2 h-full w-full rounded-md"
						>
							<h1 class="sm:font-extrabold sm:text-xl sm:tracking-wider">{user.name}</h1>
							<p class="font-medium">Pseudo: {user.pseudo}</p>
							<p class="font-medium">Email: {user.email}</p>
							<div class="flex flex-row pt-2">
								{#if user.status === 'ONLINE'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
										/>
									</svg>
									<p class="pl-2 font-medium">Offline</p>
								{:else if user.status === 'OFFLINE'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
										/>
									</svg>
									<p class="pl-2 font-medium">Online</p>
									{/if}
								</div>
								<div class="w-full flex items-center justify-center">
									<Progress progress={30} />
								</div>
						</div>
					{:else}
						<div
							class="flex gap-2 ring-1 ring-slate-800 shadow-md bg-slate-900/40 flex-col items-center justify-center mb-2 h-2/3 w-full rounded-md"
						>
							<h1 class="sm:font-extrabold sm:text-xl sm:tracking-wider">{user.name}</h1>
							<p class="font-medium">Pseudo: {user.pseudo}</p>
							<p class="font-medium">Email: {user.email}</p>
							<div class="flex flex-row pt-2">
								{#if user.status === 'ONLINE'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
										/>
									</svg>
									<p class="pl-2 font-medium">Offline</p>
								{:else if user.status === 'OFFLINE'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
										/>
									</svg>
									<p class="pl-2 font-medium">Online</p>
								{/if}
							</div>
						</div>
						<div
							class="flex flex-row h-1/3 w-full ring-1 ring-slate-800 shadow-md rounded-md bg-slate-900/40"
						>
							{#if !isCurrentUserProfile}
								<div class="p-5 w-1/2 h-full flex items-center justify-center">
									<div class="relative group">
										<div
											class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
										/>
										<div
											class="relative px-5 py-2.5 ring-1 ring-slate-700 shadow-md hover:font-bold rounded-md bg-slate-900/40 w-full h-full flex flex-row items-center justify-start"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M12 4.5v15m7.5-7.5h-15"
												/>
											</svg>

											<p>Message</p>
										</div>
									</div>
								</div>
								<div class="w-1/2 h-full flex items-center justify-center">
									<div class="relative group flex flex-row rounded-md">
										<div
											class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
										/>
										<div
											class="relative flex flex-row bg-slate-900/40 px-5 py-2.5 ring-1 ring-slate-700 shadow-md hover:font-bold rounded-md"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
												/>
											</svg>
											<p class="sm:pl-2">Add friend</p>
										</div>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
				<div class="w-[44%] h-full flex justify-center">
					<div
						class="ring-1 ring-slate-800 shadow-md rounded-md bg-slate-900/40 w-full h-full flex flex-col"
					>
						<h1 class="text-center pt-2 font-bold h-[10%] w-full">Achievments</h1>
						<div class="slider h-[90%] flex items-center justify-center w-full">
							<div
								class="slides bg-white ring-1 ring-slate-950 rounded-md shadow-md w-52 h-52 p-3 hover:scale-110 transition duration-75"
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.19 115"
									><title>League of Legends World Championship logo</title><path
										d="M511.94,560.67l0-9,7.8-4.47c4.28-2.46,7.84-4.39,8-4.32a9.56,9.56,0,0,1-1.7,2.39,82.38,82.38,0,0,0-12,20.11,43,43,0,0,1-1.82,4.17A85.39,85.39,0,0,1,511.94,560.67Z"
										transform="translate(-455.9 -454.5)"
									/><path
										d="M476.54,548.82a7.18,7.18,0,0,1-3.6-9.73c.64-1.29,3.1-3.48,12.34-11.13,6.32-5.23,12-9.66,12.5-9.84,1.14-.45,10.37-.53,10.37-.08a58.24,58.24,0,0,1-5.68,3.48l-5.68,3.22v3l0,3-6.13,8.48c-5.15,7.12-6.44,8.63-7.8,9.39A6.94,6.94,0,0,1,476.54,548.82Z"
										transform="translate(-455.9 -454.5)"
									/><path
										d="M541.67,548.86c-1.93-.91-1.78-.72-8.52-10.11l-5.68-7.88v-3.07l0-3.07-5.64-3.22a53.18,53.18,0,0,1-5.68-3.48c0-.38,8.9-.34,10.15,0,.49.11,6.06,4.51,12.38,9.69,8,6.55,11.78,9.92,12.34,11a7.42,7.42,0,0,1,0,7.12A7.58,7.58,0,0,1,541.67,548.86Z"
										transform="translate(-455.9 -454.5)"
									/><path
										d="M505.77,544.69,499.45,541v-14.5l6.32-3.64,6.29-3.67,5.72,3.29c3.14,1.82,6,3.56,6.4,3.86.61.53.64,1.29.57,7.61l-.11,7-5.68,3.33c-3.1,1.82-5.94,3.48-6.25,3.64S510.32,547.31,505.77,544.69Zm6-20.41c-.23-.23-7,3.26-7,3.6a24.34,24.34,0,0,0,3.52,2.57l3.48,2.31.11-4.17A28,28,0,0,0,511.79,524.29Z"
										transform="translate(-455.9 -454.5)"
									/><path
										d="M538.07,523.6c-4.7-3.86-9.16-7.38-9.92-7.8-1.25-.64-2.23-.72-8.94-.72h-7.54L510.24,513a31.42,31.42,0,0,0-9.58-8.6c-1.4-.64-2.61-1.25-2.69-1.29a25.2,25.2,0,0,1,.87-3.64c2-7,5-11.51,8.25-12.5a4.06,4.06,0,0,1,3.18.15l1.67.61v-4.88c0-5.45-.08-5.3,2.69-4.47,3.33,1,5,3.45,8.86,13,1.17,2.92,3,7,4.05,9.16l1.89,3.86-2.35,3-2.35,3,1.29.23c.68.15,3.75.57,6.85.95s5.57.83,5.57,1a7.18,7.18,0,0,1-.8,1.67c-.68,1.1-.76,1.4-.3,1.78.3.3,3.94,3.45,8.1,7s7.65,6.7,7.69,6.89-.53.3-1.33.3-2.27.11-3.33.23l-1.89.23Zm-20.52-14a43.61,43.61,0,0,1,5.07-2.84c3.14-1.51,3.26-1.63,2.88-2.46s-.45-.91-1.59-.3a37.33,37.33,0,0,0-7.23,5.38C514.86,511.26,515.12,511.34,517.55,509.59Zm-3.9-5.57a1.49,1.49,0,0,0,.95-1.21,14.65,14.65,0,0,1,2.46-5.38,6.66,6.66,0,0,0,1.17-3.26l.23-2h-12.8l.27,1.93a9.64,9.64,0,0,0,1.59,4,16,16,0,0,1,1.82,3.86C509.9,504.33,511.41,505,513.65,504Z"
										transform="translate(-455.9 -454.5)"
									/><path
										d="M470,524.21c-6.55-9.88-11-22.26-12.72-35.63-.61-4.7-1.36-15.52-1.36-20v-2.76h7.69l7.65,0,3.18-5.64a60.08,60.08,0,0,1,3.45-5.68c.15,0,2.5,2.57,5.26,5.68,3.6,4.09,5.23,5.68,5.83,5.68s1.44-.83,3-3c1.17-1.59,2.88-3.71,3.79-4.73l1.59-1.78,2.84,2.23,2.84,2.23,1.51-.8c4.62-2.35,10.75-2.31,14.81.08l1.36.8,2.5-1.93c1.4-1.1,2.73-2.12,3-2.31.45-.34,4,3.67,6.51,7.38,1.93,2.8,2.23,2.65,8.07-3.9A76.79,76.79,0,0,1,546,454.5a52,52,0,0,1,3.45,5.68l3.18,5.68H568.1l-.27,6.55c-.87,22.64-4.47,36.58-12.95,50.28a14.39,14.39,0,0,1-2.54,3.37,5.43,5.43,0,0,1-1.86-1.33l-1.4-1.33,1.93-3.1a85.44,85.44,0,0,0,7.65-16.47,106.08,106.08,0,0,0,4.39-29.08V470.4H550l-2.2-4a35.13,35.13,0,0,0-2.5-4.13c-.15-.11-1.86,1.67-3.82,4l-3.56,4.13H531l-.8-1.63c-.87-1.78-3.86-5.94-4.28-5.94a18.93,18.93,0,0,0-2.76,1.93l-2.54,1.93-1.21-1.06a11.36,11.36,0,0,0-15,0l-1.25,1.06L500.92,465a32,32,0,0,0-2.73-2c-.57-.19-3.33,3.29-4.47,5.64l-.87,1.78h-6.93l-3.56-4.17c-1.93-2.27-3.67-4-3.86-3.82s-1.29,2-2.46,4.05l-2.16,3.75-6.59.11-6.59.08.23,6.93c.57,17.57,4.7,31.88,12.8,44.42,1.25,1.89,2.23,3.52,2.23,3.6a10.13,10.13,0,0,1-1.67,1.55l-1.63,1.4Z"
										transform="translate(-455.9 -454.5)"
									/><path
										d="M477.49,519.7a80.88,80.88,0,0,1-7.91-16.51c-1.36-4.17-2.84-10.45-2.42-10.45a31.93,31.93,0,0,1,2.46,2.46,18.53,18.53,0,0,0,2.42,2.39,23.43,23.43,0,0,0-.83-2.88,64.39,64.39,0,0,1-1.7-6.4c-.8-3.9-1.59-12.27-1.17-12.68a16.1,16.1,0,0,1,3.67-.38l3.41-.11,1.7-3,1.67-3,.27,1.48c.15.83.57,3.29.91,5.49,1.1,6.7,3.9,14,6.21,16.05.76.68.76.68.38-.57a68.75,68.75,0,0,1-1.86-13.06v-3.18h11.25l.23-2c.3-2.39,1.74-5.41,2.57-5.38a12.57,12.57,0,0,1,3.07,2c2.65,2,3,2.2,3,1.44s2.31-3.29,3.82-4.05a8.06,8.06,0,0,1,6.74,0c1.33.64,3.45,2.73,3.45,3.33a2.13,2.13,0,0,0,.34.8c.27.42.95.08,3.07-1.63a11.28,11.28,0,0,1,3.18-2c.72.19,2.12,3.48,2.39,5.49l.23,2h11.36l-.23,4.66a54.12,54.12,0,0,1-1.17,8.6c-.49,2.2-.83,4.05-.8,4.09.27.3,2.61-3.29,3.67-5.6a61.61,61.61,0,0,0,3.67-14.16,21.36,21.36,0,0,1,.57-3.52,14.35,14.35,0,0,1,1.78,2.8l1.67,3,3.56.19,3.56.19-.08,3c-.15,5.26-1.74,13.86-3.26,17.46a4.48,4.48,0,0,0-.45,1.55,13,13,0,0,0,2.5-2.39,23.93,23.93,0,0,1,2.46-2.39c.27.34-1.36,7.08-2.61,10.87-2.08,6.17-7.61,17-8.52,16.66-.19-.08-1.59-1.21-3.18-2.54l-2.84-2.46,1.33-2.35,1.33-2.35-1.06-.23c-.57-.11-3.37-.45-6.17-.8s-5.34-.72-5.64-.8-.11-.61.8-1.78c.72-.87,1.44-1.78,1.59-2s-.76-2.46-2-4.92-3.14-6.66-4.24-9.39c-2.65-6.51-4.28-9.73-5.91-11.55-3-3.26-7.76-4.2-11.21-2.16-3.18,1.86-5.11,5.07-9.43,15.56-1.1,2.69-2.8,6.47-3.75,8.44l-1.78,3.52,1.82,2.54a20.22,20.22,0,0,1,1.86,2.8c0,.34-1.33.57-7.38,1.29-2.69.34-5.15.68-5.41.76s-.23.61.49,1.82a8.05,8.05,0,0,1,.95,2,21.85,21.85,0,0,1-3.33,3.45l-3.33,3.07Z"
										transform="translate(-455.9 -454.5)"
									/></svg
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- le bas de ma page -->
			<div class="w-full h-[40%] flex gflex-row">
				<div class="w-1/2 h-full flex justify-center p-2">
					<div
						class="ring-1 ring-slate-800 shadow-md relative bg-slate-900/40 rounded-md w-full h-full flex flex-col"
					>
						<div class="h-[20%] w-full flex items-center justify-center font-bold">Ranking</div>
						<div class="no-scrollbar h-[75%] w-full px-4 overflow-auto">
							{#each Array(5) as _, index (index)}
								<div
									class="relative text-white ring-1 gap-2 hover:scale-105 transition duration-150 mb-4 ring-slate-400/20 bg-slate-700/10 flex flex-row h-1/3 w-full rounded-md rounded-l-full shadow-md"
								>
									<div
										class="absolute -inset-[-0.3px] bg-gradient-to-r from-red-500/30 to-blue-500/30 rounded-lg rounded-l-full blur opacity-50 group-hover/1:opacity-75 transition duration-1000 group-hover/1:duration-200 animate-tilt"
									/>
									<div
										class="w-full h-full relative bg-slate-900/50  ring-1 rounded-md rounded-l-full ring-black/20 shadow-lg text-white"
									>
										<div class="relative h-full w-[11%] rounded-full overflow-hidden">
											<img src={user.avatar} alt="" class="w-full h-full" />
										</div>
										<div class="h-full w-[89%] flex flex-row items-center justify-between">
											<p class="absolute top-5 left-20">{user.pseudo}</p>
											<h1 class="absolute top-2 right-2">{index}</h1>
										</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="w-full h-[5%]" />
					</div>
				</div>
				<div class="w-1/2 h-full flex justify-center p-2">
					<div
						class="ring-1 ring-slate-800 shadow-md bg-slate-900/40 rounded-md w-full h-full flex flex-col"
					>
						<div class="w-full relative h-[10%]">
							<div class="relative flex flex-row items-center justify-center">
								<div class="absolute transform -translate-x-16 translate-y-1">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
										<path
											fill="#28a745"
											d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z"
										/>
										<path
											fill="#007bff"
											d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z"
										/>
										<path
											fill="#dc3545"
											d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
										/>
									</svg>
								</div>
								<p class="text-center pt-2 font-bold pl-2">Recent games</p>
							</div>
						</div>
						<div class="relative w-full h-[90%] p-2">
							{#if slideLevel !== 2}
								<button
									class="hover:font-extrabold transition duration-75 absolute top-[40%] right-2 p-2 border border-slate-700 rounded-full hover:scale-105 text-white font-semibold"
									on:click={() => Slide(1)}>&gt;</button
								>
							{/if}
							{#if slideLevel !== 0}
								<button
									class="hover:font-extrabold transition duration-75 absolute top-[40%] left-2 p-2 border border-slate-700 rounded-full hover:scale-105 text-white font-semibold"
									on:click={() => Slide(-1)}>&lt;</button
								>
							{/if}
							{#if slideLevel === 0}
								<div class="flex flex-col items-center justify-center">
									<div class="font-medium text-[14px] text-gray-300/80 tracking-tight">Games</div>
									<div class="flex flex-row items-center pt-2 pb-10">
										<svg
											class="font-bold"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											fill="gray"
											height="20px"
											width="20px"
											version="1.1"
											id="Capa_1"
											viewBox="0 0 345.134 345.134"
											xml:space="preserve"
										>
											<g>
												<path
													d="M62.549,252.369c-9.506,0-18.442,3.701-25.164,10.423c-13.874,13.875-13.874,36.452,0,50.327   c6.722,6.721,15.658,10.422,25.164,10.422s18.442-3.702,25.163-10.422c6.721-6.721,10.423-15.658,10.423-25.164   c0-9.505-3.702-18.442-10.423-25.163S72.055,252.369,62.549,252.369z M74.984,300.391c-3.321,3.321-7.737,5.15-12.435,5.15   c-4.698,0-9.114-1.829-12.436-5.15c-6.856-6.857-6.856-18.014,0-24.871c3.321-3.322,7.737-5.151,12.436-5.151   c4.697,0,9.113,1.829,12.435,5.15c3.322,3.322,5.151,7.738,5.151,12.436C80.135,292.653,78.306,297.069,74.984,300.391z"
												/>
												<path
													d="M318.144,274.188c-0.21-7.501-3.541-14.67-9.136-19.67l-52.374-46.799c3.393-3.516,6.552-7.243,9.456-11.16   c0.618-0.631,1.141-1.352,1.553-2.142c13.073-18.52,20.587-40.958,20.587-64.543c0-29.765-12.02-62.442-32.152-87.412   C233.999,15.081,205.654,0,176.263,0c-25.543,0-50.292,11.395-70.828,32.351c-17.977,3.975-33.666,12.256-45.911,24.5   c-20.782,20.783-30.162,51.489-26.411,86.463c3.421,31.892,18.027,63.498,39.074,84.544c19.245,19.246,44.48,30.343,70.581,32.386   l-3.145,55.938c-0.422,7.492,2.293,14.917,7.448,20.37c5.155,5.453,12.416,8.581,19.921,8.581h18.541   c7.504,0,14.765-3.127,19.92-8.581c5.155-5.453,7.87-12.878,7.448-20.37l-3.564-63.404l47.854,53.555   c5,5.596,12.169,8.926,19.671,9.137c0.254,0.007,0.506,0.011,0.759,0.011c7.235,0,14.268-2.902,19.395-8.029l13.11-13.11   C315.433,289.036,318.355,281.69,318.144,274.188z M277.367,297.478c-2.613-0.074-5.012-1.188-6.754-3.137l-47.936-53.646   c-5.366-6.005-12.813-9.207-20.429-9.207c-3.877,0-7.799,0.83-11.512,2.542c-11.226,5.178-23.144,7.96-35.07,8.481l89.517-89.517   c-0.521,11.926-3.303,23.844-8.482,35.07c-5.076,11.006-2.397,23.842,6.665,31.94l53.646,47.936   c1.95,1.742,3.063,4.141,3.138,6.754c0.073,2.614-0.904,5.072-2.754,6.92l-13.11,13.11   C282.439,296.573,279.981,297.552,277.367,297.478z M157.594,317.193l3.203-56.98c10.334-0.85,20.618-3.146,30.541-6.93   l3.593,63.911c0.146,2.61-0.762,5.094-2.559,6.994c-1.796,1.9-4.225,2.946-6.839,2.946h-18.541c-2.614,0-5.044-1.046-6.841-2.947   C158.356,322.287,157.447,319.803,157.594,317.193z M72.252,69.579c16.857-16.857,42.365-24.397,71.816-21.243   c27.938,2.997,55.502,15.671,73.735,33.905c13.173,13.173,21.79,29.694,25.456,47.222L134.234,238.489   c-0.663,0.663-1.2,1.404-1.613,2.193c-17.708-3.607-34.412-12.257-47.705-25.551c-18.234-18.234-30.909-45.799-33.905-73.736   C47.851,111.941,55.395,86.436,72.252,69.579z M242.066,53.761c17.636,21.873,28.164,50.327,28.164,76.113   c0,14.016-3.173,27.544-8.912,39.77c2.333-12.385,2.54-25.007,0.712-37.323c-0.009-0.883-0.149-1.762-0.416-2.612   c-3.852-22.34-14.405-43.519-31.081-60.196c-21.047-21.047-52.652-35.654-84.544-39.074c-3.016-0.323-5.997-0.542-8.946-0.671   C149.446,22.066,162.779,18,176.263,18C200.103,18,223.472,30.7,242.066,53.761z"
												/>
											</g>
										</svg>
										<h1 class="pl-2 font-bold text-2xl">0</h1>
									</div>
									<div class="rounded-full flex h-3 w-[60%] ring-1 ring-slate-600 shadow-lg">
										<div class="relative bg-green-700 brightness-125 h-full w-[40%]">
											<div class="absolute flex gap-2 items-center justify-center -top-6">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="green"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-4 h-4 text-black"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												<h1 class="font-bold tracking-wide text-green-700">34%</h1>
											</div>
											<div class="absolute top-4 text-green-700"><p>43 victories</p></div>
										</div>
										<div class="relative bg-gray-400 brightness-105 h-full w-[10%]">
											<div class="absolute flex gap-2 items-center -top-6 right-0">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1"
													stroke="currentColor"
													class="w-4 h-4 bg-gray-700 rounded-md"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M6 9h12m-12 6.75h12"
													/>
												</svg>
												<h1 class="font-bold tracking-wide text-gray-700">10%</h1>
											</div>
											<div class="absolute top-4 text-gray-700 w-screen"><p>10 pat</p></div>
										</div>
										<div class="relative bg-red-700 brightness-200 h-full w-[50%]">
											<div class="absolute flex gap-2 items-center justify-center -top-6 right-0">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="red"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-4 h-4 text-black"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												<h1 class="font-bold tracking-wide text-red-700">66%</h1>
											</div>
											<div class="absolute top-4 right-0 text-red-700"><p>140 looses</p></div>
										</div>
									</div>
								</div>
							{:else if slideLevel === 1}
								<div
									class="h-full w-full flex flex-col items-center justify-center font-semibold text-gray-400 tracking-wide pt-5"
								>
									Longest winning streak
									<p class="flex items-center justify-center text-[50px]">
										🔥<span class="font-bold brightness-125">5</span>
									</p>
								</div>
							{:else if slideLevel === 2}
								<div class="h-full w-full flex items-center justify-center">
									<img
										src={user.avatar}
										class="shadow-md ring-1 ring-slate-800 rounded-full object-contain w-16 h-16"
										alt=""
									/>
									<p class="p-4 font-bold">versus</p>
									<img
										src={user.avatar}
										class="shadow-md ring-1 ring-slate-800 rounded-full object-contain w-16 h-16"
										alt=""
									/>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- <Progress progress={30} /> -->
<!-- {#if !isCurrentUserProfile}
					<button on:click={handleSendFriendRequest} class="p-2 mt-4 rounded-md bg-red-400 text-white font-medium shadow-md hover:bg-red-500 transition duration-150 ease-linear" >Send Friend Request</button>
			{/if} -->

<!--
		1. dire que si le store pseudo === a le fetch de ton userinformation alors ca veut dire
	que tu es sur ton profile et donc que tu ne veux pas afficher le fait que tu vas tenvoyer un message

	2. sinon, envoyer le sendfriendrequest via appolo client sur le boutton afficher
-->
