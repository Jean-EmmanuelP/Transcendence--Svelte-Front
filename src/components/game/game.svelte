<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';

	export let socket: Socket;

	const court = document.getElementById('court');
	const ball = document.getElementById('ball');
	const paddleLeft = document.getElementById('paddleLeft');
	const paddleRight = document.getElementById('paddleRight');
	const playerOneScoreElement = document.getElementById('playerOneScore');
	const playerTwoScoreElement = document.getElementById('playerTwoScore');
	const gameScale = court?.offsetWidth;

	function getColorBasedOnValue(value: number) {
		// Ensure the value is within the valid range (1 to 100)
		value = Math.max(1, Math.min(100, value - 10));

		// Calculate the red component of the color
		const red = 255 - (value - 1) * 2.55;

		// Create and return the RGB color as a string
		return `rgb(255, ${red}, ${red})`;
	}

	onMount(() => {
		/**
		 * @attention	change the px to % in the game state
		 */
		socket.on('gameState', (gameState) => {
			if (
				!ball ||
				!paddleRight ||
				!paddleLeft ||
				!playerOneScoreElement ||
				!playerTwoScoreElement ||
				!gameScale
			) {
				return;
			}
			console.log('I started to recevie game state');
			ball.style.left = gameState.ball.x * gameScale + 'px';
			ball.style.top = gameState.ball.y * gameScale + 'px';
			ball.style.width = gameState.ball.radius * gameScale + 'px';
			ball.style.height = gameState.ball.radius * gameScale + 'px';

			paddleLeft.style.top = gameState.playerOne.y * gameScale + 'px';
			paddleLeft.style.left = gameState.playerOne.x * gameScale + 'px';
			paddleLeft.style.width = gameState.playerOne.width * gameScale + 'px';
			paddleLeft.style.height = gameState.playerOne.height * gameScale + 'px';
			paddleLeft.style.transform =
				'translate(-50%, -50%)' + 'rotate(' + gameState.playerOne.angle + 'deg)';
			paddleLeft.style.backgroundColor = getColorBasedOnValue(gameState.playerOne.attack);
			playerOneScoreElement.innerHTML = gameState.playerOne.score;

			paddleRight.style.top = gameState.playerTwo.y * gameScale + 'px';
			paddleRight.style.left = gameState.playerTwo.x * gameScale + 'px';
			paddleRight.style.width = gameState.playerTwo.width * gameScale + 'px';
			paddleRight.style.height = gameState.playerTwo.height * gameScale + 'px';
			paddleRight.style.transform =
				'translate(-50%, -50%)' + 'rotate(' + gameState.playerTwo.angle + 'deg)';
			paddleRight.style.backgroundColor = getColorBasedOnValue(gameState.playerTwo.attack);
			playerTwoScoreElement.innerHTML = gameState.playerTwo.score;
		});
	});
</script>

<div
	class="court relative h-full w-full flex items-center justify-center text-white text-lg"
	id="court"
>
	<div class="scoreboard" id="scoreboard">
		Player A: <span id="playerOneScore">0</span> - Player B: <span id="playerTwoScore">0</span>
	</div>
	<div class="paddle" id="paddleLeft" />
	<div class="paddle" id="paddleRight" />
	<div class="ball" />
	<div class="result" />
</div>

<style>
	.ball {
		width: 15px;
		height: 15px;
		background-color: #fff;
		border-radius: 50%;
		position: absolute;
		top: 150px;
		left: 300px;
		transform: translate(-50%, -50%);
	}

	.paddle {
		width: 10px;
		height: 80px;
		background-color: #fff;
		position: absolute;
		border-radius: 10%;
	}

	#paddleLeft {
		top: 1/2;
		left: 20%;
		/* transform: translate(-50%, -50%); */
	}

	#paddleRight {
		top: 200px;
		right: 10px;
		transform: translate(-50%, -50%);
	}

	/* Paddle hover effect */
	.paddle:hover {
		background-color: #777;
	}

	/* Scoreboard styles (optional) */
	.scoreboard {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		font-size: 24px;
	}
</style>
