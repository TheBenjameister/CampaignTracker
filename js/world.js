import { missionForTerritory } from "./missions.js";

const TILE_NAMES = [
  "The Crown of Cinders",
  "Mourning Peaks",
  "Galehold Bastion",
  "The Ember Rift",
  "Pilgrim's Scar",
  "Saint Varro Heights",
  "Gallows Canyon",
  "The Ashen Steps",
  "Mirewatch",
  "The Drowned Relay",
  "Basilisk Chasm",
  "Furnace Road",
  "The Shatterplain",
  "Verdigris Delta",
  "Blackwater Piers",
  "Cinder Gate",
  "The Iron Processional",
  "Obsidian Rampart",
  "Terminus Approach",
  "Saltgrave Causeway",
  "The Hollow Signal",
  "Red Sands Muster",
  "Ossuary Highway",
  "Western Breach",
  "The Dominatus Engine",
  "Eastern Breach",
  "Pilgrim's Ruin",
  "The Ninefold Locks",
  "Ashfall Anchorage",
  "The Vox-Dead Ward",
  "Saintless Hab-Stacks",
  "The Sunken Arsenal",
  "The Last Redoubt",
  "Mourning Foundries",
  "The Pale Floodplain",
  "Wreckers' Coast",
  "Severance Fields",
  "The Iron Orchard",
  "Gorgon Manufactorum",
  "The Cinder Basilica",
  "Dead Man's Circuit",
  "Redoubt Kappa",
  "Acheron Transit",
  "Sump-Sea Bastion",
  "Widow's Reach",
  "Forgeheart Bastion",
  "The Glassed Aerodrome",
  "The Broken Aqueduct",
  "Sepulchre Yards",
  "Meridian Hive",
  "Titanfall Grave",
  "Terminus Spaceport",
  "The Kraken Shoals",
  "Drowned Batteries",
  "Stormbreak Fortress"
];

