<script>
    import GameStats from "$components/statistics/game_stats.svelte";
	import AchievmentsStats from "$components/statistics/achievments_stats.svelte";
</script>

<div class="flex gap-5 flex-col">
    <AchievmentsStats />
    <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
    <GameStats />
</div>