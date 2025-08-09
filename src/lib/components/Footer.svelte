<div class="footer">
	<div class="footer-content">
		<div class="social-links">
			<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.366C3.274 4.224 4.194 3.299 5.337 3.299C6.477 3.299 7.401 4.224 7.401 5.366C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="currentColor"/>
				</svg>
			</a>
			<a href="https://github.com" target="_blank" rel="noopener noreferrer">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9.025 23.126 9.025 22.81C9.025 22.524 9.015 21.749 9.01 20.902C5.672 21.619 4.967 19.301 4.967 19.301C4.421 17.896 3.634 17.525 3.634 17.525C2.545 16.785 3.717 16.8 3.717 16.8C4.922 16.883 5.555 18.042 5.555 18.042C6.625 19.832 8.364 19.296 9.05 18.991C9.158 18.213 9.467 17.677 9.81 17.38C7.145 17.08 4.344 16.039 4.344 11.426C4.344 10.109 4.809 9.036 5.579 8.193C5.455 7.893 5.044 6.662 5.696 5.003C5.696 5.003 6.704 4.681 8.995 6.242C9.954 5.979 10.98 5.848 12 5.844C13.02 5.848 14.047 5.979 15.006 6.242C17.297 4.681 18.303 5.003 18.303 5.003C18.956 6.662 18.545 7.893 18.421 8.193C19.191 9.036 19.654 10.109 19.654 11.426C19.654 16.05 16.849 17.077 14.177 17.371C14.607 17.745 14.991 18.481 14.991 19.602C14.991 21.231 14.976 22.546 14.976 22.81C14.976 23.129 15.191 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z" fill="currentColor"/>
				</svg>
			</a>
			<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M23.953 4.57C23.089 4.947 22.17 5.206 21.213 5.331C22.201 4.731 22.97 3.789 23.337 2.664C22.415 3.223 21.395 3.622 20.315 3.834C19.436 2.899 18.202 2.325 16.831 2.325C14.203 2.325 12.072 4.456 12.072 7.085C12.072 7.456 12.115 7.817 12.198 8.166C8.064 7.969 4.395 6.083 1.792 3.159C1.385 3.902 1.155 4.731 1.155 5.614C1.155 7.298 1.998 8.789 3.306 9.658C2.516 9.634 1.774 9.423 1.115 9.067C1.115 9.084 1.115 9.101 1.115 9.118C1.115 11.434 2.728 13.364 4.895 13.799C4.501 13.904 4.088 13.959 3.664 13.959C3.364 13.959 3.075 13.93 2.792 13.875C3.38 15.773 5.102 17.165 7.145 17.202C5.544 18.485 3.516 19.243 1.316 19.243C0.935 19.243 0.559 19.222 0.186 19.181C2.257 20.536 4.73 21.313 7.403 21.313C16.82 21.313 21.982 14.034 21.982 7.634C21.982 7.43 21.977 7.227 21.968 7.025C22.905 6.344 23.738 5.495 24.4 4.529C23.535 4.905 22.607 5.161 21.637 5.279C22.639 4.677 23.405 3.736 23.77 2.621L23.953 4.57Z" fill="currentColor"/>
				</svg>
			</a>
		</div>
	</div>
</div>

<style>
	.footer {
		width: 100%;
		height: 60px; /* Fixed height */
		background: transparent;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative; /* Ensure footer maintains its position */
		z-index: 1; /* Ensure footer stays above content */
	}

	.footer-content {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 5px 0;
		box-sizing: border-box;
	}

	.social-links {
		display: flex;
		gap: 20px;
		align-items: center;
	}

	.social-links a {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #2a2a2a;
		transition: color 0.3s ease;
	}

	.social-links a:hover {
		color: #666666;
	}

	/* Responsive adjustments */
	@media (max-width: 480px) {
		.social-links {
			gap: 15px;
		}
	}
</style>
