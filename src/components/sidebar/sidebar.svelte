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
	<div class="flex h-16 shrink-0 items-center">
		<button
			on:click={() => {
				goto('/');
			}}
		>
			<img
				class="h-8 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=white"
				alt="Your Company"
			/>
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
								class="rounded-full shadow-sm h-6 w-6 shrink-0 text-black group-hover:text-black"
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
