import { buildWorld } from "./world.js";
import {
  computeFactionStats,
  currentOwner,
  formatNumber,
  rankFactions,
  validateCampaign
} from "./core.js";
import { renderHexMap } from "./map.js";

const world = buildWorld();
let campaignData;
let selectedId = null;
let showOwnership = true;
let zoom = 100;

const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function ownerDisplay(owner) {
  if (owner === "neutral") {
    return { name: "Neutral", color: "#a4aaa5" };
  }
  return campaignData.factions[owner] ?? { name: owner, color: "#a4aaa5" };
}

function renderCampaignHeader() {
  const campaign = campaignData.campaign;
  $("#campaign-title").textContent = campaign.title;
  $("#campaign-subtitle").textContent = campaign.subtitle;
  $("#phase-value").textContent = campaign.phase;
  $("#week-value").textContent = campaign.week;
  $("#points-value").textContent = formatNumber(campaign.pointsLimit);
  $("#updated-value").textContent = `Record updated ${campaign.lastUpdated}`;
  document.title = campaign.title;

  document.querySelectorAll("[data-phase-card]").forEach((card) => {
    card.classList.toggle("is-current", Number(card.dataset.phaseCard) === Number(campaign.phase));
  });
}

function renderFactions() {
  const stats = computeFactionStats(campaignData, world);
  const ranking = rankFactions(stats);
  const rankById = Object.fromEntries(ranking.map((faction, index) => [faction.id, index + 1]));

  $("#faction-cards").innerHTML = Object.entries(campaignData.factions).map(([id, faction]) => {
    const factionStats = stats[id];
    const initial = escapeHtml(faction.name.trim().charAt(0).toUpperCase() || id.charAt(0).toUpperCase());
    return `
      <article class="faction-card" style="--faction-color:${escapeHtml(faction.color)}">
        <span class="faction-sigil" aria-hidden="true">${initial}</span>
        <h3>${escapeHtml(faction.name)}</h3>
        <span class="faction-rank">Strategic rank ${rankById[id]}</span>
        <div class="faction-metrics">
          <div><span>Territories</span><strong>${factionStats.territories}</strong></div>
          <div><span>Next income</span><strong>+${factionStats.weeklyIncome} RP</strong></div>
          <div><span>Treasury</span><strong>${factionStats.balance} RP</strong></div>
        </div>
      </article>`;
  }).join("");

  $("#map-legend").innerHTML = Object.entries(campaignData.factions).map(([, faction]) => `
    <span class="legend-item"><i class="legend-swatch" style="--swatch:${escapeHtml(faction.color)}"></i>${escapeHtml(faction.name)}</span>
  `).join("") + '<span class="legend-item"><i class="legend-swatch" style="--swatch:#8f9692"></i>Neutral</span>';
}

function renderMap() {
  renderHexMap($("#hex-map"), {
    territories: world,
    data: campaignData,
    selectedId,
    showOwnership,
    onSelect: selectTerritory
  });
}

