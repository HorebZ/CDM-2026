<script lang="ts">
	import type { GroupId, MatchPhase } from '$lib/types/index.js';

	interface Props {
		phase: MatchPhase;
		group?: GroupId;
		userDate: string;
	}

	const { phase, group, userDate }: Props = $props();

	const PHASE_LABELS: Record<MatchPhase, string> = {
		group: 'Groupe',
		'round-of-16': '8e de finale',
		quarter: 'Quart',
		semi: 'Demi',
		'small-final': 'Petite finale',
		final: 'Finale'
	};
</script>

<div class="flex min-w-0 items-center gap-4 max-[800px]:flex-wrap max-[800px]:gap-y-2 max-[800px]:gap-x-[14px]">
	<div class="flex shrink-0 flex-col gap-[3px] max-[560px]:flex-row max-[560px]:items-baseline max-[560px]:gap-1.5">
		<div class="flex items-baseline gap-[5px]">
			<span
				class="text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--text-muted)]"
				class:text-[#ffd700]={phase === 'final'}
			>
				{PHASE_LABELS[phase]}
				{phase === 'group' ? group : ''}
			</span>
		</div>
		<div class="flex items-baseline gap-[5px]">
			<span
				class="text-[13px] font-bold tracking-[0.01em] text-[var(--text-primary)] max-[560px]:text-[10px]"
			>
				{userDate}
			</span>
		</div>
	</div>
</div>