const TERRAIN = {
  mountain: {
    label: "Mountain pass",
    icon: "△",
    summary: "Knife-edged ridges and collapsed pilgrimage roads turn every advance into a fight for the high ground.",
    deployment: "Clashing ridgelines",
    deploymentKey: "diagonal",
    mission: "Break the High Line",
    objectives: [
      "Control the summit objective at the end of each battle round.",
      "Score for clearing enemy units from two separate high-ground sectors.",
      "A unit can Survey the Pass instead of shooting to mark a safe route."
    ],
    warzoneTitle: "Thin Air, Long Falls",
    warzone: "Advance rolls through the central ridge are reduced by 1. Units ending an Advance there must take a Battle-shock test."
  },
  fortress: {
    label: "Fortress complex",
    icon: "▰",
    summary: "Layered bastions, buried magazines and overlapping fire corridors protect a command site of planetary importance.",
    deployment: "Besieger and garrison",
    deploymentKey: "siege",
    mission: "The Gate Must Hold",
    objectives: [
      "The attacker scores for breaching the inner perimeter.",
      "The defender scores for each intact bastion objective.",
      "Both sides score for destroying an enemy unit within the fortress."
    ],
    warzoneTitle: "Prepared Positions",
    warzone: "Infantry wholly within a terrain feature improve their cover save by 1 against ranged attacks, to a maximum of 3+."
  },
  canyon: {
    label: "Canyon wastes",
    icon: "≋",
    summary: "Vast fissures divide the battlefield into killing corridors where artillery echoes for kilometres.",
    deployment: "Narrow front",
    deploymentKey: "longways",
    mission: "Through the Killing Ground",
    objectives: [
      "Score for controlling the two pass objectives simultaneously.",
      "Score when a unit exits through the enemy battlefield edge.",
      "Destroying a Vehicle or Monster near a canyon wall earns bonus VP."
    ],
    warzoneTitle: "Rockfall",
    warzone: "After a unit ends a move beside the canyon edge, make one Hazard roll for it. Flying units are exempt."
  },
  volcanic: {
    label: "Volcanic rift",
    icon: "⌁",
    summary: "Unstable shelves of black rock hang above rivers of fire and fields of half-cooled glass.",
    deployment: "Fractured realm",
    deploymentKey: "quarters",
    mission: "Fire Beneath",
    objectives: [
      "Secure thermal regulator objectives to suppress eruptions.",
      "Score for holding more safe ground than the opponent.",
      "A unit can Vent Pressure to move the active hazard zone."
    ],
    warzoneTitle: "Seismic Cascade",
    warzone: "At the end of each battle round, randomly select one unregulated objective. Units within range make a Hazard roll."
  },
  ash: {
    label: "Ash wastes",
    icon: "·",
    summary: "A horizon of dust, wreckage and static storms offers little shelter and fewer landmarks.",
    deployment: "Sweeping engagement",
    deploymentKey: "diagonal",
    mission: "Claim the Dead Ground",
    objectives: [
      "Score for controlling objectives outside your own territory.",
      "Recover two operation markers from the central waste.",
      "Score if no enemy unit remains wholly within your deployment zone."
    ],
    warzoneTitle: "Choking Dust",
    warzone: "Models more than 24 inches apart are not visible to one another. Smoke units reduce that distance to 18 inches."
  },
  trench: {
    label: "Trench network",
    icon: "╪",
    summary: "Successive defence lines, mine belts and shattered dugouts mark years of attritional warfare.",
    deployment: "Opposed battle lines",
    deploymentKey: "frontal",
    mission: "No Step Back",
    objectives: [
      "Score for each defence-line objective held at the end of your Command phase.",
      "Score when an enemy-held objective is captured.",
      "The first unit to cross the centre line each round earns bonus VP."
    ],
    warzoneTitle: "Interlocking Defences",
    warzone: "Infantry that Remain Stationary gain a 5+ invulnerable save against ranged attacks until their next Movement phase."
  },
  urban: {
    label: "Ruined hive",
    icon: "▥",
    summary: "Collapsed hab-blocks and transit spires create a vertical labyrinth of ambush sites and fortified plazas.",
    deployment: "Urban quadrants",
    deploymentKey: "quarters",
    mission: "Cut the Head",
    objectives: [
      "Designate one command-post objective in enemy territory.",
      "Score for controlling connected districts leading to that command post.",
      "Destroying a Character within a ruin earns bonus VP."
    ],
    warzoneTitle: "Street Fighting",
    warzone: "Units wholly within ruins can start an Action after Advancing. Mounted and Vehicle units cannot use this benefit."
  },
  industrial: {
    label: "Manufactorum",
    icon: "⚙",
    summary: "Refineries, conveyor trenches and dormant macro-forges fill the air with chemical haze and machine thunder.",
    deployment: "Crossed supply lines",
    deploymentKey: "cross",
    mission: "Sabotage the Engines",
    objectives: [
      "Plant operation markers on two industrial objectives.",
      "Score for holding the primary generator at the battlefield centre.",
      "Remove a planted marker to Overload a Reactor for bonus VP."
    ],
    warzoneTitle: "Unstable Machinery",
    warzone: "A unit completing an Action on an industrial objective may gain 2VP; if it does, make one Hazard roll for that unit."
  },
  marsh: {
    label: "Toxic wetlands",
    icon: "≈",
    summary: "Flooded ruins and luminous chemical marshes swallow armour while half-drowned relay towers pierce the mist.",
    deployment: "Islands in the mire",
    deploymentKey: "islands",
    mission: "Signal Through the Mire",
    objectives: [
      "Activate relay objectives in ascending numerical order.",
      "Score for maintaining an unbroken chain to your deployment zone.",
      "Deny the enemy's most recently activated relay for bonus VP."
    ],
    warzoneTitle: "Corrosive Mire",
    warzone: "Non-Infantry units that Advance must make a Hazard roll. Infantry units subtract 1 inch from Advance moves instead."
  },
  coast: {
    label: "Blasted coast",
    icon: "≋",
    summary: "Broken sea walls, drowned batteries and rusting landers line a coast lashed by toxic surf.",
    deployment: "Beachhead",
    deploymentKey: "beachhead",
    mission: "Storm the Strand",
    objectives: [
      "The attacker scores for securing inland beachhead objectives.",
      "The defender scores for controlling the coastal batteries.",
      "Units arriving from Strategic Reserves can recover landing beacons."
    ],
    warzoneTitle: "Incoming Tide",
    warzone: "From battle round three onward, the coastal sector is hazardous terrain and its objective is worth 2 additional VP."
  },
  spaceport: {
    label: "Ruined spaceport",
    icon: "✦",
    summary: "Launch aprons and wrecked voidcraft form open fire lanes around hangars filled with dwindling supplies.",
    deployment: "Runway assault",
    deploymentKey: "longways",
    mission: "Last Flight Out",
    objectives: [
      "Secure fuel, guidance and cargo objectives in any order.",
      "A unit carrying supplies can Extract from the far battlefield edge.",
      "Destroying an enemy Transport earns bonus VP."
    ],
    warzoneTitle: "Surgical Insertion",
    warzone: "Once per battle, one Strategic Reserves unit gains Deep Strike for its next ingress move, then makes two Hazard rolls."
  },
  crater: {
    label: "Crater fields",
    icon: "○",
    summary: "Overlapping blast craters conceal wreckage, unexploded ordnance and relics from forgotten offensives.",
    deployment: "Scattered enclaves",
    deploymentKey: "enclave",
    mission: "Relics in the Dust",
    objectives: [
      "Search crater objectives to reveal one hidden prize.",
      "Score for carrying the prize while controlling an objective.",
      "Destroying the enemy prize-bearer earns bonus VP."
    ],
    warzoneTitle: "Unexploded Ordnance",
    warzone: "The first time each unit enters a crater, roll one D6. On a 1 it suffers D3 mortal wounds; on a 6 it gains 1VP."
  },
  core: {
    label: "Dominatus core",
    icon: "◆",
    summary: "The sealed heart of the war zone surrounds a planet-breaking command engine and the road to final victory.",
    deployment: "Final convergence",
    deploymentKey: "encircled",
    mission: "The Road to Dominatus",
    objectives: [
      "Control approach objectives to open the central vault.",
      "Score for destroying enemy units within the core perimeter.",
      "The central objective only becomes active after two approaches are secured."
    ],
    warzoneTitle: "Cataclysmic Crossfire",
    warzone: "At the end of each battle round, every unit within range of the central objective makes a Hazard roll."
  }
};

