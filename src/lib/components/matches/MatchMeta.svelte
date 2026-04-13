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

<div class="match-meta">
	<div class="match-info">
		<div class="match-phase-line">
			<span class="match-type" class:match-type--final={phase === 'final'}>
				{PHASE_LABELS[phase]}
				{phase === 'group' ? group : ''}
			</span>
		</div>
		<div class="match-date-line">
			<span class="match-date-user">{userDate}</span>
		</div>
	</div>
</div>
