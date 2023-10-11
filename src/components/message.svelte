<script lang="ts">
    import PrimaryButton from "./buttons/primary_button.svelte";
    import ConversationInfo from "./chat/conversation.svelte";

    let selectedConversation = null;
    function handleClick(event: any) {
        selectedConversation = event.detail;
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
        <div class="h-[10%] w-full border border-black"></div>
        <div class="h-[90%] bg-red-500 w-full border border-black"></div>
    </div>
</div>