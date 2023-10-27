<script lang="ts">
	import { getUserInformationPerPseudo } from '../services/gqlUser';
	import Progress from '$components/action_components/progress.svelte';
	import type { searchUser } from '../interfaces/types';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { authentication, type AuthenticationType } from '../stores/authentication';
	import { sendFriendRequest } from '../services/gqlFriends';
	import OnlineUserImg from './action_components/online-user.svelte';

	let isLoading = true;
	let isError = false;
	let userPseudo = $page.params.pseudo;
	let isCurrentUserProfile: boolean = false;

	let userStore: AuthenticationType;
	const unsubscribe = authentication.subscribe((value) => {
		userStore = value;
	});
	onDestroy(unsubscribe);

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
</script>

{#if isLoading}
	<p>Loading...</p>
{:else if isError}
	<p>Somethign went wrong. Please try again.0</p>
{:else}
	<div
		class="w-full h-full flex text-white items-center justify-center px-20 py-4"
	>
		<div class="h-full w-full flex flex-col">
			<!-- le haut de ma page -->
			<div class="flex flex-row px-6 py-2 border border-white h-1/2 w-full gap-2 bg-slate-900/20 backdrop-blur-lg ring-1 ring-slate-500 rounded-md ">
			<!-- Image div to the left -->
				<div class="relative h-full w-[21%] flex border border-white items-center justify-start rounded-md">
					<div class="relative w-full h-full">
						<div
							class="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-green-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
						/>
						<img
							src={user.avatar}
							class="relative rounded-md w-auto h-full object-contain ring-1 ring-slate-600 shadow-lg"
							alt=""
						/>
					</div>
				</div>
			<!-- Information div to the right -->
				<div class="h-full w-[60%]">
					<div class="flex items-center justify-center h-1/3 w-full">
						<h1 class="sm:font-extrabold sm:text-xl sm:tracking-wider">{user.name}</h1>
					</div>
					<div class="flex items-center justify-center h-1/3 w-full">
						<h1 class="sm:font-bold sm:text-lg">{user.pseudo}</h1>
					</div>
					<div class="flex flex-row h-1/3 w-full">
						<div class="w-1/3 h-full flex items-center justify-center">
							{#if user.status !== 'ONLINE'}
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
								<p class="pl-2">Offline</p>
							{:else}
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
								<p class="pl-2">Online</p>
							{/if}
						</div>
						{#if !isCurrentUserProfile}
							<div class="p-5 w-1/3 h-full flex items-center justify-center">
								<div class="relative group">
									<div
										class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
									/>
									<div
										class="relative px-5 py-2.5 ring-1 ring-slate-700 shadow-md hover:font-bold rounded-md bg-slate-900 w-full h-full flex flex-row items-center justify-center"
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
							<div class="w-1/3 h-full flex items-center justify-center">
								<div
									class="relative group flex flex-row rounded-md"
								>
									<div
										class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
									/>
									<div class="relative flex flex-row bg-slate-900 px-5 py-2.5 ring-1 ring-slate-700 shadow-md hover:font-bold rounded-md">
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
				</div>
			</div>
			<!-- le bas de ma page -->
			<div class="w-full h-1/2 flex flex-row">
				<div class="w-[50%] h-full flex justify-center p-2">
					<div class="border border-white bg-slate-900 rounded-md w-full h-full flex flex-col">
						<p class="text-center pt-2">Rank</p>
					</div>
				</div>
				<div class="w-[30%] h-full flex justify-center p-2">
					<div class="border border-white rounded-md bg-slate-900 w-full h-full flex flex-col">
						<p class="text-center pt-2">Recent games</p>
					</div>
				</div>
				<div class="w-[20%] h-full flex justify-center p-2">
					<div class="border border-white rounded-md bg-slate-900 w-full h-full flex flex-col">
						<p class="text-center pt-2">Achievments</p>
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