const CORE_IDS = new Set(["T18", "T19", "T24", "T25", "T26", "T32", "T33"]);
const WALL_IDS = new Set(["T12", "T14", "T17", "T20", "T23", "T27", "T40", "T41", "T42"]);
const CANNON_IDS = new Set(["T13", "T31", "T34"]);
const DEFENCE_RING_IDS = new Set([...WALL_IDS, ...CANNON_IDS]);
const STRATEGIC_IDS = ["T07", "T10", "T12", "T14", "T16", "T21", "T29", "T36", "T39", "T43", "T49", "T52"];

const DEFENCE_RING_NAMES = {
  T12: "Northwestern Curtain",
  T13: "Crownfire Battery",
  T14: "Northeastern Curtain",
  T17: "Pilgrim Wall",
  T20: "Furnace Wall",
  T23: "Western Bulwark",
  T27: "Eastern Bulwark",
  T31: "Grief Battery",
  T34: "Wrath Battery",
  T40: "Southwestern Curtain",
  T41: "Southern Gatehouse",
  T42: "Southeastern Curtain"
};

const STRATEGIC_BONUSES = [
  ["Veteran Redoubt", "When a player in the controlling alliance draws Battle Skill cards, draw one additional card before choosing one to keep."],
  ["Munitions Vaults", "When a player in the controlling alliance draws Relic cards, draw one additional card before choosing one to keep."],
  ["Hall of Triumphs", "When a player in the controlling alliance draws Battle Honour cards, draw one additional card before choosing one to keep."],
  ["Forward Foundry", "Character Enhancements purchased by the controlling alliance cost 5 fewer RP, to a minimum cost of 5 RP."],
  ["Logistics Nexus", "The first roster swap purchased by the controlling alliance each phase costs 10 fewer RP."],
  ["Orbital Relay", "Once per battle, a player in the controlling alliance can use Rapid Ingress for 0CP."],
  ["Surveyor Array", "After deployment is revealed, a player in the controlling alliance can redeploy one unit or place it into Strategic Reserves."],
  ["Field Apothecarion", "Once per battle, after a Character model fails a save, a player in the controlling alliance can change the Damage of that attack to 0."],
  ["Hidden Supply Route", "One Battleline unit in each army from the controlling alliance gains Scouts 6 inches."],
  ["Command Vox", "Once per battle round, a player in the controlling alliance can re-roll one Battle-shock test."],
  ["Salvage Charter", "At the end of a battle won by the controlling alliance, gain 1 bonus RP for its treasury."],
  ["Tactical Archive", "Once per battle, a player in the controlling alliance can discard one Tactical Mission and draw a replacement for 0CP."]
];

