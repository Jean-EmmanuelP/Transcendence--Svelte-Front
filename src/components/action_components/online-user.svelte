<script lang="ts">
	export let status: string = "OFFLINE";
	export let avatar: string;
</script>

<span class="relative inline-block">
	<img class="h-16 w-16 rounded-full" src={avatar} alt="" />
	<span
		class={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ${
			status === 'ONLINE' ? 'bg-green-400' : 'bg-red-400'
		} ring-2 ring-white`}
	/>
</span>
