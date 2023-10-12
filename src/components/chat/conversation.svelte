<script>
	import { createEventDispatcher } from 'svelte';

	export let avatar = 'https://cdn.intra.42.fr/users/f1bc7681cd8be9d098d36bb8ac9eb702/jperrama.jpg',
		name = 'pascal',
		lastmessage_author = 'Vous',
		lastmessage_content = 'si c vrai bien vu',
		lastmessage_hour = '1 h';

	const dispatch = createEventDispatcher();
	let conversationInfo = {
		avatar,
		name,
		lastmessage_author,
		lastmessage_content,
		lastmessage_hour
	};
	function handleClick() {
		dispatch('select', conversationInfo);
	}
</script>

<button class="flex flex-row h-full w-full hover:bg-gray-200/50" on:click={handleClick}>
	<div class="w-[21%] h-full flex items-center">
		<img src={avatar} alt="avatar" class="pl-2 rounded-full" width="70px" height="70px" />
	</div>
	<div class="w-[50%] h-full flex flex-col justify-center">
		<h1 class="font-medium text-[16px]">{name}</h1>
		<p class="text-[#737373] text-[12px]">
			{lastmessage_author}: {lastmessage_content} . {lastmessage_hour}
		</p>
	</div>
	<div class="w-[20%] h-full" />
</button>
