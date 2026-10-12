import { buildWorld } from "./world.js";
import {
  appendOwnershipEvent,
  cloneCampaign,
  computeFactionStats,
  currentOwner,
  formatNumber,
  validateCampaign
} from "./core.js";
import { renderHexMap } from "./map.js";

const world = buildWorld();
let publishedData;
let draftData;
let selectedId = null;
let dirty = false;

const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setStatus(message, type = "") {
  const element = $("#editor-status");
  element.textContent = message;
  element.className = type ? `status-${type}` : "";
}

function markDirty(message = "Unpublished changes are ready to export.") {
  dirty = true;
  setStatus(message);
}

function syncCampaignInputs() {
  $("#edit-week").value = draftData.campaign.week;
  $("#edit-phase").value = draftData.campaign.phase;
  $("#edit-points").value = draftData.campaign.pointsLimit;
}

function syncInputsToDraft() {
  draftData.campaign.week = Math.max(0, Number($("#edit-week").value || 0));
  draftData.campaign.phase = Number($("#edit-phase").value);
  draftData.campaign.pointsLimit = Number($("#edit-points").value);
}

function renderFactions() {
  $("#editor-factions").innerHTML = Object.entries(draftData.factions).map(([id, faction]) => `
    <div class="editor-faction-row" style="--faction-color:${escapeHtml(faction.color)}">
      <span class="editor-faction-swatch" aria-hidden="true"></span>
      <label>
        Alliance name
        <input type="text" data-faction-name="${id}" value="${escapeHtml(faction.name)}" maxlength="32">
      </label>
      <label>
        Total RP spent
        <input type="number" data-faction-spent="${id}" value="${Number(faction.rpSpent)}" min="0" step="1">
      </label>
    </div>
  `).join("");

  document.querySelectorAll("[data-faction-name]").forEach((input) => {
    input.addEventListener("input", (event) => {
      draftData.factions[event.target.dataset.factionName].name = event.target.value.trim() || event.target.dataset.factionName;
      markDirty();
      renderMap();
      renderSummary();
      renderTerritoryForm();
    });
  });

  document.querySelectorAll("[data-faction-spent]").forEach((input) => {
    input.addEventListener("input", (event) => {
      draftData.factions[event.target.dataset.factionSpent].rpSpent = Math.max(0, Number(event.target.value || 0));
      markDirty();
      renderSummary();
    });
  });
}

function renderMap() {
  renderHexMap($("#editor-map"), {
    territories: world,
    data: draftData,
    selectedId,
    onSelect(id) {
      selectedId = id;
      renderMap();
      renderTerritoryForm();
    }
  });
}

