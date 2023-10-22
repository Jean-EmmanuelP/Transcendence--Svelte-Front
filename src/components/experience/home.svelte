<script lang="ts">
	import { onMount } from 'svelte';
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
		event.currentTarget.style.transition = `transform ${transitionDuration}ms ease`;
		event.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
	}
	let laserDirection = 'right'; // ['right', 'down', 'left', 'up']

	onMount(() => {
		const laserElement = document.querySelector('.laser-effect') as HTMLElement;
		if (!laserElement) return;

		let posX = 0;
		let posY = 0;
		const laserSpeed = 2;

		function updateLaserPosition() {
			if (laserElement) {
				switch (laserDirection) {
					case 'right':
						posX += laserSpeed;
						if (posX >= laserElement.clientWidth) {
							laserDirection = 'down';
							laserElement.style.setProperty('--laser-width', '2px');
							laserElement.style.setProperty('--laser-height', '100px');
							posX = laserElement.clientWidth - 2;
							posY = 0;
						}
						break;
					case 'down':
						posY += laserSpeed;
						if (posY >= laserElement.clientHeight) {
							laserDirection = 'left';
							laserElement.style.setProperty('--laser-width', '100px');
							laserElement.style.setProperty('--laser-height', '2px');
							posX = laserElement.clientWidth;
							posY = laserElement.clientHeight - 2;
						}
						break;
					case 'left':
						posX -= laserSpeed;
						if (posX <= 0) {
							laserDirection = 'up';
							laserElement.style.setProperty('--laser-width', '2px');
							laserElement.style.setProperty('--laser-height', '100px');
							posX = 2;
							posY = laserElement.clientHeight;
						}
						break;
					case 'up':
						posY -= laserSpeed;
						if (posY <= 0) {
							laserDirection = 'right';
							laserElement.style.setProperty('--laser-width', '100px');
							laserElement.style.setProperty('--laser-height', '2px');
							posX = 0;
							posY = 2;
						}
						break;
				}

				laserElement.style.setProperty('--laser-pos-x', posX + 'px');
				laserElement.style.setProperty('--laser-pos-y', posY + 'px');
				requestAnimationFrame(updateLaserPosition);
			}
		}

		updateLaserPosition();
	});
</script>

<div class="relative h-full w-full flex items-center justify-center">
	<div class="absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-1/2 w-[80%] h-[80%] bg-[#26619c] mix-blend-multiply filter blur-xl opacity-70"></div>
	<div
		on:mouseleave={handleMouseLeave}
		on:mousemove={handleMouseMove}
		class="h-[80%] w-[80%] z-10 backdrop-filter opacity-100 backdrop-blur-lg shadow-lg rounded-2xl transition duration-100 bg-[#181C2A] laser-effect"
	>
		<div
			class="absolute top-50% left-50% transform -translate-x-50% -translate-y-50% w-[130%] h-[130%]"
		>
			<!-- Blobs -->
			<div
				class="absolute top-0 left-0 w-72 h-72 bg-[#26619c] animate-blob rounded-full mix-blend-multiply filter blur-xl opacity-70"
			/>
			<div
				class="absolute top-0 right-0 w-72 h-72 bg-[#649fd9] animate-blob animation-delay-2000 rounded-full mix-blend-multiply filter blur-xl opacity-70"
			/>
			<div
				class="absolute top-1/2 left-1/2 transform -translate-x-50% -translate-y-50% w-72 h-72 bg-[#660011] animate-blob animation-delay-4000 rounded-full mix-blend-multiply filter blur-xl opacity-70"
			/>
		</div>
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
