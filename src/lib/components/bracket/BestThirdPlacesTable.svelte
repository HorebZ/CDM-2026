<script lang="ts">
	import FlagImage from '../FlagImage.svelte';
	import { NATIONS } from '$lib/data/nations.js';
	import { getBestThirdPlaces } from '$lib/utils/group-standings.js';

	const thirdPlaces = getBestThirdPlaces();
</script>

<section class="mx-auto mt-14 w-[min(100%,var(--shell-width))]">
	<header class="mb-4">
		<h2 class="text-[15px] font-black tracking-[-0.01em] text-white uppercase">
			Meilleurs 3<sup class="text-[10px]">e</sup>
		</h2>
	</header>

	<div
		class="overflow-x-auto overscroll-x-contain rounded-[12px] border border-ring-subtle bg-surface-card/40"
	>
		<table class="w-full min-w-[560px] border-collapse text-left">
			<thead>
				<tr
					class="border-b border-ring-subtle text-[10px] font-bold tracking-[0.08em] text-text-muted uppercase"
				>
					<th class="px-3 py-2.5 font-bold" scope="col">Rang</th>
					<th class="px-3 py-2.5 font-bold" scope="col">Équipe</th>
					<th class="px-3 py-2.5 font-bold" scope="col">Gpe</th>
					<th class="px-2 py-2.5 text-center font-bold" scope="col">Pts</th>
					<th class="px-2 py-2.5 text-center font-bold" scope="col">V</th>
					<th class="px-2 py-2.5 text-center font-bold" scope="col">N</th>
					<th class="px-2 py-2.5 text-center font-bold" scope="col">D</th>
					<th class="px-2 py-2.5 text-center font-bold" scope="col">BP</th>
					<th class="px-2 py-2.5 text-center font-bold" scope="col">BC</th>
					<th class="px-2 py-2.5 text-center font-bold" scope="col">Diff</th>
				</tr>
			</thead>
			<tbody>
				{#each thirdPlaces as standing (standing.nationId)}
					{@const nation = NATIONS[standing.nationId]}
					<tr
						class={[
							'border-b border-ring-subtle/70 text-[12px] last:border-b-0',
							standing.isQualified ? 'bg-gold/[0.04]' : 'bg-transparent'
						]}
					>
						<td class="px-3 py-2.5 font-black text-text-primary tabular-nums">
							{standing.rank}
						</td>
						<td class="px-3 py-2.5">
							<div class="flex min-w-0 items-center gap-2">
								<FlagImage
									code={nation.code}
									alt=""
									small
									width={24}
									height={16}
									class="h-4 w-6 rounded-[2px] border"
								/>
								<span class="truncate font-semibold text-text-primary">
									{nation.name}
								</span>
							</div>
						</td>
						<td class="px-3 py-2.5 font-bold text-text-muted">{standing.group}</td>
						<td class="px-2 py-2.5 text-center font-black text-text-primary tabular-nums">
							{standing.points}
						</td>
						<td class="px-2 py-2.5 text-center font-medium text-text-muted tabular-nums">
							{standing.won}
						</td>
						<td class="px-2 py-2.5 text-center font-medium text-text-muted tabular-nums">
							{standing.drawn}
						</td>
						<td class="px-2 py-2.5 text-center font-medium text-text-muted tabular-nums">
							{standing.lost}
						</td>
						<td class="px-2 py-2.5 text-center font-medium text-text-muted tabular-nums">
							{standing.goalsFor}
						</td>
						<td class="px-2 py-2.5 text-center font-medium text-text-muted tabular-nums">
							{standing.goalsAgainst}
						</td>
						<td
							class={[
								'px-2 py-2.5 text-center font-semibold tabular-nums',
								standing.goalDifference > 0 && 'text-emerald-400',
								standing.goalDifference < 0 && 'text-rose-400',
								standing.goalDifference === 0 && 'text-text-muted'
							]}
						>
							{standing.goalDifference > 0
								? `+${standing.goalDifference}`
								: standing.goalDifference}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
