<template>
	<div class="min-w-full max-w-full flex flex-col col-span-1">
		<div>
			<StatValue
				v-for="(_, index) in statNonColor"
				:key="index"
				statName="white"
			/>
			<StatValue
				v-for="(_, index) in statColor"
				:key="index"
				:statName="statName"
			/>
		</div>

		<p
			class="text-center xs:text-[8px] md:text-[12px] sm:text-[10px] max-w-full font-bold break-words mt-2 overflow-hidden"
		>
			{{ statName.includes('-') ? statName.replace('-', ' ') : statName }}
		</p>
	</div>
</template>

<script>
import upperCaseFirstLetter from '@/utils/upperCaseFirstLetter'
import countCol from '@/utils/countCol'
import StatValue from './StatValue.vue'

export default {
	name: 'StatCol',
	props: ['statData'],
	components: {
		StatValue
	},
	setup(props) {
		const cpnProps = props
		const statData = cpnProps.statData
		const stat = statData.stat

		const statName = upperCaseFirstLetter(stat.name)
		const statValue = cpnProps.statData.base_stat
		const numberCol = countCol(statValue)

		return {
			statNonColor: Array.from(new Array(15 - numberCol)),
			statColor: Array.from(new Array(numberCol)),
			statName,
			numberCol
		}
	}
}
</script>

<style></style>
