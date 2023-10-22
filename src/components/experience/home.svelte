<script lang="ts">
	import { fade } from 'svelte/transition';
	let clickedPlay: boolean = false;
	function clickedPlayButton() {
		clickedPlay = !clickedPlay;
		console.log('clickedPlay', clickedPlay);
	}

	let mouseX = 0;
	let mouseY = 0;
	let tiltStrength = 15;

	function handleMouseMove(event: any) {
		const rect = event.currentTarget.getBoundingClientRect();
		mouseX = event.clientX - rect.left;
		mouseY = event.clientY - rect.top;

		const percentX = (mouseX / rect.width) * 2 - 1;
		const percentY = (mouseY / rect.height) * 2 - 1;

		const tiltX = tiltStrength * percentY;
		const tiltY = -tiltStrength * percentX;

		event.currentTarget.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
	}

	function handleMouseLeave(event: any) {
		const transitionDuration = 1000;
		event.currentTarget.style.transition = `transform ${transitionDuration}ms ease`
		event.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
	}
</script>

<div class="relative h-full w-full flex items-center justify-center">
	<div
		on:mouseleave={handleMouseLeave}
		on:mousemove={handleMouseMove}
		class="h-[80%] w-[80%] z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition duration-100"
	>
		<div class="w-full h-full flex items-center justify-center transparent">
			<div class="relative group">
				{#if !clickedPlay}
					<div
						class="absolute -inset-0.5 bg-gradient-to-r from-black to-black rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
					/>
					<button
						on:click={clickedPlayButton}
						in:fade={{ delay: 100, duration: 500 }}
						class={`group relative px-7 py-4 bg-white rounded-lg leading-none flex transition duration-500 transform ease-in-out ${
							clickedPlay ? 'opacity-0' : 'opacity-100'
						}`}
					>
						<span class="flex items-center space-x-5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 -rotate-6 group-hover:rotate-0 text-black group-hover:text-black transition transform duration-1000 group-hover:duration-500"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
								/>
							</svg>
							<span class="pr-6 tracking-wide text-black font-poppins group-hover:font-bold"
								>Play</span
							>
						</span>
					</button>
				{:else}
					<div
						class={`flex flex-col items-center justify-center h-full w-full transition duration-500 transform ease-in-out gap-7 ${
							clickedPlay ? 'opacity-100' : `opacity-0`
						}`}
					>
						<div class="relative group">
							<div
								class="absolute -inset-0.5 bg-gradient-to-r from-black to-black rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
							/>
							<button
								class="relative rounded-md bg-white text-black p-4 hover:font-medium transition transform duration-500 hover:duration-300"
							>
								<span />
								<p>Matchmaking</p>
							</button>
						</div>
						<div class="relative group">
							<div
								class="absolute -inset-0.5 bg-gradient-to-r from-black to-black rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"
							/>
							<button
								class="relative rounded-md bg-white text-black p-4 hover:font-medium transition transform duration-500 hover:duration-300"
							>
								<span />
								<p>Play with a friend</p>
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
