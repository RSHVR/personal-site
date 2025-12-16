<script>
	import { Chat } from 'embeddable-chatbot';
</script>

<svelte:head>
	<title>Contact - Arshveer Gahir</title>
	<meta
		name="description"
		content="Chat with Veer about AI/ML projects, collaborations, and opportunities"
	/>
</svelte:head>

<Chat
	mode="container"
	videoSrc="/wave-background.mp4"
	videoPoster="/wave-background-poster.jpg"
	welcomeText="Hey! I'm Veer's AI assistant. What brings you here today? Looking to chat about a project, ask about my work, or book some time?"
	placeholder="Message Veer..."
	apiEndpoint="/api/chat"
	loadEndpoint="/api/chat/load"
/>
