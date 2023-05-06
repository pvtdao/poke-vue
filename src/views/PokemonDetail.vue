<template>
	<div class="container mx-auto lg:p-0 md:px-3 px-2 mt-12 mb-10">
		<template v-if="loading">
			<h1 class="text-center text-[40px] font-bold pt-40">Loading....</h1>
		</template>
		<template v-else>
			<div class="flex flex-wrap items-center justify-center">
				<p class="font-semibold md:text-[22xp] text-[20px] text-center">
					{{ upperCaseFirstLetter(detail.name) }}
				</p>
				<p class="ml-5 md:text-[22xp] md:mt-0 mt-1 text-[20px] text-gray-600">
					#{{ `${detail?.id}` }}
				</p>
			</div>

			<div class="flex flex-col md:flex-row justify-center">
				<div
					class="flex flex-col md:min-w-[55%] md:max-w-[55%] slg:max-w-[50%] slg:min-w-[50%] lg:max-w-[40%] lg:min-w-[40%] w-full"
				>
					<div
						:class="`mt-5 border-[.1px] border-semiblack bg-whitesmoke min-h-[300px] w-full flex p-5 rounded`"
					>
						<div
							:class="`bg-no-repeat bg-center bg-contain  w-full`"
							:style="{ backgroundImage: `url(${imgSrc})` }"
						></div>
					</div>

					<div class="mt-5">
						<div
							class="bg-darkgray border-[.1px] border-semiblack min-h-[200px] min-w-[200px] rounded px-3 py-3"
						>
							<p class="text-[14px] font-semibold mb-2">Stats</p>
							<div
								class="grid grid-cols-[repeat(6, 1fr)] gap-2 justify-items-center auto-cols-fr grid-flow-col"
							>
								<StatCol
									v-for="(stat, index) in detail.stats"
									:statData="stat"
									:key="index"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex justify-center">
				<button
					@click="() => router.go(-1)"
					class="btn mt-10 text-[16px] text-black border-[1px] px-[12px] py-[6px] rounded border-black hover:text-white btn-black z-10 relative"
				>
					Back
				</button>
			</div>
		</template>
	</div>
</template>

<script>
import { inject, reactive, ref, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pokemonAPI } from '@/api/pokemonAPI'
import upperCaseFirstLetter from '@/utils/upperCaseFirstLetter'
import StatCol from '@/components/Pokemon/StatCol.vue'

export default {
	name: 'PokemonDetail',
	components: { StatCol },
	setup() {
		const route = useRoute()
		const router = useRouter()

		const loading = inject('loading')

		const name = ref(route.params.name)

		const p = reactive({
			detail: {},
			imgSrc: '',
			heightFeet: 0,
			weightLbs: 0
		})

		function setLoading(value) {
			loading.value = value
		}

		async function handleFetchDetail() {
			setLoading(true)

			try {
				const pokemon = await pokemonAPI.getDetail(name.value.toLowerCase())

				p.detail = pokemon.data
				p.imgSrc =
					p.detail?.sprites.other.dream_world.front_default ??
					p.detail?.sprites.front_default ??
					p.detail?.sprites.other['official-artwork'].front_default ??
					''

				p.weightLbs = p.detail?.weight
					? Math.round((p.detail?.weight * 0.220462 + 0.001) * 100) / 100
					: p.detail?.weight

				p.heightFeet = p.detail?.height
					? Math.round((p.detail?.height * 0.328084 + 0.001) * 100) / 100
					: p.detail?.height
			} catch (error) {
				console.log(error)
			}
			setLoading(false)
		}

		watch(
			() => route.params.name,
			async (newName) => {
				name.value = newName
				handleFetchDetail()
			},
			{
				immediate: true,
				deep: true
			}
		)

		return {
			loading,
			setLoading,
			...toRefs(p),
			name,
			upperCaseFirstLetter,
			router
		}
	}
}
</script>
