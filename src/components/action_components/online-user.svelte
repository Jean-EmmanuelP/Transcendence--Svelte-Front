<script lang="ts">
	export let status: string = "OFFLINE";
	export let avatar: string;
</script>

<span class="relative inline-block">
	<img class="h-14 w-14 rounded-full" src={avatar} alt="" />
	<span
		class={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${
			status === 'ONLINE' ? 'bg-green-400' : 'bg-red-400'
		} ring-2 ring-white`}
	/>
</span>
