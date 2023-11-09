```c
int main() {
    printf("Hello World\n");
    return (0);
}
```

```svelte
{:else if clickedPlay && !clickedPlayWithFriends && !clickedMatchmaking && !showDiv}
					<div
						class={`relative flex flex-col items-center justify-center h-full w-full transition duration-500 transform ease-in-out gap-7 ${
							clickedPlay ? 'opacity-100' : `opacity-100`
						}`}
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
						<div
							class="relative flex w-full max-w-[200px] rounded-md ring-1 ring-gray-500/20 group/1"
						>
							<div
								class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover/1:opacity-75 transition duration-1000 group-hover/1:duration-200 animate-tilt"
							/>
							<!-- trigger to say that he is on the waiting list -->
							<button
								class="uppercase relative w-full rounded-md bg-black text-white font-medium p-4 transition transform duration-500 hover:duration-300"
								on:click={() => clickedButton('matchmaking')}
							>
								<span />
								<p class="tracking-wider font-bold group-hover/1:font-extrabold">Matchmaking</p>
							</button>
						</div>
						<div
							class="relative flex w-full max-w-[200px] rounded-md ring-1 ring-gray-500/20 group/2"
						>
							<div
								class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover/2:opacity-75 transition duration-1000 group-hover/2:duration-200 animate-tilt"
							/>
							<button
								class="uppercase relative rounded-md bg-black text-white p-4 font-medium hover:font-bold transition transform duration-500 hover:duration-300"
								on:click={() => clickedButton('friends')}
							>
								<span />
								<p class="tracking-wider font-bold group-hover/2:font-extrabold">
									Play with a friend
								</p>
							</button>
						</div>
					</div>
				{:else if showDiv}
					<div class="relative flex items-center justify-center h-full w-full">
						<!-- Bouton de retour -->
						<button
							class="absolute top-[-50px] left-[-10px] text-white/40 shadow-sm hover:scale-110 rounded-full"
							on:click={back}
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
									d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</button>

						<!-- Contenu centré -->
						<div
							class="relative rounded-md bg-black z-1 text-white ring-1 ring-gray-600/20 backdrop-blur-2xl p-2 gap-4 flex flex-col shadow-md group/1 w-[200px] h-[250px] max-h-[250px]"
						>
							<div class="absolute inset-0 bg-black rounded-md" />

							<header
								class="z-50 w-full h-[15px] text-white font-bold flex items-center justify-center fixed uppercase"
							>
								Friends
							</header>
							<div class="z-50 no-scrollbar overflow-x-auto flex flex-col gap-4 h-full mt-8">
								{#each Array(5) as _, index (index)}
									<button
										class="border w-full group border-gray-600/10 shadow-lg hover:bg-gray-500/50 ring-1 ring-gray-600/20 rounded-md rounded-l-full h-1/2 flex items-center gap-2"
										on:click={() => clickedButton('friends', true)}
									>
										<img
											src="https://avatars.githubusercontent.com/u/59157371?v=4"
											class="rounded-full h-11 w-11 group-hover:border group-hover:border-white/20 group-hover:scale-110"
											alt=""
										/>
										<p class="truncate">Akadil</p>
										<div class="truncate hidden group-hover:block text-white/30 font-extrabold">
											Invite
										</div>
									</button>
								{/each}
							</div>
							<div
								class="absolute -inset-0.5 z-[-10] bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-50 group-hover/1:opacity-75 transition duration-1000 group-hover/1:duration-200 animate-tilt"
							/>
						</div>
					</div>
				{:else if clickedPlay && (clickedPlayWithFriends || clickedMatchmaking)}
					<Court userinformation="yes" userinformation_opponent="yes" />
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

```