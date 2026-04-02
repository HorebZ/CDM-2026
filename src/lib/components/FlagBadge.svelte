<script lang="ts">
  import type { Nation } from '$lib/types/index.js';
  import { getFlagUrl } from '$lib/config/site.js';

  interface Props {
    nation: Nation;
  }

  const { nation }: Props = $props();
</script>

<div class="flag-badge" class:is-active={nation.enabled} title={nation.name}>
  <img
    src={getFlagUrl(nation.code)}
    alt={nation.name}
    width={80}
    height={60}
    loading="lazy"
  />
</div>