function selectTerritory(id) {
  selectedId = id;
  renderMap();
  renderTerritoryPanel();

  if (window.innerWidth <= 1120) {
    $("#territory-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderTerritoryPanel() {
  const territory = world.find((item) => item.id === selectedId);
  if (!territory) return;

  const owner = currentOwner(campaignData, territory.id);
  const controller = ownerDisplay(owner);
  const locked = Number(campaignData.campaign.phase) < territory.lockedUntilPhase;
  const draftCost = territory.draftCost == null ? "—" : territory.draftCost;
  const strategicBlock = territory.strategicBonus
    ? `
      <section class="card-block bonus-block">
        <h4>Strategic location bonus</h4>
        <h5>${escapeHtml(territory.strategicBonus.title)}</h5>
        <p>${escapeHtml(territory.strategicBonus.effect)}</p>
      </section>`
    : "";
  const headquartersBlock = territory.headquartersFor
    ? `
      <section class="card-block bonus-block">
        <h4>Alliance headquarters</h4>
        <h5>Unbreakable Seat</h5>
        <p>This territory cannot be captured. It generates RP normally and serves as the origin of its alliance's supply line.</p>
      </section>`
    : "";
  const centreBlock = territory.centralObjective
    ? `
      <section class="card-block bonus-block">
        <h4>Campaign victory condition</h4>
        <h5>Hold the Centre</h5>
        <p>The two leading alliances contest this territory in the grand finale. The third alliance may intervene as a disruptor under terms agreed by the players.</p>
      </section>`
    : "";
  const defenceRingBlock = territory.defenceRole
    ? `
      <section class="card-block bonus-block">
        <h4>Central defence ring</h4>
        <h5>${escapeHtml(territory.defenceRole)}</h5>
        <p>${territory.defenceRole === "Annihilator Cannon"
          ? "One of three heavy emplacements guarding the six Phase 3 inner territories. Its controlling alliance gains the bombardment described under Victor bonus during the grand finale."
          : "One of nine fortified wall territories arranged as three arcs of three. Holding it opens a route toward the Phase 3 inner territories and grants the fortification described under Victor bonus during the grand finale."}</p>
      </section>`
    : "";
  const additionalSourceLinks = (territory.additionalSources ?? [])
    .map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">Open the ${escapeHtml(source.book)} inspiration ↗</a>`)
    .join("");
  const battleBlocks = territory.headquartersFor
    ? `
      <section class="card-block headquarters-safe-block">
        <h4>Battle status</h4>
        <h5>No mission assigned</h5>
        <p>Alliance headquarters cannot be challenged, assaulted or captured. This location therefore has no deployment, mission, war-zone rule or victor bonus.</p>
      </section>`
    : `
      <section class="card-block deployment-block">
        <h4>Deployment</h4>
        <h5>${escapeHtml(territory.deployment)}</h5>
        <figure class="deployment-map">
          <img
            class="deployment-map-image"
            src="${escapeHtml(territory.deploymentImage)}"
            alt="${escapeHtml(`${territory.missionTitle} deployment map from ${territory.sourceBook}`)}"
            loading="lazy"
          >
        </figure>
      </section>

      <section class="card-block objective-terrain-block">
        <h4>11th edition battlefield rule</h4>
        <h5>Objective Terrain</h5>
        <p>Unless this mission specifically uses a portable marker, each objective symbol on the deployment map identifies a location that must coincide with a suitable terrain area. That entire terrain area is the objective.</p>
        <ul class="terrain-objective-list">
          <li>A model is within range of a terrain objective while it is within that terrain area.</li>
          <li>Measure distances to or from an objective using the closest part of its terrain area.</li>
          <li>If no suitable terrain area covers a marked location, use a flat 40mm objective marker and the normal 3-inch horizontal and 5-inch vertical range.</li>
          <li>Deactivating an objective never removes the terrain feature. Place the stated status token within it and stop treating that terrain area as an objective.</li>
        </ul>
        <a href="https://assets.warhammer-community.com/eng_01-06_warhammer40k_new40k_core_rules-was6fbu1ix-hfewhmxyiy.pdf" target="_blank" rel="noreferrer">Read the official 11th-edition objective rules ↗</a>
      </section>

      <section class="card-block">
        <h4>Narrative mission</h4>
        <h5>${escapeHtml(territory.missionTitle)}</h5>
        <p class="mission-briefing">${escapeHtml(territory.briefing)}</p>
        <ul class="objective-list">
          ${territory.objectives.map((objective) => `<li>${escapeHtml(objective)}</li>`).join("")}
        </ul>
      </section>

      <section class="card-block">
        <h4>War zone rule</h4>
        <h5>${escapeHtml(territory.warzoneTitle)}</h5>
        <p>${escapeHtml(territory.warzone)}</p>
      </section>

      <section class="card-block victor-block">
        <h4>Victor bonus</h4>
        <h5>Spoils of Victory</h5>
        <p>${escapeHtml(territory.victorBonus)}</p>
      </section>

      <section class="card-block source-block">
        <h4>Mission source</h4>
        <h5>${escapeHtml(territory.sourceBook)} — ${escapeHtml(territory.sourceMission ?? territory.missionTitle)}</h5>
        <p>${escapeHtml(territory.sourceFit)}</p>
        <a href="${escapeHtml(territory.sourceUrl)}" target="_blank" rel="noreferrer">Open the ${escapeHtml(territory.sourceBook)} source rules ↗</a>
        ${additionalSourceLinks}
      </section>`;

  $("#territory-panel").innerHTML = `
    <article class="territory-card" style="--territory-accent:${escapeHtml(controller.color)}">
      <header class="territory-card-header">
        <div class="territory-kicker">
          <span>${territory.id} // Row ${territory.row + 1}</span>
          <span>${territory.headquartersFor ? "Non-assaultable stronghold" : `${escapeHtml(territory.inspiration)} adaptation`}</span>
        </div>
        <h3>${escapeHtml(territory.name)}</h3>
        <div class="territory-meta">
          <span class="tag tag-owner">${escapeHtml(controller.name)}</span>
          <span class="tag">${escapeHtml(territory.label)}</span>
          ${territory.strategic ? '<span class="tag">Strategic</span>' : ""}
          ${territory.defenceRole ? `<span class="tag">${escapeHtml(territory.defenceRole)}</span>` : ""}
          ${territory.headquartersFor ? '<span class="tag">Headquarters</span>' : ""}
          ${locked ? '<span class="tag">Locked until Phase 3</span>' : ""}
        </div>
      </header>

      <div class="territory-card-body">
        <div class="territory-value-grid">
          <div><span>Weekly yield</span><strong>${territory.rpValue} RP</strong></div>
          <div><span>Draft cost</span><strong>${draftCost}</strong></div>
          <div><span>Environment</span><strong>${escapeHtml(territory.icon)}</strong></div>
        </div>

        <section class="card-block">
          <h4>Location profile</h4>
          <p>${escapeHtml(territory.summary)}</p>
          ${locked ? '<p class="locked-message">The Dominatus core cannot be entered before Phase 3.</p>' : ""}
        </section>

        ${defenceRingBlock}
        ${strategicBlock}
        ${headquartersBlock}
        ${centreBlock}
        ${battleBlocks}
      </div>
    </article>`;
}

function updateZoom(nextZoom) {
  const viewport = $("#map-viewport");
  const canvas = $("#map-canvas");
  const oldWidth = canvas.getBoundingClientRect().width || viewport.clientWidth || 1;
  const focus = Math.max(0, Math.min(1, (viewport.scrollLeft + viewport.clientWidth / 2) / oldWidth));

  zoom = Math.max(60, Math.min(220, nextZoom));
  canvas.style.width = `${zoom}%`;
  $("#zoom-reset").textContent = `${zoom}%`;

  const recenter = () => {
    const newWidth = canvas.getBoundingClientRect().width;
    viewport.scrollLeft = Math.max(0, focus * newWidth - viewport.clientWidth / 2);
  };

  requestAnimationFrame(recenter);
  window.setTimeout(recenter, 200);
}

function wireControls() {
  $("#ownership-toggle").addEventListener("click", (event) => {
    showOwnership = !showOwnership;
    event.currentTarget.setAttribute("aria-pressed", String(showOwnership));
    event.currentTarget.textContent = `Ownership ${showOwnership ? "on" : "off"}`;
    renderMap();
  });

  $("#zoom-in").addEventListener("click", () => updateZoom(zoom + 25));
  $("#zoom-out").addEventListener("click", () => updateZoom(zoom - 25));
  $("#zoom-reset").addEventListener("click", () => updateZoom(100));
}

async function initialise() {
  try {
    const response = await fetch("data/campaign.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Campaign data returned ${response.status}.`);
    campaignData = await response.json();

    const errors = validateCampaign(campaignData);
    if (errors.length) throw new Error(errors.join(" "));

    renderCampaignHeader();
    renderFactions();
    renderMap();
    wireControls();
  } catch (error) {
    document.querySelector("main").insertAdjacentHTML(
      "afterbegin",
      `<div class="shell loading-error"><strong>Campaign data could not be loaded.</strong><br>${escapeHtml(error.message)} Open the site through a web server rather than directly from the file system.</div>`
    );
  }
}

initialise();
