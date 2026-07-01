<script lang="ts">
	import type { GroupId, MatchPhase } from '$lib/types/index.js';

	interface Props {
		phase: MatchPhase;
		phaseLabel?: string;
		group?: GroupId;
		userDate: string;
		compactUserDate: string;
	}

	const { phase, phaseLabel, group, userDate, compactUserDate }: Props = $props();

	const PHASE_LABELS: Record<MatchPhase, string> = {
		group: 'Groupe',
		'round-of-32': '16e de finale',
		'round-of-16': '8e de finale',
		quarter: 'Quart',
		semi: 'Demi',
		'small-final': 'Petite finale',
		final: 'Finale'
	};

	const MOBILE_PHASE_LABELS: Record<MatchPhase, string> = {
		group: '',
		'round-of-32': '16e',
		'round-of-16': '8e',
		quarter: 'Quart',
		semi: 'Demi',
		'small-final': '3e',
		final: 'Finale'
	};

	const mobileLabel = $derived(group ?? MOBILE_PHASE_LABELS[phase]);
	const compactUserDateParts = $derived(compactUserDate.split(', '));
	const mobileDate = $derived(compactUserDateParts[0] ?? compactUserDate);
	const mobileTime = $derived(compactUserDateParts[1] ?? '');
</script>

<div class="flex min-w-0 items-center gap-4 max-[800px]:contents">
	<div class="flex shrink-0 flex-col gap-[3px] max-[800px]:contents">
		<span
			class={[
				'text-[11px] font-bold tracking-[0.06em] text-text-muted uppercase max-[800px]:hidden',
				phase === 'final' && 'text-gold'
			]}
		>
			{phaseLabel ?? PHASE_LABELS[phase]}
			{phase === 'group' ? group : ''}
		</span>

		<span
			class={[
				'hidden justify-self-end text-[11px] font-bold tracking-[0.06em] text-text-muted uppercase max-[800px]:col-start-3 max-[800px]:row-start-1 max-[800px]:inline-flex',
				phase === 'final' && 'text-gold'
			]}
		>
			{mobileLabel}
		</span>

		<span class="text-[13px] font-bold tracking-[0.01em] text-text-primary max-[800px]:hidden">
			{userDate}
		</span>

		<span
			class="hidden min-w-0 flex-col items-start justify-self-start text-left text-[12px] leading-[1.05] font-bold tracking-[0.01em] whitespace-nowrap text-text-primary max-[800px]:col-start-1 max-[800px]:row-start-1 max-[800px]:inline-flex"
		>
			<span>{mobileDate}</span>
			<span class="text-[11px] text-text-muted">{mobileTime}</span>
		</span>
	</div>
</div>
