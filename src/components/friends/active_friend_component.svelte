<script lang="ts">
	import type { AuthenticationType } from '../../stores/authentication';
	export let user: AuthenticationType;

</script>

<div class="flex w-full justify-between mb-3 content-center rounded-lg p-3 bg-gray-800">
	<div class="flex items-center space-x-4">
		<img
			class="w-10 h-10 rounded-full"
			src="https://api.dicebear.com/7.x/bottts/svg?seed={user.pseudo}"
			alt=""
		/>
		<div class="font-medium">
			<div>{user.name}</div>
			<div class="text-sm text-gray-500">{user.status}</div>
		</div>
	</div>
</div>
