<script lang="ts">
	export let total_games: string = '0',
		win_ratio: string = '50%',
		lose_ratio: string = '50%';
</script>

<div>
	<!-- <h3 class="text-base font-semibold leading-6 text-gray-900">Games stat's</h3> -->
	<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
		<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt class="truncate text-sm font-medium text-gray-500">Total Match</dt>
			<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{total_games}</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt class="truncate text-sm font-medium text-gray-500">Avg. Open Rate</dt>
			<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{win_ratio}</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt class="truncate text-sm font-medium text-gray-500">Avg. Click Rate</dt>
			<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{lose_ratio}</dd>
		</div>
	</dl>
</div>
