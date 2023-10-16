<script lang="ts">
	import { onDestroy } from 'svelte';
	import { authentication, type AuthenticationType } from '../stores/authentication';

	let user: AuthenticationType;
	const onsubscribe = authentication.subscribe((value) => {
		user = value;
	});
	onDestroy(onsubscribe);
	// gqlInformation
	// mutation
</script>

<div class="h-full w-full">
		<img src={user.avatar} class="rounded-full" alt="avatar picture">
</div>