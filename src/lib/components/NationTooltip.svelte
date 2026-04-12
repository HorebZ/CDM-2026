<script lang="ts">
	import type { Nation } from '$lib/types/index.js';
	import { getFlagUrl } from '$lib/config/site.js';

	interface Props {
		nation: Nation;
	}

	const { nation }: Props = $props();
</script>

<div class="flag-tooltip" role="tooltip">
	<div class="tooltip-flag">
		<img src={getFlagUrl(nation.code)} alt="" width={48} height={36} />
	</div>
	<div class="tooltip-content">
		<span class="tooltip-name">{nation.name}</span>
		<span class="tooltip-details">{nation.confederation} · Groupe {nation.group}</span>
		<span class="tooltip-details"
			>{nation.participation} participation{nation.participation > 1 ? 's' : ''}</span
		>
	</div>
</div>
