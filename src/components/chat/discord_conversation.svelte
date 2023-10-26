<script lang="ts">
	import type { GroupInterface } from '../../interfaces/types';

	export let group: GroupInterface;
	export let onClick: (gr: GroupInterface) => void;
	export let isSelected: boolean = false;
</script>

<button
	on:click={() => onClick(group)}
	class="px-2 py-1 my-1 w-full flex items-center rounded-md font-title text-xs tracking-wide hover:text-gray-100 hover:bg-gray-600"
>
	<img
		class="w-8 h-8 rounded-full bg-indigo-400"
		src="https://api.dicebear.com/7.x/bottts/svg?seed={group.name}"
		alt="chat-user"
	/>
	<div class="ml-3 flex flex-col justify-start content-start place-content-start justify-items-start">
		<p class="text-sm text-left">{!group.isDirectMessage && "#"}{group.name}</p>
		{#if !group.isDirectMessage }
			<p class="text-xs text-left">{group.members.length + 1} members</p>
		{/if}
	</div>
</button>
