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

<div class="w-full h-full text-white flex flex-col gap-2">
	<div
		class="flex items-center h-[40%] w-full bg-[url(https://cdn.aglty.io/fortanix/web3/bg.svg)] bg-center bg-cover bg-no-repeat"
	>
		<div class="h-full w-1/4 flex items-center justify-center">
			<img class="h-32 w-32 border border-black rounded-full shadow-md" src={user.avatar} alt="" />
		</div>
		<div class="flex flex-col h-full w-2/4 flex items-center justify-center">
			<div class="flex items-center h-1/3 w-full">
				<div class="w-1/2 h-full flex items-center justify-center">
					Jean-Emmanuel<br />Perramant
				</div>
				<div class="w-1/2 h-full flex items-center justify-center">jperrama</div>
			</div>
			<div class="flex flex-col items-center gap-2 h-2/3 w-full p-2">
				<div
					class="h-1/4 w-full bg-gradient-to-r from-[#4F46E5] to-blue-500/90 rounded-md flex items-center justify-center gap-2"
				>
					<span class="text-blue-800 font-bold">Grade</span>Learner
				</div>
				<div class="h-2/4 w-full flex gap-4">
					<div
						class="h-full w-1/2 bg-gradient-to-r from-[#4F46E5] to-blue-500/90 rounded-md flex flex-col gap-2 items-center justify-center"
					>
						<p>ONLINE</p>
						<p>-</p>
					</div>
					<div
						class="flex flex-col gap-2 items-center justify-center h-full w-1/2 bg-gradient-to-r from-[#4F46E5] to-blue-500/90 rounded-md"
					>
						<h1>WINS - LOSSES</h1>
						<p>00 - 00</p>
					</div>
				</div>
				<div
					class="h-1/4 w-full bg-gradient-to-r from-black to-black/80 rounded-md flex items-center justify-center relative"
				>
					<div class="absolute inset-y-0 left-0 bg-indigo-600 rounded-l-md w-[45%] h-full" />
					<span class="z-10">level 7 - 45%</span>
				</div>
			</div>
		</div>
		<div class="flex flex-row h-full w-1/4 flex items-center justify-center">
			<div class="h-full w-[2%]" />
			<div
				class="flex flex-col items-center justify-around h-full w-[98%] bg-gradient-to-r from-[#4F46E5] to-blue-500/90"
			>
				<div class="flex gap-2">
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
							stroke="#FFFFFF"
							stroke-width="1"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<p>+33 6 95 51 14 61</p>
				</div>
				<div class="flex gap-2">
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
							stroke="#FFFFFF"
							stroke-width="1"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<p>jperrama@student.42.fr</p>
				</div>
				<div class="flex gap-2">
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
							stroke="#FFFFFF"
							stroke-width="1"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<p>Paris</p>
				</div>
				<div class="flex gap-2">
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9 10H9.009M15 10H15.009M5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10V21L18.1828 20.4552C17.4052 19.9368 17.0165 19.6777 16.605 19.6045C16.2421 19.54 15.8685 19.577 15.5253 19.7114C15.1362 19.8638 14.8058 20.1942 14.145 20.855V20.855C14.0649 20.9351 13.9351 20.935 13.8549 20.855C13.4039 20.4052 13.1548 20.1686 12.888 20.0364C12.3285 19.7591 11.6715 19.7591 11.112 20.0364C10.8452 20.1686 10.5961 20.4052 10.1451 20.855C10.0649 20.935 9.93508 20.9351 9.855 20.855V20.855C9.19423 20.1942 8.86384 19.8638 8.47469 19.7114C8.13152 19.577 7.75788 19.54 7.39501 19.6045C6.98352 19.6777 6.59475 19.9368 5.81722 20.4552L5 21V10Z"
							stroke="#FFFFFF"
							stroke-width="1"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<p>2026-10-13</p>
				</div>
			</div>
		</div>
	</div>
	<div class="h-full border border-black h-[30%] w-full text-black">
		<h1 class="text-center">Achievments</h1>
	</div>
	<div class="h-[30%] w-full text-black border border-black">
		<h1 class="text-center">Match History</h1>
	</div>
	<div />
</div>
