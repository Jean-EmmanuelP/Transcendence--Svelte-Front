<script lang="ts">
	import { getUserInformationPerPseudo } from '../services/gqlUser';
	import Progress from '$components/action_components/progress.svelte';
	import type { searchUser } from '../interfaces/types';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { authentication, type AuthenticationType } from '../stores/authentication';
	import { sendFriendRequest } from '../services/gqlFriends';
	import OnlineUserImg from './action_components/online-user.svelte';

	let isLoading = true;
	let isError = false;
	let userPseudo = $page.params.pseudo;
	let isCurrentUserProfile: boolean = false;

	let userStore: AuthenticationType;
	const unsubscribe = authentication.subscribe((value) => {
		userStore = value;
	});
	onDestroy(unsubscribe);

	$: {
		isCurrentUserProfile = userStore.pseudo === userPseudo;
	}
	$: {
		userPseudo = $page.params.pseudo;
		getUserInformation(userPseudo);
	}
	let user: searchUser;
	onMount(() => getUserInformation(userPseudo));
	async function getUserInformation(userPseudo: string) {
		try {
			user = await getUserInformationPerPseudo(userPseudo);
			isLoading = false;
		} catch (error) {
			console.error(error);
			isLoading = false;
			isError = true;
		}
	}
	async function handleSendFriendRequest() {
		try {
			const result = await sendFriendRequest(userPseudo);
			console.log(result);
		} catch (error) {
			console.error('Error sending friend request:', error.message);
			alert(error.message);
		}
	}

	let slideLevel = 0;
	async function upSlide() {
		slideLevel += 1;
		console.log(slideLevel);
	}
</script>

