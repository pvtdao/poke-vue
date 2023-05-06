<template>
	<div
		class="hero relative min-h-[80vh] bg-center bg-cover bg-fixed h-full w-full group"
	>
		<div class="hidden group-hover:block transition-all">
			<router-link
				to="/pokemons"
				class="z-10 bg-white/10 absolute px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl py-4 text-white border-2 tracking-wide border-white hover:bg-white hover:text-black transition-all"
			>
				Explore
			</router-link>
			<div class="absolute w-full h-full bg-black/40"></div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'HomeView'
}
</script>

<style scoped>
.hero {
	background-image: url('/src/assets/images/Every-Legendary-Pokemon-Wallpapers.jpg');
}
</style>
