<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { activeColor } from '../../stores/currentNavigation';
	let clickedPlay: boolean = false;
	function clickedButton(button: string) {
		if (button == 'play') clickedPlay = !clickedPlay;
		if (button == 'matchmaking') clickedMatchmaking = !clickedMatchmaking;
		if (button == 'friends') clickedPlayWithFriends = !clickedPlayWithFriends;
	}

	let mouseX = 0;
	let mouseY = 0;
	let clickedMatchmaking: boolean = false;
	let clickedPlayWithFriends: boolean = false;
	let tiltStrength = 4;
	let blobElement: HTMLElement;
	let laserElement: HTMLElement;
	let playElement: HTMLElement;
	let laserSpeed = 2;
	let currentTiltX = 0;
	let currentTiltY = 0;
	const lerpFactor = 0.2;

	function lerp(start: number, end: number, factor: number) {
		return start + (end - start) * factor;
	}

	function handleMouseMove(event: any) {
		if (!event.currentTarget || !blobElement) return;
		const rect = event.currentTarget.getBoundingClientRect();
		mouseX = event.clientX - rect.left;
		mouseY = event.clientY - rect.top;

		const percentX = (mouseX / rect.width) * 2 - 1;
		const percentY = (mouseY / rect.height) * 2 - 1;

		const tiltX = tiltStrength * percentY;
		const tiltY = tiltStrength * percentX;

		currentTiltX = lerp(currentTiltX, tiltX, lerpFactor);
		currentTiltY = lerp(currentTiltY, tiltY, lerpFactor);

		event.currentTarget.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
		blobElement.style.width = '70%';
		blobElement.style.height = '70%';
		blobElement.style.transform = `translate(-50%, -50%) rotateX(${currentTiltX - 10}deg) rotateY(${
			currentTiltY - 10
		}deg)`;
		activeColor.set('');
		blobElement.style.backgroundColor = 'red';
	}

	function handleMouseLeave(event: any) {
		if (!event.currentTarget || !blobElement) return;
		const transitionDuration = 1000;
		event.currentTarget.style.transition = `transform ${transitionDuration}ms ease`;
		event.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
		blobElement.style.width = '80%';
		blobElement.style.height = '80%';
		blobElement.style.transform = 'translate(-50%, -50%) rotateX(0deg) rotateY(0deg)';
		blobElement.style.backgroundColor = '#26619c';
		activeColor.set('#26619c');
	}
	let laserDirection = 'right';
	onMount(() => {
		if (!laserElement || !playElement || !blobElement) return;

		let posX = 0;
		let posY = 0;

		if (laserElement && playElement && blobElement) {
			setTimeout(() => {
				blobElement.style.opacity = '1';
				playElement.style.opacity = '1';
				playElement.style.backgroundColor = 'white';
				laserElement.style.transform = `scale(1) rotateX(0deg) rotateY(0deg)`;
				laserElement.style.opacity = '1';
			}, 250);
		}

		let animationFrameId: number;

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
				animationFrameId = requestAnimationFrame(updateLaserPosition);
			}
		}

		updateLaserPosition();
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<div class="parent-enter-effect relative h-full w-full flex items-center justify-center">
	<div
		class=" blob-bg opacity-0 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[80%] h-[80%] bg-[#26619c] mix-blend-multiply filter blur-xl"
		bind:this={blobElement}
	/>
	<div
		on:mouseleave={handleMouseLeave}
		on:mousemove={handleMouseMove}
		class="h-[80%] w-[80%] z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition duration-100 bg-black laser-effect"
		bind:this={laserElement}
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
			<div class="relative">
				{#if !clickedPlay && !clickedPlayWithFriends && !clickedMatchmaking}
					<div
						class="absolute -inset-0.5 bg-gradient-to-r from-black to-black rounded-lg blur opacity-50 group-hover/3:opacity-75 transition duration-1000 group-hover/3:duration-200 animate-tilt"
					/>
					<button
						on:click={() => clickedButton('play')}
						in:fade={{ delay: 100, duration: 500 }}
						class={`playButton hover:w-[80px] hover:h-[80px] play-button relative px-7 py-4 rounded-lg leading-none flex transition duration-500 ease-in-out ${
							clickedPlay ? 'opacity-0' : 'opacity-100'
						}`}
						bind:this={playElement}
					/>
				{:else if clickedPlay && !clickedPlayWithFriends && !clickedMatchmaking}
					<div
						class={`flex flex-col items-center justify-center h-full w-full transition duration-500 transform ease-in-out gap-7 ${
							clickedPlay ? 'opacity-100' : `opacity-100`
						}`}
					>
						<div class="relative flex w-full max-w-[200px] rounded-md ring-1 ring-gray-500/20 group/1">
							<div
								class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover/1:opacity-75 transition duration-1000 group-hover/1:duration-200 animate-tilt"
							/>
							<button
								class="uppercase relative w-full rounded-md bg-black text-white font-medium p-4  transition transform duration-500 hover:duration-300"
							>
								<span />
								<p class="tracking-wider font-bold group-hover/1:font-extrabold">Matchmaking</p>
							</button>
						</div>
						<div class="relative flex w-full max-w-[200px] rounded-md ring-1 ring-gray-500/20 group/2">
							<div
								class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover/2:opacity-75 transition duration-1000 group-hover/2:duration-200 animate-tilt"
							/>
							<button
								class="uppercase relative rounded-md bg-black text-white p-4 font-medium hover:font-bold transition transform duration-500 hover:duration-300"
							>
								<span />
								<p class="tracking-wider font-bold group-hover/2:font-extrabold">Play with a friend</p>
							</button>
						</div>
					</div>
				{:else if clickedPlay && (clickedPlayWithFriends || clickedMatchmaking)}
					<div class="text-white">
						loading spin
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
