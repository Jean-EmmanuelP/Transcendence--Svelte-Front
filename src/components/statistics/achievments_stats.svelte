<script lang="ts">
	export let achievments = [
		{
			title: '1',
			image: 'https://i.pinimg.com/564x/f1/94/4f/f1944f27357c4e225611242a7b49552b.jpg'
		},
		{
			title: '2',
			image: 'https://i.pinimg.com/564x/1e/84/5b/1e845ba074b5dac914c2474d649c9d70.jpg'
		},
		{ title: '3', image: 'https://i.pinimg.com/564x/5c/5b/82/5c5b8201ec77a887f97a1e6092b6b704.jpg' }
	];
</script>

<div>
	<h3 class="text-base font-semibold leading-6 text-gray-900">Achievments</h3>
	<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
		{#each achievments as achievment}
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">{achievment.title}</dt>
				<dd class="mt-1 text-3xl w-28 h-28 font-semibold tracking-tight text-gray-900">
					<img src={achievment.image} class="w-full h-full" alt={achievment.title} />
				</dd>
			</div>
		{/each}
	</dl>
</div>
