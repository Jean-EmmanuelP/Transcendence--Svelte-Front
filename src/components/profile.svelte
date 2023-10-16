<script lang="ts">
	import { onDestroy } from 'svelte';
	import { authentication, type AuthenticationType } from '../stores/authentication';
	import GameStats from '$components/statistics/game_stats.svelte';

	import AchievmentsStats from '$components/statistics/achievments_stats.svelte';

	let user: AuthenticationType;
	const onsubscribe = authentication.subscribe((value) => {
		user = value;
	});
	onDestroy(onsubscribe);
	// gqlInformation
	// mutation
</script>

<div class="flex flex-col h-full w-full border border-black">
	<div class="w-full h-[60%] border border-black flex items-center flex-col mt-2">
		<img src={user.avatar} class="rounded-full w-48 h-48 mb-2 shadow-md" alt="avatar picture" />
		<h1 class="font-bold">{user.status}</h1>
		<div class="flex w-full flex flex-col items-center justify-center mt-2">
			<p class="font-medium">Level 7</p>
			<div class="mt-2 rounded-md h-3 w-[60%] border border-gray-500/15 shadow-sm" />
		</div>
	</div>
	<div class="w-full h-[40%] flex flex-row">
		<GameStats />
		<AchievmentsStats />
	</div>
</div>
