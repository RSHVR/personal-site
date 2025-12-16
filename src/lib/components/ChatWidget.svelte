<script>
	import { tick } from 'svelte';

	let { messages = [] } = $props();
	let messagesContainer = $state();

	$effect(() => {
		// Watch for message changes and scroll to bottom
		if (messages.length && messagesContainer) {
			tick().then(() => {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			});
		}
	});
</script>

<div class="chat-widget">
	<div class="messages-container" bind:this={messagesContainer}>
		<div class="messages-list">
			{#each messages as message}
				<div class="message {message.sender}">
					<div class="bubble">{message.text}</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.chat-widget {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		padding: 24px;
		box-sizing: border-box;
	}

	.messages-container {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.messages-list {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding-right: 8px;
	}

	.messages-container::-webkit-scrollbar {
		width: 6px;
	}

	.messages-container::-webkit-scrollbar-track {
		background: transparent;
	}

	.messages-container::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 3px;
	}

	.message {
		display: flex;
		max-width: 80%;
	}

	.message.bot {
		align-self: flex-start;
	}

	.message.user {
		align-self: flex-end;
	}

	.bubble {
		padding: 12px 16px;
		border-radius: 18px;
		font-size: 16px;
		line-height: 1.4;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
	}

	.message.bot .bubble {
		background: #E5E5EA;
		color: #000000;
		border-bottom-left-radius: 4px;
	}

	.message.user .bubble {
		background: #007AFF;
		color: #FFFFFF;
		border-bottom-right-radius: 4px;
	}

	/* Responsive */
	@media (max-width: 480px) {
		.chat-widget {
			padding: 16px;
		}

		.message {
			max-width: 85%;
		}

		.bubble {
			font-size: 15px;
			padding: 10px 14px;
		}
	}
</style>
