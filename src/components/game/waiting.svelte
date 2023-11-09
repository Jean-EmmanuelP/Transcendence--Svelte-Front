<script>
</script>

<div
	class="relative text-white flex flex-col gap-6 items-center justify-center w-[200px] h-[200px]"
>
	<button
		class="absolute top-[-50px] left-[-10px] text-white/40 shadow-sm hover:scale-110 rounded-full"
		on:click={back}
		><svg
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
				d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	</button>
	<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"
		><style>
			.spinner_EUy1 {
				animation: spinner_grm3 1.2s infinite, colorChange 3s infinite;
				fill: #f56565;
			}
			.spinner_f6oS {
				animation-delay: 0.1s;
			}
			.spinner_g3nX {
				animation-delay: 0.2s;
			}
			.spinner_nvEs {
				animation-delay: 0.3s;
			}
			.spinner_MaNM {
				animation-delay: 0.4s;
			}
			.spinner_4nle {
				animation-delay: 0.5s;
			}
			.spinner_ZETM {
				animation-delay: 0.6s;
			}
			.spinner_HXuO {
				animation-delay: 0.7s;
			}
			.spinner_YaQo {
				animation-delay: 0.8s;
			}
			.spinner_GOx1 {
				animation-delay: 0.9s;
			}
			.spinner_4vv9 {
				animation-delay: 1s;
			}
			.spinner_NTs9 {
				animation-delay: 1.1s;
			}
			.spinner_auJJ {
				transform-origin: center;
				animation: spinner_T3O6 6s linear infinite;
			}
			@keyframes spinner_grm3 {
				0%,
				50% {
					animation-timing-function: cubic-bezier(0.27, 0.42, 0.37, 0.99);
					r: 1px;
				}
				25% {
					animation-timing-function: cubic-bezier(0.53, 0, 0.61, 0.73);
					r: 2px;
				}
			}
			@keyframes spinner_T3O6 {
				0% {
					transform: rotate(360deg);
				}
				100% {
					transform: rotate(0deg);
				}
			}
			@keyframes colorChange {
				0% {
					fill: #f56565;
				}
				50% {
					fill: #4299e1;
				}
				100% {
					fill: #f56565;
				}
			}
		</style><g class="spinner_auJJ"
			><circle class="spinner_EUy1" cx="12" cy="3" r="1" /><circle
				class="spinner_EUy1 spinner_f6oS"
				cx="16.50"
				cy="4.21"
				r="1"
			/><circle class="spinner_EUy1 spinner_NTs9" cx="7.50" cy="4.21" r="1" /><circle
				class="spinner_EUy1 spinner_g3nX"
				cx="19.79"
				cy="7.50"
				r="1"
			/><circle class="spinner_EUy1 spinner_4vv9" cx="4.21" cy="7.50" r="1" /><circle
				class="spinner_EUy1 spinner_nvEs"
				cx="21.00"
				cy="12.00"
				r="1"
			/><circle class="spinner_EUy1 spinner_GOx1" cx="3.00" cy="12.00" r="1" /><circle
				class="spinner_EUy1 spinner_MaNM"
				cx="19.79"
				cy="16.50"
				r="1"
			/><circle class="spinner_EUy1 spinner_YaQo" cx="4.21" cy="16.50" r="1" /><circle
				class="spinner_EUy1 spinner_4nle"
				cx="16.50"
				cy="19.79"
				r="1"
			/><circle class="spinner_EUy1 spinner_HXuO" cx="7.50" cy="19.79" r="1" /><circle
				class="spinner_EUy1 spinner_ZETM"
				cx="12"
				cy="21"
				r="1"
			/></g
		></svg
	>
	<p class="wave-text text-white">
		{#each letters as letter, index (index)}
			{#if letter !== ' '}
				<span style="animation-delay: {index * 0.05}s">{letter}</span>
			{:else}
				&nbsp; &nbsp;
			{/if}
		{/each}
	</p>
</div>
