<script lang="ts">
	import { goto } from '$app/navigation';
	import { activePage } from '../../stores/currentNavigation';

	function setActivePage(page: string) {
		activePage.set(page);
	}
</script>

<div class="flex flex-grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 h-full w-full">
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
						<!-- Current: "bg-indigo-700 text-white", Default: "text-indigo-200 hover:text-white hover:bg-indigo-700" -->
						<a
							on:click={() => {
								setActivePage('dashboard');
								goto('/');
							}}
							class={`${
								$activePage === 'dashboard' ? `bg-indigo-700 text-white` : ''
							} text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
						>
							<svg
								class="h-6 w-6 shrink-0 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
								/>
							</svg>
							Dashboard
						</a>
					</li>
					<li>
						<a
							on:click={() => {
								setActivePage('messages');
								goto('/messages');
							}}
							class={`${
								$activePage === 'messages' ? `bg-indigo-700 text-white` : ''
							} text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
						>
							<svg
								class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
								/>
							</svg>
							Messages
						</a>
					</li>
					<li>
						<a
							on:click={() => {setActivePage('profile'); goto('profile')}}
							class={`${
								$activePage === 'profile' ? `bg-indigo-700 text-white` : ''
							} text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
						>
							<svg
								class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
								/>
							</svg>
							Statistics
						</a>
					</li>
				</ul>
			</li>
			<li>
				<div class="text-xs font-semibold leading-6 text-indigo-200">Online</div>
				<ul role="list" class="-mx-2 mt-2 space-y-1">
					<li>
						<!-- Current: "bg-indigo-700 text-white", Default: "text-indigo-200 hover:text-white hover:bg-indigo-700" -->
						<a
							href="#"
							class="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
						>
							<span
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white"
								>H</span
							>
							<span class="truncate">Heroicons</span>
						</a>
					</li>
					<li>
						<a
							href="#"
							class="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
						>
							<span
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white"
								>T</span
							>
							<span class="truncate">Tailwind Labs</span>
						</a>
					</li>
					<li>
						<a
							href="#"
							class="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
						>
							<span
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white"
								>W</span
							>
							<span class="truncate">Workcation</span>
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</div>
