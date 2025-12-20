<script lang="ts">
	import { Tsuji } from 'tsuji';
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/>
	<title>Tsuji - Translation</title>
</svelte:head>

<div class="flex h-screen items-center justify-center bg-stone-100">
	<Tsuji
		apiEndpoint="/api/translate"
		height="100%"
		maxWidth="28rem"
		defaultLanguage="Japanese"
	/>
</div>
