<script lang="ts">
	import GameStats from '$components/statistics/game_stats.svelte';
	import AchievmentsStats from '$components/statistics/achievments_stats.svelte';
	import Progress from '$components/action_components/progress.svelte';
	import type { searchUser } from '../interfaces/types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	const userPseudo = $page.params.pseudo;
	async function getUserInformation(userPseudo) {
		try {
			await getUserInformationPerPseudo(userPseudo);
		} catch(error) {
			console.error(error);
		}
	}
</script>

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
