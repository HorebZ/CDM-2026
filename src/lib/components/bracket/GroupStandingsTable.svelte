<script lang="ts">
	import { getFlagUrlSmall } from '$lib/config/site.js';
	import { NATIONS } from '$lib/data/nations.js';
	import { getGroupStandingsWithQualification } from '$lib/utils/group-standings.js';
	import type { GroupId } from '$lib/types/index.js';

	interface Props {
		groupId: GroupId;
	}

	let { groupId }: Props = $props();

	const standings = $derived(getGroupStandingsWithQualification(groupId));
</script>

<div
	class="h-full min-w-0 overflow-hidden rounded-[10px] border border-ring-subtle bg-surface-card/40"
>
	<table class="w-full table-fixed border-collapse text-left">
		<caption
			class="border-b border-ring-subtle px-3 py-2 text-left text-[11px] font-black tracking-[0.06em] text-white uppercase"
		>
			Poule {groupId}
		</caption>
		<colgroup>
			<col class="w-[4%]" />
			<col class="w-1/2" />
			<col class="w-[8%]" />
			<col class="w-[6%]" />
			<col class="w-[6%]" />
			<col class="w-[6%]" />
			<col class="w-[7%]" />
			<col class="w-[7%]" />
			<col class="w-[6%]" />
		</colgroup>
		<thead>
			<tr
				class="border-b border-ring-subtle text-[9px] font-bold tracking-[0.08em] text-text-muted uppercase"
			>
				<th class="w-5 px-2 py-2 font-bold" scope="col"><span class="sr-only">Qualif.</span></th>
				<th class="px-2 py-2 font-bold" scope="col">Équipe</th>
				<th class="px-1.5 py-2 text-center font-bold" scope="col">Pts</th>
				<th class="px-1 py-2 text-center font-bold" scope="col">V</th>
				<th class="px-1 py-2 text-center font-bold" scope="col">N</th>
				<th class="px-1 py-2 text-center font-bold" scope="col">D</th>
				<th class="px-1 py-2 text-center font-bold" scope="col">BP</th>
				<th class="px-1 py-2 text-center font-bold" scope="col">BC</th>
				<th class="px-1.5 py-2 text-center font-bold" scope="col">Diff</th>
			</tr>
		</thead>
		<tbody>
			{#each standings as standing (standing.nationId)}
				{@const nation = NATIONS[standing.nationId]}
				<tr class="border-b border-ring-subtle/70 text-[11px] last:border-b-0">
					<td class="px-2 py-2 text-center">
						<span
							class={[
								'text-[10px] leading-none',
								standing.isQualified ? 'text-emerald-400' : 'text-rose-400'
							]}
							aria-label={standing.isQualified ? 'Qualifié' : 'Éliminé'}
							title={standing.isQualified ? 'Qualifié' : 'Éliminé'}
						>
							▸
						</span>
					</td>
					<td class="max-w-0 px-2 py-2">
						<div class="flex min-w-0 items-center gap-1.5 overflow-hidden">
							<img
								class="h-3.5 w-[21px] shrink-0 rounded-[2px] border border-ring-medium object-cover"
								src={getFlagUrlSmall(nation.code)}
								alt=""
								width={21}
								height={14}
								loading="lazy"
								decoding="async"
							/>
							<span
								class="min-w-0 flex-1 truncate font-semibold text-text-primary"
								title={nation.name}
							>
								{nation.name}
							</span>
						</div>
					</td>
					<td class="px-1.5 py-2 text-center font-black text-text-primary tabular-nums">
						{standing.points}
					</td>
					<td class="px-1 py-2 text-center font-medium text-text-muted tabular-nums">
						{standing.won}
					</td>
					<td class="px-1 py-2 text-center font-medium text-text-muted tabular-nums">
						{standing.drawn}
					</td>
					<td class="px-1 py-2 text-center font-medium text-text-muted tabular-nums">
						{standing.lost}
					</td>
					<td class="px-1 py-2 text-center font-medium text-text-muted tabular-nums">
						{standing.goalsFor}
					</td>
					<td class="px-1 py-2 text-center font-medium text-text-muted tabular-nums">
						{standing.goalsAgainst}
					</td>
					<td
						class={[
							'px-1.5 py-2 text-center font-semibold tabular-nums',
							standing.goalDifference > 0 && 'text-emerald-400',
							standing.goalDifference < 0 && 'text-rose-400',
							standing.goalDifference === 0 && 'text-text-muted'
						]}
					>
						{standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
