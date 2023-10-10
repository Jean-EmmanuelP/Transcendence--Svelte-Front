<script lang="ts">
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import AuthServices from '../../services/auth';
	import Cookies from 'js-cookie';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const loading = writable(false);
	const serverError = writable(undefined);

	const { form, handleChange, errors, state, handleSubmit } = createForm({
		initialValues: {
			password: '',
			firstName: '',
			lastName: '',
			email: ''
		},
		validationSchema: yup.object().shape({
			password: yup
				.string()
				.min(8, 'Password must be at least 8 characters long')
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
					'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
				)
				.required('Password is required'),
			firstName: yup.string().required("First name is required"),
			lastName: yup.string().required("Last name is required"),
			email: yup.string().email().required()
		}),
		onSubmit: async (values) => {
			loading.set(true);
			try {
				const response = await AuthServices.register(values);
				if (Cookies.get('access_token')) Cookies.remove('access_token');
				Cookies.set('access_token', response.accessToken, { expires: 1 });
				goto('/home');
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
			Sign up
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
				<div>
					<label for="firstName" class="block text-sm font-medium leading-6 text-gray-900"
						>First name</label
					>
					<div class="mt-2">
						<input
							id="firstName"
							name="firstName"
							type="firstName"
							on:change={handleChange}
							bind:value={$form.firstName}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					{#if $errors.firstName}
						<small>{$errors.firstName}</small>
					{/if}
				</div>
				<div>
					<label for="lastName" class="block text-sm font-medium leading-6 text-gray-900"
						>Last name</label
					>
					<div class="mt-2">
						<input
							id="lastName"
							name="lastName"
							type="lastName"
							on:change={handleChange}
							bind:value={$form.lastName}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					{#if $errors.lastName}
						<small>{$errors.lastName}</small>
					{/if}
				</div>
				<div>
					<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
						>Email address</label
					>
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
				<div>
					{#if $serverError}
						<small>{$serverError}</small>
					{/if}
					<button
						type="submit"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Sign up</button
					>
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
						href="http://42pong.com:3000/auth/42"
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
						href="http://42pong.com:3000/auth/google"
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
			Already a member?
			<a href="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</a>
		</p>
	</div>
</div>
