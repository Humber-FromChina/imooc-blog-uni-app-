<template>
	<my-login @onLoginSuccess="onLoginSuccess"></my-login>
</template>

<script>
	export default {
		methods: {
			onLoginSuccess() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss"></style>
