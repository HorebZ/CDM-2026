<script lang="ts">
  let showPopup = $state(false);
  let hoverTimeout: ReturnType<typeof setTimeout> | null = null;
  let wrapper: HTMLDivElement | null = null;

  function clearHoverTimeout() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
  }

  function openPopup() {
    clearHoverTimeout();
    showPopup = true;
  }

  function handleMouseEnter() {
    clearHoverTimeout();
    hoverTimeout = setTimeout(() => {
      showPopup = true;
    }, 250);
  }

  function handleMouseLeave(event: MouseEvent) {
    if (wrapper?.contains(event.relatedTarget as Node)) {
      return;
    }

    clearHoverTimeout();
    hoverTimeout = setTimeout(() => {
      showPopup = false;
    }, 120);
  }

  function handleFocusIn() {
    openPopup();
  }

  function handleBlur(event: FocusEvent) {
    if (wrapper?.contains(event.relatedTarget as Node)) {
      return;
    }

    clearHoverTimeout();
    showPopup = false;
  }
</script>

<div
  bind:this={wrapper}
  class="site-info-wrapper"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="group"
>
  <button
    type="button"
    class="site-info-badge"
    aria-label="Informations sur le site"
    aria-expanded={showPopup}
    aria-controls="site-info-popup"
    onfocus={handleFocusIn}
    onblur={handleBlur}
  >
    <span>?</span>
  </button>

  {#if showPopup}
    <div
      id="site-info-popup"
      class="site-info-popup"
      role="tooltip"
      onmouseenter={openPopup}
      onmouseleave={handleMouseLeave}
    >
      <div class="site-info-content">
        <span class="site-info-title">A propos du site</span>

        <div class="site-info-item">
          <span class="site-info-label">Inspiration</span>
          <span class="site-info-value">Reproduction libre de l'infographie utilisé par
            <a href="https://www.youtube.com/@wiloo" target="_blank">Wiloo</a> dans ses vidéos youtube sur le mondiale 2026
          </span>
        </div>

        <div class="site-info-item">
          <span class="site-info-label">Développement</span>
          <span class="site-info-value">Site développé par <a href="https://github.com/HorebZ" target="_blank">Horebz</a></span>
        </div>

        <div class="site-info-item">
          <span class="site-info-label">Source de données</span>
          <span class="site-info-value"> Api Flagpedia :
            <a href="https://flagpedia.net/download/api" target="_blank">Embed country flag images over CDN (HTTP API) </a>
          </span>

          <span class="site-info-value"> Site offiiciel de la FIFA :
            <a href="https://www.fifa.com/fr/tournaments/mens/worldcup/canadamexicousa2026/articles/coupe-du-monde-2026-equipes-qualifiees" target="_blank">Coupe du Monde 2026 : Les équipes qualifiées</a>
          </span>

          <span class="site-info-value"> Wikipédia :
            <a href="https://fr.wikipedia.org/wiki/Apparition_des_%C3%A9quipes_dans_la_Coupe_du_monde_de_football" target="_blank">Apparition des équipes dans la Coupe du monde de football</a>
          </span>
        </div>
      </div>
    </div>
  {/if}
</div>
