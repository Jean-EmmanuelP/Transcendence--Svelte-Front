<script lang="ts">
	import type { GroupInterface } from '../../interfaces/types';

	export let group: GroupInterface;
	export let onClick: (gr: GroupInterface) => void;
	export let isSelected: boolean = false;

</script>

<div
	on:click={() => onClick(group)}
	on:keydown={() => onClick(group)}
	class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md {isSelected && "border-l-4 border-red-500"}"
>
	<div class="flex-2">
		<div class="w-12 h-12 relative">
			<img
				class="w-12 h-12 rounded-full mx-auto"
				src="https://api.dicebear.com/7.x/thumbs/svg?seed={group.name}"
				alt="chat-user"
			/>
			<span
				class="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"
			/>
		</div>
	</div>
	<div class="flex-1 px-2">
		<div class="truncate w-32"><span class="text-gray-800">{group.name}</span></div>
		<div><small class="text-gray-600">Yea, Sure!</small></div>
	</div>
	<div class="flex-2 text-right">
		<div><small class="text-gray-500">15 April</small></div>
		<!-- <div>
			<small
				class="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block"
			>
				23
			</small>
		</div> -->
	</div>
</div>
