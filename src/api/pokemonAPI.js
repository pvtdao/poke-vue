import axiosClient from './axiosClient'

const basePokemon = '/pokemon'

export const pokemonAPI = {
	getByOffsetLimit(limit = 0, offset = 0) {
		const url = `${basePokemon}/`
		return axiosClient.get(url, {
			params: {
				offset,
				limit
			}
		})
	},

	getDetail(id) {
		const url = `${basePokemon}/${id}/`

		return axiosClient.get(url)
	},

	getDetailSpecies(id) {
		const url = `${basePokemon}-species/${id}/`

		return axiosClient.get(url)
	}
}
