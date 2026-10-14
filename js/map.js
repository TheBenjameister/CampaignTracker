import { currentOwner } from "./core.js";

const SVG_NS = "http://www.w3.org/2000/svg";
const HEX_SIZE = 46;
const MAP_WIDTH = 1200;
const MAP_HEIGHT = 820;

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}

function hexCentre(territory) {
  const row = territory.row;
  const x = MAP_WIDTH / 2 + (2 * territory.col - row) * Math.sqrt(3) * HEX_SIZE / 2;
  const y = 67 + row * HEX_SIZE * 1.5;
  return { x, y };
}

function polygonPoints(cx, cy, size) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 180) * (60 * index - 90);
    return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`;
  }).join(" ");
}

export function renderHexMap(container, {
  territories,
  data,
  selectedId = null,
  showOwnership = true,
  onSelect = () => {}
}) {
  const svg = svgElement("svg", {
    viewBox: `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`,
    class: "territory-map",
    role: "group",
    "aria-label": "Triangular campaign territory map"
  });

  const phase = Number(data.campaign.phase);

  for (const territory of territories) {
    const { x, y } = hexCentre(territory);
    const owner = currentOwner(data, territory.id);
    const locked = phase < territory.lockedUntilPhase;
    const faction = data.factions[owner];
    const group = svgElement("g", {
      class: [
        "territory-hex",
        `terrain-${territory.terrainId}`,
        owner !== "neutral" ? `owner-${owner}` : "owner-neutral",
        locked ? "is-locked" : "",
        territory.headquartersFor ? "is-headquarters" : "",
        territory.strategic ? "is-strategic" : "",
        territory.defenceRole === "Curtain wall" ? "is-wall" : "",
        territory.defenceRole === "Annihilator Cannon" ? "is-cannon" : "",
        territory.centralObjective ? "is-centre" : "",
        selectedId === territory.id ? "is-selected" : ""
      ].filter(Boolean).join(" "),
      tabindex: "0",
      role: "button",
      "aria-label": `${territory.name}, ${locked ? "locked until phase 3" : owner === "neutral" ? "neutral" : `controlled by ${faction?.name ?? owner}`}`,
      "data-territory-id": territory.id,
      style: `--owner-color:${showOwnership && faction ? faction.color : "rgba(255,255,255,.08)"}`
    });

    group.append(
      svgElement("polygon", {
        points: polygonPoints(x, y, HEX_SIZE - 1),
        class: "hex-fill"
      }),
      svgElement("polygon", {
        points: polygonPoints(x, y, HEX_SIZE - 1),
        class: "hex-outline"
      })
    );

    const label = svgElement("text", {
      x,
      y: y + 5,
      class: "hex-label",
      "text-anchor": "middle"
    });
    label.textContent = locked
      ? "LOCK"
      : territory.headquartersFor
        ? "HQ"
        : territory.defenceRole === "Annihilator Cannon"
          ? `C${territory.id.slice(1)}`
          : territory.defenceRole === "Curtain wall"
            ? `W${territory.id.slice(1)}`
        : territory.strategic
          ? "◆"
          : territory.id.slice(1);
    group.append(label);

    const title = svgElement("title");
    title.textContent = `${territory.name} · ${territory.label} · ${territory.rpValue} RP/week`;
    group.append(title);

    const activate = () => onSelect(territory.id);
    group.addEventListener("click", activate);
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });

    svg.append(group);
  }

  container.replaceChildren(svg);
  return svg;
}

const DEPLOYMENTS = {
  frontal: [
    '<rect x="7" y="7" width="226" height="42" rx="6" class="zone zone-a"/>',
    '<rect x="7" y="111" width="226" height="42" rx="6" class="zone zone-b"/>'
  ],
  longways: [
    '<rect x="7" y="7" width="50" height="146" rx="6" class="zone zone-a"/>',
    '<rect x="183" y="7" width="50" height="146" rx="6" class="zone zone-b"/>'
  ],
  diagonal: [
    '<polygon points="7,7 112,7 7,112" class="zone zone-a"/>',
    '<polygon points="233,153 128,153 233,48" class="zone zone-b"/>'
  ],
  quarters: [
    '<path d="M7 7h85v45H52v40H7z" class="zone zone-a"/>',
    '<path d="M233 153h-85v-45h40V68h45z" class="zone zone-b"/>'
  ],
  siege: [
    '<path d="M7 7h226v28H35v90h198v28H7z" class="zone zone-a"/>',
    '<rect x="81" y="52" width="78" height="56" rx="10" class="zone zone-b"/>'
  ],
  cross: [
    '<path d="M7 7h76l30 48-30 48H7z" class="zone zone-a"/>',
    '<path d="M233 153h-76l-30-48 30-48h76z" class="zone zone-b"/>'
  ],
  islands: [
    '<path d="M7 7h96l-20 45H7z" class="zone zone-a"/>',
    '<path d="M233 153h-96l20-45h76z" class="zone zone-b"/>'
  ],
  beachhead: [
    '<path d="M7 7h226v30c-55 20-171-12-226 18z" class="zone zone-a"/>',
    '<path d="M7 153h226v-30c-55-20-171 12-226-18z" class="zone zone-b"/>'
  ],
  enclave: [
    '<path d="M7 7h226v25H32v96h201v25H7z" class="zone zone-a"/>',
    '<circle cx="120" cy="80" r="34" class="zone zone-b"/>'
  ],
  encircled: [
    '<path d="M7 7h226v146H7z M73 33h94v94H73z" class="zone zone-a" fill-rule="evenodd"/>',
    '<polygon points="120,38 162,80 120,122 78,80" class="zone zone-b"/>'
  ]
};

export function deploymentDiagram(key = "frontal") {
  const zones = DEPLOYMENTS[key] ?? DEPLOYMENTS.frontal;
  const objectives = [
    [120, 80], [68, 80], [172, 80], [120, 33], [120, 127]
  ].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="4" class="objective-dot"/>`).join("");

  return `
    <svg class="deployment-map" viewBox="0 0 240 160" role="img" aria-label="Deployment zone diagram">
      <rect x="3" y="3" width="234" height="154" rx="10" class="battlefield"/>
      ${zones.join("")}
      <path d="M120 7v146M7 80h226" class="centre-lines"/>
      ${objectives}
    </svg>`;
}