const HQ = {
  T01: "alpha",
  T46: "beta",
  T55: "gamma"
};

// Terrain assignments follow the illustrated Hexton Hills campaign map, with
// the central defence ring and inner-city tiles treated as bespoke locations.
const TERRAIN_BY_TILE = [
  "fortress",
  "canyon", "mountain",
  "volcanic", "mountain", "marsh",
  "volcanic", "canyon", "urban", "coast",
  "volcanic", "canyon", "trench", "urban", "coast",
  "volcanic", "ash", "core", "core", "industrial", "coast",
  "canyon", "trench", "urban", "core", "core", "urban", "coast",
  "ash", "spaceport", "trench", "core", "core", "industrial", "crater", "coast",
  "spaceport", "ash", "trench", "industrial", "crater", "urban", "coast", "coast", "coast",
  "fortress", "spaceport", "ash", "trench", "industrial", "crater", "urban", "coast", "marsh", "fortress"
];

function territoryId(index) {
  return `T${String(index + 1).padStart(2, "0")}`;
}

function terrainFor(id, index) {
  if (CORE_IDS.has(id)) return "core";
  if (DEFENCE_RING_IDS.has(id)) return "fortress";
  if (HQ[id]) return "fortress";
  return TERRAIN_BY_TILE[index];
}

export function buildWorld() {
  const territories = [];
  let index = 0;

  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col <= row; col += 1) {
      const id = territoryId(index);
      const terrainId = terrainFor(id, index);
      const terrain = TERRAIN[terrainId];
      const name = DEFENCE_RING_NAMES[id] ?? TILE_NAMES[index];
      const strategicIndex = STRATEGIC_IDS.indexOf(id);
      const isCore = CORE_IDS.has(id);
      const isCentre = id === "T25";
      const headquartersFor = HQ[id] ?? null;
      const strategicBonus = strategicIndex >= 0
        ? { title: STRATEGIC_BONUSES[strategicIndex][0], effect: STRATEGIC_BONUSES[strategicIndex][1] }
        : null;
      // Headquarters are permanent safe territories, not battlefields. Keeping
      // them mission-free prevents the UI and data from implying they can be
      // challenged or assaulted.
      const assignedMission = headquartersFor
        ? null
        : missionForTerritory(index, name, terrain.label);

      territories.push({
        id,
        index,
        row,
        col,
        q: col,
        r: row - col,
        name,
        terrainId,
        ...terrain,
        ...(assignedMission ?? {}),
        inspiration: assignedMission?.sourceBook ?? "Alliance stronghold",
        strategic: Boolean(strategicBonus),
        strategicBonus,
        defenceRole: CANNON_IDS.has(id) ? "Annihilator Cannon" : WALL_IDS.has(id) ? "Curtain wall" : null,
        headquartersFor,
        capturable: !headquartersFor,
        lockedUntilPhase: isCore ? 3 : 1,
        centralObjective: isCentre,
        rpValue: isCentre ? 5 : isCore || headquartersFor ? 3 : strategicBonus ? 2 : 1,
        draftCost: headquartersFor || isCore ? null : strategicBonus ? 2 : 1
      });

      index += 1;
    }
  }

  return territories;
}

export const WORLD_META = {
  territoryCount: 55,
  coreIds: [...CORE_IDS],
  wallIds: [...WALL_IDS],
  cannonIds: [...CANNON_IDS],
  defenceRingIds: [...DEFENCE_RING_IDS],
  strategicIds: [...STRATEGIC_IDS],
  headquarters: { ...HQ }
};
