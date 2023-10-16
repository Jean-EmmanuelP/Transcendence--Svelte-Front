<script lang="ts">
    export let progress: number = 0;
</script>

<div class={`mt-2 rounded-md h-3 w-[60%] border border-gray-500/15 shadow-sm`}>
    <div class={`h-full w-[${progress}%] bg-blue-500`} />
</div>
