<template>
	<span
		:class="`background-${type} text-${color} rounded border-semiblack select-none`"
		:style="{
			padding: '3px 5px',
			marginRight: '6px',
			borderWidth: '1px'
		}"
	>
		{{ upperCaseFirstLetter(type) }}
	</span>
</template>

<script>
import upperCaseFirstLetter from '@/utils/upperCaseFirstLetter'
export default {
	name: 'BadgeType',
	props: ['type'],
	setup(props) {
		let color = 'black'
		if (
			props.type === 'dark' ||
			props.type === 'psychic' ||
			props.type === 'bug' ||
			props.type === 'water' ||
			props.type === 'rock' ||
			props.type === 'ground' ||
			props.type === 'fighting' ||
			props.type === 'ghost' ||
			props.type === 'dragon' ||
			props.type === 'steel'
		) {
			color = 'white'
		}

		return {
			color,
			badgeType: props.type,
			upperCaseFirstLetter
		}
	}
}
</script>

<style></style>
