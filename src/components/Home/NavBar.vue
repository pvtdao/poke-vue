<template>
	<nav
		class="menu flex items-center justify-between container mt-1 mx-auto lg:p-0 md:p-0 px-2"
	>
		<router-link to="/">
			<img alt="Logo" class="md:w-full lg:w-full w-[80%]" :src="logo" />
		</router-link>
		<ul>
			<div class="hidden lg:flex w-full justify-center items-center">
				<li
					v-for="item in menu"
					:key="item.name"
					class="mt-4 lg:px-3 text-[1.2rem] md:text-[1rem]"
				>
					<router-link :to="item.url">
						{{ item.name }}
					</router-link>
				</li>
			</div>
		</ul>
	</nav>
</template>

<script>
import logo from '@/assets/images/logo.png'
import { menu } from '@/data/menu'

export default {
	setup() {
		return {
			logo,
			menu
		}
	}
}
</script>

<style>
.menu a.router-link-exact-active {
	color: #7293d6;
}
</style>
