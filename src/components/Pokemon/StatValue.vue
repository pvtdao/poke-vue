<template>
	<div
		:class="`w-full
		min-h-[10px]
		border-[.1px]
		background-${statName.toLowerCase()}
		border-semiblack
		mt-1`"
	></div>
</template>

<script>
export default {
	name: 'StatValue',
	props: ['statName'],
	setup(props) {
		return {
			name: props.statName
		}
	}
}
</script>

<style></style>
