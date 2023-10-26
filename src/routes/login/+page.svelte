<script lang="ts">

	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import AuthServices from "../../services/auth";
	import Cookies from 'js-cookie';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { authentication } from '../../stores/authentication';

	const loading = writable(false);
	const serverError = writable(undefined);

	const { form, handleChange, errors, state, handleSubmit } = createForm({
		initialValues: {
			password: '',
			email: ''
		},
		validationSchema: yup.object().shape({
			password: yup
				.string()
				.required('Password is required'),
			email: yup.string().email().required()
		}),
		onSubmit: async (values) => {
			loading.set(true);
			try {
				const response = await AuthServices.loginCredentials(values.email, values.password);
				if (Cookies.get("access_token"))
					Cookies.remove("access_token");
				Cookies.set("access_token", response.token, { expires: 1 });
				authentication.setUser(response);
				goto('/')
			} catch (error) {
				serverError.set(error.statusText);
				loading.set(false);
			}
		}
	});

</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/>
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Sign in to your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
				<div>
				<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
						>Email address</label>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							on:change={handleChange}
							bind:value={$form.email}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					{#if $errors.email}
						<small>{$errors.email}</small>
					{/if}

				</div>

				<div>
					<label for="password" class="block text-sm font-medium leading-6 text-gray-900"
						>Password</label
					>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							on:change={handleChange}
							bind:value={$form.password}
							autocomplete="current-password"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					{#if $errors.password}
						<small>{$errors.password}</small>
					{/if}
				</div>

				<div class="flex items-center justify-between">


					<div class="text-sm leading-6">
						<a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
							>Forgot password?</a
						>
					</div>
				</div>

				<div>

					{#if $serverError}
						<small>{$serverError}</small>
					{/if}
					{#if !loading}
					<button
						disabled
						class="flex w-full justify-center rounded-md bg-indigo-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						><svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
						</svg></button>
					{:else}
					<button
						type="submit"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Sign in</button>
					{/if}

				</div>
			</form>

			<div>
				<div class="relative mt-10">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-200" />
					</div>
					<div class="relative flex justify-center text-sm font-medium leading-6">
						<span class="bg-white px-6 text-gray-900">Or continue with</span>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-2 gap-4">
					<a
						href="http://68.183.79.168:3000/auth/42"
						class="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
					>
						<svg
							version="1.1"
							class="h-5 w-5"
							id="Calque_1"
							x="0px"
							y="0px"
							viewBox="0 -200 960 960"
							enable-background="new 0 -200 960 960"
							xml:space="preserve"
						>
							<polygon
								id="polygon5"
								points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1
	32,279.1 "
							/>
							<polygon id="polygon7" points="597.9,114.2 762.7,-51.1 597.9,-51.1 " />
							<polygon
								id="polygon9"
								points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 "
							/>
							<polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 " />
						</svg>
						<span class="text-sm font-semibold leading-6">42</span>

					</a>

					<a
						href="http://68.183.79.168:3000/auth/google"
						class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
					>
						<svg viewBox="0 0 48 48" class="h-5 w-5">
							<title>Google Logo</title>
							<clipPath id="g">
								<path
									d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
								/>
							</clipPath>
							<g class="colors" clip-path="url(#g)">
								<path fill="#FBBC05" d="M0 37V11l17 13z" />
								<path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
								<path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
								<path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
							</g>
						</svg>
						<span class="text-sm font-semibold leading-6">Google</span>
					</a>
				</div>
			</div>
		</div>

		<p class="mt-10 text-center text-sm text-gray-500">
			Not a member?
			<a href="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
				Register an account
			</a>
		</p>
	</div>
</div>
