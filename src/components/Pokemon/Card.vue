<template>
	<router-link
		:to="`/pokemons/${dataPokemon.name ?? dataPokemon.id}`"
		class="select-none min-h-[250px] bg-white p-3 rounded-xl md:w-52 lg-w-full w-full cursor-pointer border-[0.5px] border-semiblack group"
	>
		<div
			:class="`flex justify-center duration-150 bg-whitesmoke max-h-[200px]
				group-hover:background-${pokeType}`"
		>
			<img
				:src="
					dataPokemon.sprites.other.dream_world.front_default ??
					dataPokemon.sprites.front_default ??
					dataPokemon.sprites.other['official-artwork'].front_default
				"
				class="min-h-[200px] max-h-[200px] object-contain p-5"
				alt="{dataPokemon.name}"
			/>
		</div>
		<p class="text-[12px] leading-4 mt-1">#{{ id }}</p>
		<p class="text-base text-left truncate text-black font-semibold mt-2">
			{{ upperCaseFirstLetter(dataPokemon?.name) }}
		</p>
		<div class="mt-[5px]">
			<Badge
				v-for="(type, index) in dataPokemon.types"
				:key="index"
				:type="type.type.name"
			/>
		</div>
	</router-link>
</template>

<script>
import upperCaseFirstLetter from '@/utils/upperCaseFirstLetter'
import Badge from './Badge.vue'

export default {
	name: 'CardPokemon',
	props: ['data'],
	components: { Badge },
	setup(props) {
		const id = `${props.data.id}`

		return {
			id,
			dataPokemon: props.data,
			pokeType: props.data.types[0].type.name,
			upperCaseFirstLetter,
			Badge
		}
	}
}
</script>

<style></style>
