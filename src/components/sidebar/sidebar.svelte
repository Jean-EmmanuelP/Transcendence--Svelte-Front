<script lang="ts">
	import { goto } from '$app/navigation';
	import { userInformation } from '../../services/gqlUser';
	import { activePage } from '../../stores/currentNavigation';
	import { authentication, type AuthenticationType } from '../../stores/authentication';
	import { onDestroy } from 'svelte';
	export let sidebaricon: 'normal' | 'icon' = 'normal';

	let user: AuthenticationType;
	const unsubscribe = authentication.subscribe((value) => {
		user = value;
	});
	onDestroy(unsubscribe);

	function setActivePage(page: string) {
		activePage.set(page);
	}
</script>

<!--
	bg-white-s : must remove this one after the UI/UX is done
-->
<div
	class="flex flex-grow flex-col gap-y-5 overflow-y-auto bg-white-600 px-6 h-full w-full border border-l-black/5"
>
	<div class="flex h-16 pl-2 shrink-0 items-center">
		<button
			on:click={() => {
				goto('/');
			}}
		>
			<h1 class="font-medium "><span class="">42</span> PONG</h1>
		</button>
	</div>
	<nav class="flex flex-1 flex-col">
		<ul role="list" class="flex flex-1 flex-col gap-y-7">
			<li>
				<ul role="list" class="-mx-2 space-y-1">
					<li>
						<!-- Current: "bg-white-s text-black", Default: "text-black hover:text-black hover:bg-white-s" -->
						<a
							on:click={() => {
								setActivePage('dashboard');
								goto('/');
							}}
							class={`${
								$activePage === 'dashboard' ? `bg-white-s text-black` : ''
							} text-black hover:text-black hover:bg-white-s group flex ${
								sidebaricon === 'icon' && 'items-center justify-center'
							} gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
						>
							{#if sidebaricon === 'icon'}
								<svg
									aria-label="Accueil"
									class="h-6 w-6 shrink-0"
									color="rgb(0, 0, 0)"
									fill="rgb(0, 0, 0)"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
									><title>Accueil</title><path
										d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
										fill="none"
										stroke="currentColor"
										stroke-linejoin="round"
										stroke-width="2"
									/></svg
								>
							{:else}
								<svg
									aria-label="Accueil"
									class="h-6 w-6 shrink-0"
									color="rgb(0, 0, 0)"
									fill="rgb(0, 0, 0)"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
									><title>Accueil</title><path
										d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"
									/></svg
								>
							{/if}
							{#if sidebaricon === 'normal'}
								<p class="text-[16px] font-normal">Dashboard</p>
							{/if}
						</a>
					</li>
					<li>
						<a
							on:click={() => {
								setActivePage('messages');
								goto('/messages');
							}}
							class={`${
								$activePage === 'messages' ? `bg-white-s text-black` : ''
							} text-black hover:text-black hover:bg-white-s group flex ${
								sidebaricon === 'icon' && 'items-center justify-center'
							} gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
						>
							{#if $activePage === 'messages'}
								<svg
									aria-label="Direct"
									class="x1lliihq x1n2onr6"
									color="rgb(0, 0, 0)"
									fill="rgb(0, 0, 0)"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
									><title>Direct</title><path
										d="M22.91 2.388a.69.69 0 0 0-.597-.347l-20.625.002a.687.687 0 0 0-.482 1.178L7.26 9.16a.686.686 0 0 0 .778.128l7.612-3.657a.723.723 0 0 1 .937.248.688.688 0 0 1-.225.932l-7.144 4.52a.69.69 0 0 0-.3.743l2.102 8.692a.687.687 0 0 0 .566.518.655.655 0 0 0 .103.008.686.686 0 0 0 .59-.337L22.903 3.08a.688.688 0 0 0 .007-.692"
										fill-rule="evenodd"
									/></svg
								>
							{:else}
								<svg
									aria-label="Direct"
									class="h-6 w-6 shrink-0 text-black group-hover:text-black"
									color="rgb(0, 0, 0)"
									fill="rgb(0, 0, 0)"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
									><title>Direct</title><line
										fill="none"
										stroke="currentColor"
										stroke-linejoin="round"
										stroke-width="2"
										x1="22"
										x2="9.218"
										y1="3"
										y2="10.083"
									/><polygon
										fill="none"
										points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
										stroke="currentColor"
										stroke-linejoin="round"
										stroke-width="2"
									/></svg
								>
							{/if}

							{#if sidebaricon === 'normal'}
								<p class="text-[16px] font-normal">Messages</p>
							{/if}
						</a>
					</li>
					<li>
						<a
							on:click={() => {
								setActivePage('profile');
								goto(`/profile/${user.pseudo}`);
							}}
							class={`${
								$activePage === 'profile' ? `bg-white-s text-black` : ''
							} text-black hover:text-black hover:bg-white-s group gap-x-3 flex ${
								sidebaricon === 'icon' && 'items-center justify-center'
							} rounded-md p-2 text-sm leading-6 font-semibold`}
						>
							<img
								src={user.avatar}
								class={`rounded-full ${$activePage === 'profile' && `border-[2.4px] border-black`} shadow-sm h-6 w-6 shrink-0 text-black group-hover:text-black`}
								alt={user.name}
							/>

							{#if sidebaricon === 'normal'}
								<p class="text-[16px] font-normal">Profile</p>
							{/if}
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</div>
