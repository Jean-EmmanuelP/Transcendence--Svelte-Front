<script lang="ts">
	import { onMount } from 'svelte';
	import Game from './game.svelte';
	import Waiting from './waiting.svelte';
	import type { GameFound } from '../../interfaces/gameFound.js';
	import type { Socket } from 'socket.io-client';

	export let socket: Socket;

	let isModeSelected: boolean = false; /** Check if the user selected the mode */
	let mode: string = ''; /** selected mode: {mm/p_friend/p_bot}_selected */
	let isWaiting: boolean = true; /** State: waiting for an opponent */
	let roomId: string = ''; /** room id that we play */
	let opponentId: string = ''; /** opponent id */

	console.log('[Lobby room] Entered the lobby room');

	function clickedButton(button: string, bool?: boolean) {
		if (button === 'back_chosemode') {
			isModeSelected = false;
			mode = '';
		} else if (button === 'matchmaking') {
			isModeSelected = true;
			mode = 'mathchmaking';
			socket.emit('matchmaking');
		} else if (button === 'playFriend') {
			isModeSelected = true;
			mode = 'playFriend';
			socket.emit('playFriend');
		} else if (button === 'playBot') {
			isModeSelected = true;
			mode = 'playBot';
			socket.emit('playBot');
		}
	}

	onMount(() => {
		socket.on('waiting', (data: any) => {
			console.log('[Lobby room] Waiting for an opponet', data);

			isWaiting = true;
		});

		socket.on('gameFound', (data: GameFound) => {
			console.log('[Lobby room] Game found. Room: ', data.roomId);

			socket.emit('ready-mm', { roomId: data.roomId });
			roomId = data.roomId;
			isWaiting = false;
		});
	});
</script>

{#if isModeSelected === false}
	<div>
		<div class="rectangle">
			<button on:click={() => clickedButton('matchmaking')}>Matchmaking</button>
		</div>
		<div class="rectangle">
			<button on:click={() => clickedButton('playFriend')}>Play Friend</button>
		</div>
		<div class="rectangle">
			<button on:click={() => clickedButton('playBot')}>Play Bot</button>
		</div>
	</div>
{:else if isModeSelected === true}
	{#if mode === 'mathchmaking'}
		{#if isWaiting === true}
			<Waiting />
		{:else if isWaiting === false}
			{console.log('Entered here in game')}
			<Game {socket} {roomId} />
		{/if}
	{:else if mode === 'playFriend'}
		{#if isWaiting === true}
			<Waiting />
		{:else if isWaiting === false}
			<Game {socket} {roomId} />
		{/if}
	{:else if mode === 'playBot'}
		{#if isWaiting === true}
			<Waiting />
		{:else if isWaiting === false}
			<Game {socket} {roomId} />
		{/if}
	{/if}
{:else}
	<p>Something went wrong</p>
{/if}

<style>
	.rectangle {
		width: 100px;
		height: 100px;
		background-color: red;
	}
</style>