function renderTerritoryForm() {
  const territory = world.find((item) => item.id === selectedId);
  if (!territory) {
    $("#editor-territory-title").textContent = "Choose a territory";
    $("#editor-territory-form").className = "editor-empty";
    $("#editor-territory-form").textContent = "Click a hex on the map to change its owner.";
    return;
  }

  const owner = currentOwner(draftData, territory.id);
  const locked = Number(draftData.campaign.phase) < territory.lockedUntilPhase;
  const disabled = territory.headquartersFor || locked;
  const options = [
    ["neutral", "Neutral"],
    ...Object.entries(draftData.factions).map(([id, faction]) => [id, faction.name])
  ];

  $("#editor-territory-title").textContent = territory.name;
  $("#editor-territory-form").className = "";
  $("#editor-territory-form").innerHTML = `
    <div class="territory-editor-meta">
      <span class="tag">${territory.id}</span>
      <span class="tag">${escapeHtml(territory.label)}</span>
      <span class="tag">${territory.rpValue} RP/week</span>
      ${territory.strategic ? '<span class="tag">Strategic</span>' : ""}
    </div>
    <div class="territory-owner-form">
      <label>
        Controlling alliance
        <select id="territory-owner" ${disabled ? "disabled" : ""}>
          ${options.map(([id, name]) => `<option value="${id}" ${id === owner ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
        </select>
        <small>${territory.headquartersFor
          ? "Headquarters cannot be captured."
          : locked
            ? "The seven-hex core unlocks in Phase 3."
            : `A change recorded in week ${draftData.campaign.week} begins generating RP for the new owner in week ${Number(draftData.campaign.week) + 1}.`}</small>
      </label>
      <button class="button button-primary" id="apply-owner" type="button" ${disabled ? "disabled" : ""}>Apply control</button>
    </div>`;

  $("#apply-owner")?.addEventListener("click", () => {
    const nextOwner = $("#territory-owner").value;
    const captureWeek = Number(draftData.campaign.week);
    appendOwnershipEvent(draftData, territory.id, nextOwner, captureWeek);
    markDirty(`${territory.name} set to ${nextOwner === "neutral" ? "Neutral" : draftData.factions[nextOwner].name} in week ${captureWeek}.`);
    renderMap();
    renderSummary();
    renderTerritoryForm();
  });
}

function renderSummary() {
  const stats = computeFactionStats(draftData, world);
  $("#editor-summary").innerHTML = Object.entries(draftData.factions).map(([id, faction]) => `
    <article style="border-top:2px solid ${escapeHtml(faction.color)}">
      <span>${escapeHtml(faction.name)}</span>
      <strong>${stats[id].territories} hexes · ${stats[id].balance} RP</strong>
    </article>
  `).join("");
}

function renderAll() {
  syncCampaignInputs();
  renderFactions();
  renderMap();
  renderTerritoryForm();
  renderSummary();
}

function exportData() {
  syncInputsToDraft();
  const now = new Date();
  const localDate = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
  draftData.campaign.lastUpdated = localDate;

  const blob = new Blob([`${JSON.stringify(draftData, null, 2)}\n`], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "campaign.json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  dirty = false;
  setStatus("campaign.json downloaded. Replace data/campaign.json in the repository to publish it.", "success");
}

async function importData(file) {
  try {
    const parsed = JSON.parse(await file.text());
    const errors = validateCampaign(parsed);
    if (errors.length) throw new Error(errors.join(" "));
    draftData = cloneCampaign(parsed);
    selectedId = null;
    dirty = true;
    renderAll();
    setStatus(`${file.name} imported. Review it, then export the publishable file.`, "success");
  } catch (error) {
    setStatus(`Import failed: ${error.message}`, "error");
  }
}

function wireControls() {
  ["#edit-week", "#edit-phase", "#edit-points"].forEach((selector) => {
    $(selector).addEventListener("change", () => {
      syncInputsToDraft();
      markDirty();
      renderMap();
      renderSummary();
      renderTerritoryForm();
    });
  });

  $("#export-data").addEventListener("click", exportData);
  $("#import-data").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) importData(file);
    event.target.value = "";
  });
  $("#reset-data").addEventListener("click", () => {
    draftData = cloneCampaign(publishedData);
    selectedId = null;
    dirty = false;
    renderAll();
    setStatus("Published campaign data restored.");
  });

  window.addEventListener("beforeunload", (event) => {
    if (!dirty) return;
    event.preventDefault();
    event.returnValue = "";
  });
}

async function initialise() {
  try {
    const response = await fetch("data/campaign.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Campaign data returned ${response.status}.`);
    publishedData = await response.json();
    const errors = validateCampaign(publishedData);
    if (errors.length) throw new Error(errors.join(" "));

    draftData = cloneCampaign(publishedData);
    renderAll();
    wireControls();
    setStatus(`Loaded week ${draftData.campaign.week}, phase ${draftData.campaign.phase}, ${formatNumber(draftData.campaign.pointsLimit)} points.`);
  } catch (error) {
    document.querySelector("main").insertAdjacentHTML(
      "afterbegin",
      `<div class="loading-error"><strong>Campaign data could not be loaded.</strong><br>${escapeHtml(error.message)} Open the editor through a web server rather than directly from the file system.</div>`
    );
  }
}

initialise();
