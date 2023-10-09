<script lang="ts">
	import type { PageData } from './$houdini';
	export let data: PageData;

	$: ({  } = data);
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
<!-- <style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style> -->
