<template>
	<div
		class="font-mono text-13 overflow-x-hidden min-h-screen overflow-y-auto pt-2 bg-yellow-200 from-yellow-200 via-yellow-200 to-yellow-300"
	>
		<div>
			<NavBar />
			<div class="mt-10">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '@/components/Home/NavBar.vue'
import { provide, ref } from 'vue'
export default {
	components: {
		NavBar
	},
	setup() {
		const loading = ref(false)
		provide('loading', loading)
	}
}
</script>
