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

	let enabled = true;
	function handle2FAClick() {
		enabled = !enabled;
	}
</script>

<div class="w-full h-full overflow-auto">
	<div
		class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
	>
		<div>
			<h2 class="text-base font-semibold leading-7">Personal Information</h2>
			<p class="mt-1 text-sm leading-6 text-gray-400">
				Here is where you can change your information
			</p>
		</div>

		<form class="md:col-span-2">
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div class="col-span-full flex items-center gap-x-8">
					<img
						src={user.avatar}
						alt=""
						class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
					/>
					<div>
						<button
							type="button"
							class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-white/20"
							>Change avatar</button
						>
						<p class="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
					</div>
				</div>
				<div class="col-span-full">
					<label for="email" class="block text-sm font-medium leading-6">Email</label>
					<div class="mt-2">
						<div
							class="flex rounded-md bg-gray-500/5 border border-black/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
						>
							<div class="flex items-center pl-2">
								<svg
									class="h-5 w-5 text-gray-400"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"
									/>
									<path
										d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"
									/>
								</svg>
							</div>
							<input
								type="text"
								name="email"
								id="email"
								class="flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder={user.email}
								readonly
							/>
						</div>
					</div>
					<label for="pseudo" class="block text-sm font-medium leading-6">Pseudo</label>
					<div class="mt-2">
						<div
							class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
						>
							<input
								type="text"
								name="pseudo"
								id="pseudo"
								class="flex-1 ring-0 border border-gray-500/5 rounded-md shadow-sm bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="janesmith"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-8 flex">
				<button
					type="submit"
					class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Save</button
				>
			</div>
		</form>
	</div>

	<div
		class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
	>
		<div>
			<h2 class="text-base font-semibold leading-7">Change password</h2>
			<p class="mt-1 text-sm leading-6 text-gray-400">
				Update your password associated with your account.
			</p>
		</div>

		<form class="md:col-span-2">
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div class="col-span-full">
					<label for="current-password" class="block text-sm font-medium leading-6"
						>Current password</label
					>
					<div class="mt-2">
						<input
							id="current-password"
							name="current_password"
							type="password"
							autocomplete="current-password"
							class="block w-full ring-0 border border-gray-500/5 rounded-md shadow-sm bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="new-password" class="block text-sm font-medium leading-6">New password</label>
					<div class="mt-2">
						<input
							id="new-password"
							name="new_password"
							type="password"
							autocomplete="new-password"
							class="block w-full ring-0 border border-gray-500/5 rounded-md shadow-sm bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="confirm-password" class="block text-sm font-medium leading-6"
						>Confirm password</label
					>
					<div class="mt-2">
						<input
							id="confirm-password"
							name="confirm_password"
							type="password"
							autocomplete="new-password"
							class="block w-full ring-0 border border-gray-500/5 rounded-md shadow-sm bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>

			<div class="mt-8 flex">
				<button
					type="submit"
					class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Save</button
				>
			</div>
		</form>
	</div>
	<div
		class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
	>
		<div>
			<h2 class="text-base font-semibold leading-7">Activate Two Factor Authentication</h2>
			<p class="mt-1 text-sm leading-6 text-gray-400">
				Make your account more safe by activating 2FA
			</p>
		</div>

		<form class="md:col-span-2">
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div class="col-span-full">
					<div class="flex items-center">
						<button
							type="button"
							on:click={handle2FAClick}
							class={`${
								enabled ? 'bg-indigo-600' : 'bg=gray-200'
							} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
							role="switch"
							aria-checked="false"
							aria-labelledby="annual-billing-label"
						>
							<span
								aria-hidden="true"
								class={` ${
									enabled ? 'translate-x-5' : 'translate-x-0'
								} translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
							/>
						</button>
						<span class="ml-3 text-sm" id="annual-billing-label">
							<span class="font-medium text-gray-900">Enable 2FA</span>
						</span>
					</div>
				</div>
			</div>

			<div class="mt-8 flex">
				<button
					type="submit"
					class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Save</button
				>
			</div>
		</form>
	</div>
	<div
		class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
	>
		<div>
			<h2 class="text-base font-semibold leading-7">Delete account</h2>
			<p class="mt-1 text-sm leading-6 text-gray-400">
				No longer want to use our service? You can delete your account here. This action is not
				reversible. All information related to this account will be deleted permanently.
			</p>
		</div>

		<form class="flex items-start md:col-span-2">
			<button
				type="submit"
				class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-400 text-white"
				>Yes, delete my account</button
			>
		</form>
	</div>
</div>
