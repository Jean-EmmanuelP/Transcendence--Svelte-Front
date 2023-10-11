<script lang="ts">
	import PrimaryButton from './buttons/primary_button.svelte';
	import ConversationInfo from './chat/conversation.svelte';
	interface Conversation {
		name: String;
	}

	let selectedConversation: Conversation | null = null;
	function handleClick(event: CustomEvent<Conversation>) {
		selectedConversation = event.detail;
		console.log(selectedConversation);
	}
</script>

<div class="flex h-full w-full">
	<div class="flex flex-col border border-black h-full w-[27%]">
		<div class="w-full h-[15%] border border-black">
			<div class="flex w-full border border-black h-[65%] items-center justify-around">
				<h1 class="font-bold text-[16px]">jean.emp</h1>
				<div>
					<PrimaryButton text="Create a group" />
					<PrimaryButton text="Add a friend" />
				</div>
			</div>
			<div class="flex justify-between px-2 h-[35%] items-center justify-content w-full flex">
				<h1 class="font-bold text-[18px]">Messages</h1>
				<h1 class="text-gray-500 text-[15px]">Demands</h1>
			</div>
		</div>
		<div class="w-full h-[85%] border border-black">
			<div class="w-full h-[80px]">
				<ConversationInfo on:select={handleClick} />
			</div>
		</div>
	</div>
	<div class="flex flex-col border border-black h-full w-[73%]">
		{#if selectedConversation}
			<div class="h-[10%] w-full border border-black" />
			<div class="h-[90%] bg-red-500 w-full border border-black" />
		{:else}
			<div class=" flex flex-col items-center justify-center h-full w-full border border-black">
				<img src="https://i.postimg.cc/6p8Hp6fr/Screenshot-2023-10-12-004957.png" width="100px" height="100px" alt="">
                <h1>Your Messages</h1>
				<p>Send photos and private messages to a friend or group</p>
			</div>
		{/if}
	</div>
</div>
