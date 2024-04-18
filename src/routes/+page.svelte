<script lang="ts">
	import GradientText from '$lib/components/GradientText.svelte';

	import { goto } from '$app/navigation';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	async function handleSignup() {
		const { data, error } = await supabase.auth.signInAnonymously();

		if (error) {
			console.error('Error signing up:', error.message);
		} else {
			console.log('User signed up successfully');
			goto('/s');
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="h1 font-bold"><GradientText>SUPAchan</GradientText></h1>
		<svg
			width="28.073565mm"
			height="29.097641mm"
			viewBox="0 0 28.073565 29.097641"
			version="1.1"
			id="svg5"
			xml:space="preserve"
			xmlns="http://www.w3.org/2000/svg"
			><defs id="defs2" /><g id="layer1" transform="translate(-44.672394,-82.768155)"
				><path
					style="fill:#30a46c;fill-opacity:1;stroke-width:0.264583"
					d="m 53.535936,111.56825 c -0.291042,-0.16057 -0.835983,-0.57621 -1.210981,-0.92363 -0.658994,-0.61053 -0.715023,-0.6178 -1.674012,-0.21711 -0.91779,0.38348 -1.063799,0.37894 -1.946945,-0.0605 -1.473627,-0.73328 -2.03841,-1.69439 -2.03841,-3.46884 0,-1.79121 0.864864,-3.49534 2.438315,-4.80448 1.043686,-0.86836 5.426391,-3.181973 6.027654,-3.181973 0.35772,0 0.841512,1.399073 1.55715,4.503113 0.6111,2.65061 0.778058,5.01886 0.441637,6.26447 -0.490953,1.81778 -2.146484,2.68781 -3.594408,1.88896 z m 11.641667,-1.23815 c -1.411281,-0.67456 -2.579476,-1.95025 -3.551002,-3.87777 -0.855863,-1.69804 -1.827182,-5.29334 -1.514533,-5.60599 0.642176,-0.64218 8.181484,-0.79716 10.162352,-0.20891 2.50343,0.74344 3.24011,2.82519 1.58391,4.47592 -0.47294,0.47139 -1.00691,0.90596 -1.1866,0.96573 -0.25174,0.0837 -0.25942,0.32759 -0.0335,1.06276 0.79091,2.57314 -2.602479,4.5544 -5.46068,3.18826 z M 62.035184,95.273686 c -0.307145,-1.050558 -0.685063,-3.63887 -0.849197,-5.816045 -0.235154,-3.119218 0.179487,-5.1134 1.250604,-6.014686 1.213423,-1.021028 2.189611,-0.894984 3.541923,0.457327 1.088644,1.088645 1.157156,1.116327 1.956059,0.79034 1.066143,-0.435031 1.896961,-0.214483 2.819527,0.748472 1.01484,1.059268 1.21396,3.364629 0.42431,4.912487 -1.06104,2.07981 -3.145197,3.524041 -6.813586,4.721523 -2.416743,0.788905 -2.163999,0.767144 -2.32964,0.200582 z M 47.132288,94.125794 c -1.278688,-0.307452 -2.459894,-1.519233 -2.459894,-2.523568 0,-0.958988 0.683484,-2.120466 1.548501,-2.631444 0.726026,-0.428874 0.741701,-0.479035 0.37771,-1.208672 -0.940262,-1.884799 0.846149,-3.93891 3.414208,-3.925842 3.017074,0.01535 5.408315,2.510172 6.950729,7.251803 0.497362,1.52897 0.598903,2.149928 0.374266,2.288762 -1.009671,0.624011 -8.45326,1.17028 -10.20552,0.748961 z"
					id="path302"
				/></g
			></svg
		>
		<p class="text-xl">
			Log in with <a
				class="anchor"
				href="https://supabase.com/docs/guides/auth/server-side-rendering
			">Supabase SSR Auth</a
			>
			as an
			<a class="anchor" href="https://supabase.com/docs/guides/auth/auth-anonymous"
				>anonymous user</a
			>
			to create and view posts in
			<a class="anchor" href="https://supabase.com/realtime">realtime.</a>
		</p>
		<form on:submit|preventDefault={handleSignup}>
			<button type="submit" class="btn variant-ghost-primary hover:variant-filled-primary"
				><span>Log in as anon</span><span
					><svg class="w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						><path
							d="M17.06 13c-1.86 0-3.42 1.33-3.82 3.1c-.95-.41-1.82-.3-2.48-.01C10.35 14.31 8.79 13 6.94 13C4.77 13 3 14.79 3 17s1.77 4 3.94 4c2.06 0 3.74-1.62 3.9-3.68c.34-.24 1.23-.69 2.32.02c.18 2.05 1.84 3.66 3.9 3.66c2.17 0 3.94-1.79 3.94-4s-1.77-4-3.94-4M6.94 19.86c-1.56 0-2.81-1.28-2.81-2.86s1.26-2.86 2.81-2.86c1.56 0 2.81 1.28 2.81 2.86s-1.25 2.86-2.81 2.86m10.12 0c-1.56 0-2.81-1.28-2.81-2.86s1.25-2.86 2.81-2.86s2.82 1.28 2.82 2.86s-1.27 2.86-2.82 2.86M22 10.5H2V12h20zm-6.47-7.87c-.22-.49-.78-.75-1.31-.58L12 2.79l-2.23-.74l-.05-.01c-.53-.15-1.09.13-1.29.64L6 9h12l-2.44-6.32z"
						/></svg
					></span
				></button
			>
		</form>
	</div>
</div>
