<script lang="ts">
	import type { GroupInterface, GroupMemberInterface } from '../../interfaces/types';

	export let member: GroupMemberInterface;
	export let channel: GroupInterface;

	let isAdmin = false;
	let isOwner = channel.ownerId === member.id;

	for (let i = 0; i < channel.admins.length; i++) {
		if (channel.admins[i].id === member.id)
			isAdmin = true;
	}

</script>

<div
	class="px-2 py-1 my-1 w-full flex items-center rounded-md font-title text-xs tracking-wide hover:text-gray-100 hover:bg-gray-600"
>
	<img
		class="w-8 h-8 rounded-full bg-indigo-400"
		src="https://api.dicebear.com/7.x/bottts/svg?seed={member.pseudo}"
		alt="chat-user"
	/>
	<div class="ml-3 flex flex-col justify-start content-start place-content-start justify-items-start">
		<p class="text-sm text-left font-semibold text-gray-300">{member.name} {isOwner ? "👑" : ""} {isAdmin ? "🤡" : ""}</p>
	</div>
</div>
