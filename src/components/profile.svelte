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
	<div class="w-full h-full border border-white flex text-white items-center justify-center px-20 py-4">
		<div class="border h-full w-full flex flex-col border-white">
			<div class="flex flex-row h-1/2 w-full gap-2">
				<div class="h-full w-[40%] flex items-center justify-center border border-red-500">
					<img src={user.avatar} class="rounded-md h-full w-full object-contain" alt="">
				</div>
				<div class="h-full w-[60%] border border-red-500">
					<div class="border border-green-500 h-1/3 w-full">
						<h1>{user.name}</h1>
					</div>
					<div class="border border-green-500 h-1/3 w-full">
						<h1>{user.pseudo}</h1>
					</div>
					<div class="border border-green-500 flex flex-row h-1/3 w-full">
						<div class="w-1/3 h-full">{user.status}</div>
						{#if !isCurrentUserProfile}
						<div class="w-1/3 h-full">message</div>
						<div class="w-1/3 h-full">A</div>
						{/if}
					</div>
				</div>
			</div>
			<div class="w-full h-1/2 border border-blue-500 flex gap-2 flex-row">
				<div class="w-[50%] h-full border border-blue-800">Rank</div>
				<div class="w-[30%] h-full border border-blue-800">Rank</div>
				<div class="w-[20%] h-full border border-blue-800">Rank</div>
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
