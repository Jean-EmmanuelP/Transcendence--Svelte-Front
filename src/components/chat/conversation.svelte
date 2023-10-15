<script>
	import { createEventDispatcher } from 'svelte';

	export let group;

	// const dispatch = createEventDispatcher();
	// let conversationInfo = {
	// 	avatar,
	// 	name,
	// 	lastmessage_author,
	// 	lastmessage_content,
	// 	lastmessage_hour
	// };
	// function handleClick() {
	// 	dispatch('select', conversationInfo);
	// }
</script>

	<div class="flex items-center space-x-4 px-2 py-1">
		<img
			class="w-10 h-10 rounded-full"
			src="https://api.dicebear.com/7.x/thumbs/svg?seed={group.name}"
			alt=""
		/>
		<div class="font-medium">
			<div>{group.name}</div>
			<div class="text-sm text-gray-500">...</div>
		</div>
	</div>
