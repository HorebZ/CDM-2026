<script lang="ts">
	interface Props {
		stadiumName: string;
		countryCode: string;
		stadiumLocalTime: string;
		flagUrl: string;
	}

	const { stadiumName, countryCode, stadiumLocalTime, flagUrl }: Props = $props();
</script>

<div class="match-location">
	<div class="match-stadium">
		<span class="stadium-name">{stadiumName}</span>
		<img
			class="stadium-flag"
			src={flagUrl}
			alt={countryCode}
			width={28}
			height={18}
			loading="lazy"
		/>
	</div>
	<span class="match-date-stadium">({stadiumLocalTime} heure locale)</span>
</div>
