<script lang="ts">
</script>

<p
	class="via-accent animate-gradient-xy bg-gradient-to-tl from-primary-300 to-primary-500 bg-clip-text text-transparent"
>
	<slot />
</p>

<style>
	@keyframes gradient-xy {
		0%,
		100% {
			background-size: 400% 400%;
			background-position: left center;
		}
		50% {
			background-size: 200% 200%;
			background-position: right center;
		}
	}

	.animate-gradient-xy {
		animation: gradient-xy 5s ease infinite;
	}
</style>
