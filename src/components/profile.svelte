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
	<div class="flex flex-col h-full text-white w-full border border-white">
		<div class="flex flex-row w-full h-[40%]">
			<div class="w-1/2 h-full border border-white flex p-2 flex-row justify-around">
				<div class="flex flex-col h-full items-center w-1/2 border border-white">
					<img src={user.avatar} class="rounded-full h-40 w-40" alt="user picture" />
					<p class="pt-2">{user.status === 'ONLINE' ? 'Online' : 'Offline'}</p>
				</div>
				<div class="border border-white flex flex-col gap-2 h-full w-1/2">
					<div class="flex flex-row gap-2">
						<p class="font-bold">Name:</p>
						<h1>{user.name}</h1>
					</div>
					<div class="flex flex-row gap-2">
						<p class="font-bold">Email:</p>
						<p>{user.email}</p>
					</div>
					<div class="flex flex-row gap-2">
						<p class="font-bold">Pseudo:</p>
						<p>{user.pseudo}</p>
					</div>
				</div>
			</div>
			<div class="w-1/2 h-full border border-white" />
		</div>
		<div class="w-full h-[10%] border border-white" />
		<div class="w-full h-[50%]" />
		<!-- <Progress progress={30} /> -->
		<!-- {#if !isCurrentUserProfile}
					<button on:click={handleSendFriendRequest} class="p-2 mt-4 rounded-md bg-red-400 text-white font-medium shadow-md hover:bg-red-500 transition duration-150 ease-linear" >Send Friend Request</button>
				{/if} -->
	</div>
{/if}

<!--
	1. dire que si le store pseudo === a le fetch de ton userinformation alors ca veut dire
	que tu es sur ton profile et donc que tu ne veux pas afficher le fait que tu vas tenvoyer un message

	2. sinon, envoyer le sendfriendrequest via appolo client sur le boutton afficher
-->
