<template>
	<div class="container mx-auto mt-20 lg:p-0 md:px-3 px-2 mb-10">
		<p class="w-full text-center font-bold text-3xl mb-2">Pokémon</p>

		<template v-if="loading"
			><h1 class="text-center text-[40px] font-bold pt-40">Loading....</h1>
		</template>
		<template v-else>
			<div
				class="mt-10 gap-4 slg:grid-cols-4 lg:grid-cols-6 md:grid-cols-3 grid-cols-1 mx-auto grid content-center justify-items-center"
			>
				<template v-if="listPokemonDetail.length">
					<CardPokemon
						v-for="pokemon in listPokemonDetail"
						:key="pokemon.id"
						:data="pokemon"
					/>
				</template>
			</div>

			<div class="flex items-center justify-between mt-10">
				<template v-if="canPrevious">
					<button
						@click="handlePrevious"
						class="btn text-[16px] text-black border-[1px] px-[12px] py-[6px] rounded border-black hover:text-white btn-black z-10 relative"
					>
						Previous
					</button>
				</template>
				<template v-else>
					<button
						class="text-[16px] text-gray-600 border-[1px] px-[12px] py-[6px] rounded border-gray-600 cursor-default"
					>
						Previous
					</button>
				</template>

				<div class="flex items-center text-[20px] select-none">
					<template v-if="page">
						<p>{{ page }}</p>
					</template>
					<template v-else>
						<p>1</p>
					</template>
					/
					<p>{{ totalPage }}</p>
				</div>

				<template v-if="canNext">
					<button
						@click="handleNext"
						class="btn text-[16px] text-black border-[1px] px-[12px] py-[6px] rounded border-black hover:text-white btn-black z-10 relative"
					>
						Next
					</button>
				</template>
				<template v-else>
					<button
						class="text-[16px] text-gray-600 border-[1px] px-[12px] py-[6px] rounded border-gray-600 cursor-default"
					>
						Next
					</button>
				</template>
			</div>
		</template>
	</div>
</template>

<script>
import { ref, reactive, inject, watch, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pokemonAPI } from '@/api/pokemonAPI'
import CardPokemon from '@/components/Pokemon/Card.vue'

export default {
	name: 'PokemonView',
	components: { CardPokemon },
	setup() {
		const route = useRoute()
		const router = useRouter()

		const loading = inject('loading')

		const offset = ref(0)
		const page = ref(route.query.page)
		const canNext = ref(true)
		const canPrevious = ref(true)

		const p = reactive({ list: [], listPokemonDetail: [] })

		const totalPage = Math.ceil(1126 / 20)

		async function fetchListPokemon() {
			if (page.value) offset.value = (+page.value - 1) * 20
			try {
				const rs = await pokemonAPI.getByOffsetLimit(20, offset.value)
				p.list = rs.data.results
			} catch (error) {
				console.log(error)
			}
		}

		async function getListById() {
			const listDetail = []
			try {
				for (const elm of p.list) {
					const res = pokemonAPI.getDetail(elm.name)
					listDetail.push(res)
				}
				const result = await Promise.all(listDetail)
				const newPokeList = result.map((item) => {
					return item.data
				})
				p.listPokemonDetail = newPokeList
			} catch (error) {
				console.log(error)
			}
		}

		function setLoading(value) {
			loading.value = value
		}

		function handleNext() {
			if (page.value === null) router.push('/pokemons?page=2')
			else router.push(`/pokemons?page=${+page.value + 1}`)
		}

		function handlePrevious() {
			if (page.value !== null) router.push(`/pokemons?page=${+page.value - 1}`)
		}

		watch(
			() => route.query.page,
			async (newPage) => {
				page.value = newPage || 1
				setLoading(true)
				await fetchListPokemon()
				await getListById()
				setLoading(false)

				if (+newPage <= 1) canPrevious.value = false
				else if (newPage === totalPage) canNext.value = false
			},
			{
				immediate: true,
				deep: true
			}
		)

		return {
			loading,
			...toRefs(p),
			fetchListPokemon,
			page,
			canNext,
			canPrevious,
			totalPage,
			handleNext,
			handlePrevious,
			setLoading
		}
	}
}
</script>

<style></style>
