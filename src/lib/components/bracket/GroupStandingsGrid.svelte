<script lang="ts">
	import GroupStandingsTable from '$lib/components/bracket/GroupStandingsTable.svelte';
	import { GROUP_IDS } from '$lib/utils/group-standings.js';
</script>

<section class="mx-auto mt-14 w-[min(100%,var(--shell-width))]">
	<header class="mb-4">
		<h2 class="text-[15px] font-black tracking-[-0.01em] text-white uppercase">Poules</h2>
	</header>

	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-stretch sm:gap-4">
		{#each GROUP_IDS as groupId (groupId)}
			<div class="min-w-0">
				<GroupStandingsTable {groupId} />
			</div>
		{/each}
	</div>
</section>
