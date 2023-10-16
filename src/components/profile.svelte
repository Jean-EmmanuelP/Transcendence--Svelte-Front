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
	<div class="w-full h-[60%] border border-black">
		<img src={user.avatar} class="rounded-full" alt="avatar picture" />
		<h1>{user.status}</h1>
		
	</div>
	<div class="w-full h-[40%] flex flex-row">
		<GameStats />
		<AchievmentsStats />
	</div>
</div>
