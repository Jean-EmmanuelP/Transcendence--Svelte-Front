<script lang="ts">
    export let progress: number = 0;
</script>

<div class={`mt-2 rounded-lg h-3 w-[60%] border bg-gray-500/10 border-gray-500/15 shadow-sm`}>
    <div class={`rounded-l-lg h-full w-[${progress}%] bg-black`} />
</div>
