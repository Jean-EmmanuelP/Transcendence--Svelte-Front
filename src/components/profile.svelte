<script lang="ts">
	import { getUserInformationPerPseudo } from '../services/gqlUser';
	import GameStats from '$components/statistics/game_stats.svelte';
	import AchievmentsStats from '$components/statistics/achievments_stats.svelte';
	import Progress from '$components/action_components/progress.svelte';
	import type { searchUser } from '../interfaces/types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let isLoading = true;
	let isError = false;
	let userPseudo = $page.params.pseudo;
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
</script>

{#if isLoading}
	<p>Loading...</p>
{:else if isError}
	<p>Somethign went wrong. Please try again.0</p>
{:else}
	<div class="flex flex-col h-full w-full gap-5">
		<div class="w-full h-[40%] flex items-center flex-col mt-2">
			<img src={user.avatar} class="rounded-full w-28 h-28 mb-2 shadow-md" alt="avatar picture" />
			<h1 class="font-bold">{user.status}</h1>
			<div class="flex w-full flex flex-col items-center justify-center mt-2">
				<p class="font-medium">Level 7</p>
				<Progress progress={30} />
			</div>
		</div>
		<div class="w-full h-[60%] flex flex-row justify-center items-center gap-5">
			<GameStats />
			<AchievmentsStats />
		</div>
	</div>
{/if}


<!--
	1. dire que si le store pseudo === a le fetch de ton userinformation alors ca veut dire
	que tu es sur ton profile et donc que tu ne veux pas afficher le fait que tu vas tenvoyer un message

	2. sinon, envoyer le sendfriendrequest via appolo client et 
-->