{#if isLoading}
	<p>Loading...</p>
{:else if isError}
	<p>Somethign went wrong. Please try again.0</p>
{:else}
	<div class="w-full h-full flex text-white items-center justify-center px-20 py-4">
		<div class="h-full w-full flex flex-col">
			<!-- le haut de ma page -->
			<div
				class="flex flex-row px-2 py-2 h-1/2 w-full gap-2 bg-slate-900/20 backdrop-blur-lg rounded-md"
			>
				<!-- Image div to the left -->
				<div class="relativ h-full w-[21%] flex items-center justify-start rounded-md">
					<div class="relative w-full h-full">
						<div
							class="absolute -inset-0.5 bg-gradient-to-r from-red-800 to-blue-800 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
						/>
						<img
							src={user.avatar}
							class="relative rounded-md w-auto h-full object-cover ring-1 ring-slate-600 shadow-lg"
							alt=""
						/>
					</div>
				</div>
				<!-- Information div to the right -->
				<div class={`pl-2 ${!isCurrentUserProfile && 'pb-2'} h-full w-[35%]`}>
					{#if isCurrentUserProfile}
						<div
							class="flex gap-2 ring-1 ring-slate-800 shadow-md bg-blue-950/30 flex-col items-center justify-center mb-2 h-full w-full rounded-md"
						>
							<h1 class="sm:font-extrabold sm:text-xl sm:tracking-wider">{user.name}</h1>
							<p class="font-medium">Pseudo: {user.pseudo}</p>
							<p class="font-medium">Email: {user.email}</p>
							<div class="flex flex-row pt-2">
								{#if user.status === 'ONLINE'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
										/>
									</svg>
									<p class="pl-2 font-medium">Offline</p>
								{:else if user.status === 'OFFLINE'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
										/>
									</svg>
									<p class="pl-2 font-medium">Online</p>
								{/if}
							</div>
						</div>
					{:else}
						<div
							class="flex gap-2 ring-1 ring-slate-800 shadow-md bg-blue-950/30 flex-col items-center justify-center mb-2 h-2/3 w-full rounded-md"
						>
							<h1 class="sm:font-extrabold sm:text-xl sm:tracking-wider">{user.name}</h1>
							<p class="font-medium">Pseudo: {user.pseudo}</p>
							<p class="font-medium">Email: {user.email}</p>
							<div class="flex flex-row pt-2">
								{#if user.status === 'ONLINE'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
										/>
									</svg>
									<p class="pl-2 font-medium">Offline</p>
								{:else if user.status === 'OFFLINE'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
										/>
									</svg>
									<p class="pl-2 font-medium">Online</p>
								{/if}
							</div>
						</div>
						<div
							class="flex flex-row h-1/3 w-full ring-1 ring-slate-800 shadow-md rounded-md bg-blue-950/30"
						>
							{#if !isCurrentUserProfile}
								<div class="p-5 w-1/2 h-full flex items-center justify-center">
									<div class="relative group">
										<div
											class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
										/>
										<div
											class="relative px-5 py-2.5 ring-1 ring-slate-700 shadow-md hover:font-bold rounded-md bg-slate-900 w-full h-full flex flex-row items-center justify-start"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M12 4.5v15m7.5-7.5h-15"
												/>
											</svg>

											<p>Message</p>
										</div>
									</div>
								</div>
								<div class="w-1/2 h-full flex items-center justify-center">
									<div class="relative group flex flex-row rounded-md">
										<div
											class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
										/>
										<div
											class="relative flex flex-row bg-slate-900 px-5 py-2.5 ring-1 ring-slate-700 shadow-md hover:font-bold rounded-md"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
												/>
											</svg>
											<p class="sm:pl-2">Add friend</p>
										</div>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
				<div class="w-[44%] h-full flex justify-center">
					<div
						class="ring-1 ring-slate-800 shadow-md bg-blue-950/30 rounded-md bg-slate-900 w-full h-full flex flex-col"
					>
						<p class="text-center pt-2">Achievments</p>
					</div>
				</div>
			</div>
			<!-- le bas de ma page -->
			<div class="w-full h-1/2 flex flex-row">
				<div class="w-1/2 h-full flex justify-center p-2">
					<div
						class="ring-1 ring-slate-800 shadow-md bg-blue-950/30 relative bg-slate-900 rounded-md w-full h-full flex flex-col"
					>
						<div class="h-[20%] w-full flex items-center justify-center font-bold">Ranking</div>
						<div class="no-scrollbar h-[60%] w-full px-4 overflow-auto">
							{#each Array(5) as _, index (index)}
								<div
									class="relative text-white ring-1 gap-2 hover:scale-105 transition duration-150 mb-4 ring-slate-400/20 bg-slate-700/20 flex flex-row h-1/3 w-full rounded-md rounded-l-full shadow-md"
								>
									<div
										class="absolute -inset-[-0.3px] bg-gradient-to-r from-red-500/30 to-blue-500/30 rounded-lg rounded-l-full blur opacity-50 group-hover/1:opacity-75 transition duration-1000 group-hover/1:duration-200 animate-tilt"
									/>
									<div
										class="w-full h-full relative bg-slate-700/60 ring-1 rounded-md rounded-l-full ring-slate-400/20 text-white"
									>
										<div class="relative h-full w-[11%] rounded-full overflow-hidden">
											<img src={user.avatar} alt="" class="w-full h-full" />
										</div>
										<div class="h-full w-[89%] flex flex-row items-center justify-between">
											<p class="absolute top-5 left-20">{user.pseudo}</p>
											<h1 class="absolute top-2 right-2">{index}</h1>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<div class="w-1/2 h-full flex justify-center p-2">
					<div
						class="ring-1 ring-slate-800 shadow-md bg-blue-950/30 rounded-md bg-slate-900 w-full h-full flex flex-col"
					>
						<div class="w-full relative h-[10%]">
							<div class="relative flex flex-row items-center justify-center">
								<div class="absolute transform -translate-x-16 translate-y-1">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
										<path
											fill="#28a745"
											d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z"
										/>
										<path
											fill="#007bff"
											d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z"
										/>
										<path
											fill="#dc3545"
											d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
										/>
									</svg>
								</div>
								<p class="text-center pt-2 font-bold pl-2">Recent games</p>
							</div>
						</div>
						<div class="relative w-full h-[70%] p-2">
							<button
								class="absolute top-[40%] right-2 p-2 border border-slate-700 rounded-full hover:scale-105 text-white font-semibold"
								on:click={() => upSlide()}>&gt;</button
							>
							{#if slideLevel === 0}
								<div class="flex flex-col items-center justify-center">
									<div class="font-medium text-[14px] text-gray-300/80 tracking-tight">Games</div>
									<div class="flex flex-row items-center pt-2 pb-10">
										<svg
											class="font-bold"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											fill="gray"
											height="20px"
											width="20px"
											version="1.1"
											id="Capa_1"
											viewBox="0 0 345.134 345.134"
											xml:space="preserve"
										>
											<g>
												<path
													d="M62.549,252.369c-9.506,0-18.442,3.701-25.164,10.423c-13.874,13.875-13.874,36.452,0,50.327   c6.722,6.721,15.658,10.422,25.164,10.422s18.442-3.702,25.163-10.422c6.721-6.721,10.423-15.658,10.423-25.164   c0-9.505-3.702-18.442-10.423-25.163S72.055,252.369,62.549,252.369z M74.984,300.391c-3.321,3.321-7.737,5.15-12.435,5.15   c-4.698,0-9.114-1.829-12.436-5.15c-6.856-6.857-6.856-18.014,0-24.871c3.321-3.322,7.737-5.151,12.436-5.151   c4.697,0,9.113,1.829,12.435,5.15c3.322,3.322,5.151,7.738,5.151,12.436C80.135,292.653,78.306,297.069,74.984,300.391z"
												/>
												<path
													d="M318.144,274.188c-0.21-7.501-3.541-14.67-9.136-19.67l-52.374-46.799c3.393-3.516,6.552-7.243,9.456-11.16   c0.618-0.631,1.141-1.352,1.553-2.142c13.073-18.52,20.587-40.958,20.587-64.543c0-29.765-12.02-62.442-32.152-87.412   C233.999,15.081,205.654,0,176.263,0c-25.543,0-50.292,11.395-70.828,32.351c-17.977,3.975-33.666,12.256-45.911,24.5   c-20.782,20.783-30.162,51.489-26.411,86.463c3.421,31.892,18.027,63.498,39.074,84.544c19.245,19.246,44.48,30.343,70.581,32.386   l-3.145,55.938c-0.422,7.492,2.293,14.917,7.448,20.37c5.155,5.453,12.416,8.581,19.921,8.581h18.541   c7.504,0,14.765-3.127,19.92-8.581c5.155-5.453,7.87-12.878,7.448-20.37l-3.564-63.404l47.854,53.555   c5,5.596,12.169,8.926,19.671,9.137c0.254,0.007,0.506,0.011,0.759,0.011c7.235,0,14.268-2.902,19.395-8.029l13.11-13.11   C315.433,289.036,318.355,281.69,318.144,274.188z M277.367,297.478c-2.613-0.074-5.012-1.188-6.754-3.137l-47.936-53.646   c-5.366-6.005-12.813-9.207-20.429-9.207c-3.877,0-7.799,0.83-11.512,2.542c-11.226,5.178-23.144,7.96-35.07,8.481l89.517-89.517   c-0.521,11.926-3.303,23.844-8.482,35.07c-5.076,11.006-2.397,23.842,6.665,31.94l53.646,47.936   c1.95,1.742,3.063,4.141,3.138,6.754c0.073,2.614-0.904,5.072-2.754,6.92l-13.11,13.11   C282.439,296.573,279.981,297.552,277.367,297.478z M157.594,317.193l3.203-56.98c10.334-0.85,20.618-3.146,30.541-6.93   l3.593,63.911c0.146,2.61-0.762,5.094-2.559,6.994c-1.796,1.9-4.225,2.946-6.839,2.946h-18.541c-2.614,0-5.044-1.046-6.841-2.947   C158.356,322.287,157.447,319.803,157.594,317.193z M72.252,69.579c16.857-16.857,42.365-24.397,71.816-21.243   c27.938,2.997,55.502,15.671,73.735,33.905c13.173,13.173,21.79,29.694,25.456,47.222L134.234,238.489   c-0.663,0.663-1.2,1.404-1.613,2.193c-17.708-3.607-34.412-12.257-47.705-25.551c-18.234-18.234-30.909-45.799-33.905-73.736   C47.851,111.941,55.395,86.436,72.252,69.579z M242.066,53.761c17.636,21.873,28.164,50.327,28.164,76.113   c0,14.016-3.173,27.544-8.912,39.77c2.333-12.385,2.54-25.007,0.712-37.323c-0.009-0.883-0.149-1.762-0.416-2.612   c-3.852-22.34-14.405-43.519-31.081-60.196c-21.047-21.047-52.652-35.654-84.544-39.074c-3.016-0.323-5.997-0.542-8.946-0.671   C149.446,22.066,162.779,18,176.263,18C200.103,18,223.472,30.7,242.066,53.761z"
												/>
											</g>
										</svg>
										<h1 class="pl-2 font-bold text-2xl">0</h1>
									</div>
									<div class="rounded-full flex h-3 w-[60%] ring-1 ring-slate-600 shadow-lg">
										<div class="relative bg-green-700 brightness-125 h-full w-[40%]">
											<div class="absolute flex gap-2 items-center justify-center -top-6">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="green"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-4 h-4 text-black"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												<h1 class="font-bold tracking-wide text-green-700">34%</h1>
											</div>
											<div class="absolute top-4 text-green-700"><p>43 victories</p></div>
										</div>
										<div class="relative bg-gray-400 brightness-105 h-full w-[10%]">
											<div class="absolute flex gap-2 items-center -top-6 right-0">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1"
													stroke="currentColor"
													class="w-4 h-4 bg-gray-700 rounded-md"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M6 9h12m-12 6.75h12"
													/>
												</svg>
												<h1 class="font-bold tracking-wide text-gray-700">10%</h1>
											</div>
											<div class="absolute top-4 text-gray-700 w-screen"><p>10 pat</p></div>
										</div>
										<div class="relative bg-red-700 brightness-200 h-full w-[50%]">
											<div class="absolute flex gap-2 items-center justify-center -top-6 right-0">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="red"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-4 h-4 text-black"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												<h1 class="font-bold tracking-wide text-red-700">66%</h1>
											</div>
											<div class="absolute top-4 right-0 text-red-700"><p>140 looses</p></div>
										</div>
									</div>
								</div>
							{:else if slideLevel === 1}
								<div class="flex flex-col items-center justify-center font-semibold text-gray-400 tracking-wide pt-2">Longest winning streak</div>
								<div
									class="absolute top-[15%] right-1/2 transform translate-x-1/2 translate-y-[10%] flex items-center justify-center text-[50px]"
								>
									🔥<span class="font-bold brightness-125">5</span>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- <Progress progress={30} /> -->
<!-- {#if !isCurrentUserProfile}
					<button on:click={handleSendFriendRequest} class="p-2 mt-4 rounded-md bg-red-400 text-white font-medium shadow-md hover:bg-red-500 transition duration-150 ease-linear" >Send Friend Request</button>
			{/if} -->

<!--
		1. dire que si le store pseudo === a le fetch de ton userinformation alors ca veut dire
	que tu es sur ton profile et donc que tu ne veux pas afficher le fait que tu vas tenvoyer un message

	2. sinon, envoyer le sendfriendrequest via appolo client sur le boutton afficher
-->
