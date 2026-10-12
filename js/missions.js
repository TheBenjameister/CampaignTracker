const SOURCES = {
  armageddon: {
    book: "Armageddon",
    url: "https://wahapedia.ru/wh40k11ed/the-rules/armageddon/"
  },
  pariah: {
    book: "Pariah Nexus",
    url: "https://wahapedia.ru/wh40k11ed/the-rules/pariah-nexus/"
  },
  nachmund: {
    book: "Nachmund Gauntlet",
    url: "https://wahapedia.ru/wh40k11ed/the-rules/nachmund-gauntlet/"
  },
  dominatus: {
    book: "Dominatus",
    url: "https://wahapedia.ru/wh40k11ed/the-rules/dominatus/"
  }
};

function mission({ id, title, source, image, deployment, briefing, objectives, warzoneTitle, warzone, victorBonus, fit }) {
  return {
    id,
    title,
    sourceBook: SOURCES[source].book,
    sourceUrl: SOURCES[source].url,
    deploymentImage: `assets/deployments/${image}`,
    deployment,
    briefing,
    objectives,
    warzoneTitle,
    warzone,
    victorBonus,
    fit
  };
}

export const MISSION_LIBRARY = [
  mission({
    id: "arm-total-domination",
    title: "Total Domination",
    source: "armageddon",
    image: "TotalDomination.png",
    deployment: "Interlocking fronts",
    briefing: "Seize the no-man's-land objectives, then break the enemy line and hold ground inside their deployment zone.",
    objectives: [
      "At the end of each Command phase, score 5VP for each objective you control in no man's land (maximum 10VP).",
      "Score 10VP instead if you control the objective in your opponent's deployment zone.",
      "The battle lasts five rounds; primary scoring is capped at 50VP."
    ],
    warzoneTitle: "Folded Space",
    warzone: "The first time each round a unit Advances, it can pass through one ruin or rocky terrain feature, but must finish wholly outside it and takes a Hazard roll.",
    victorBonus: "The winner draws one additional Battle Honour card for a unit that ended the battle in enemy territory, then keeps the normal number.",
    fit: "Its layered battle lines reward taking and holding open, contested ground."
  }),
  mission({
    id: "arm-empyric-distortion",
    title: "Empyric Distortion",
    source: "armageddon",
    image: "EmpyricDistortion.png",
    deployment: "Reality-split front",
    briefing: "A wall of empyric interference cuts the field in two. Commanders must hold relays on both sides of the distortion.",
    objectives: [
      "Score 5VP for controlling one or more objectives, and 5VP more for controlling more than your opponent.",
      "Score 5VP if you control at least one objective on each side of the distortion line.",
      "Once per battle round, score 2VP when you capture an objective you did not control at the start of the round."
    ],
    warzoneTitle: "Distortion Wall",
    warzone: "Models cannot draw line of sight through the marked central distortion line. A unit crossing it makes a Battle-shock test after moving.",
    victorBonus: "The winning alliance adds 3 RP to its treasury at the next weekly update.",
    fit: "The divided layout turns broken ground and unstable rifts into a tactical obstacle."
  }),
  mission({
    id: "arm-metamorphosis",
    title: "Metamorphosis",
    source: "armageddon",
    image: "Metamorphosis.png",
    deployment: "Collapsing objectives",
    briefing: "The battlefield is changing beneath the armies. Valuable sites vanish one by one as the war zone transforms.",
    objectives: [
      "Score 5VP for each objective you control at the end of your Command phase (maximum 15VP).",
      "After scoring in rounds two to four, the player going second removes one no-man's-land objective they do not control.",
      "From round four onward, each remaining no-man's-land objective is worth 5VP more."
    ],
    warzoneTitle: "Living Battlefield",
    warzone: "When an objective is removed, units within range immediately make a Hazard roll, then the surrounding terrain becomes hazardous ground.",
    victorBonus: "One participating Character may purchase its next Enhancement for 5 fewer RP, to a minimum of 5 RP.",
    fit: "Its disappearing objectives suit land being broken apart by volcanic or tectonic change."
  }),
  mission({
    id: "arm-lighting-path",
    title: "Lighting the Path",
    source: "armageddon",
    image: "LightingThePath.png",
    deployment: "Signal corridor",
    briefing: "Advance through hostile ground and ignite a chain of signal beacons before the enemy can smother it.",
    objectives: [
      "Score 5VP for controlling one or more objectives and 5VP for controlling more than your opponent.",
      "An Infantry unit can begin Light the Beacon at the end of its Movement phase while within range of a neutral objective; complete it at the end of your turn for 5VP.",
      "A beacon already lit by the enemy can be extinguished by completing the same action."
    ],
    warzoneTitle: "Unbound Threats",
    warzone: "At the start of battle rounds three and five, the player with fewer lit beacons can move one neutral hazard marker up to 8 inches.",
    victorBonus: "The winner gains 2 RP; if it lit at least three beacons, it also wins ties for the next territory challenge it declares.",
    fit: "Its relay-chain objective naturally belongs among coasts, marshes and isolated communications sites."
  }),
  mission({
    id: "arm-temporal-flux",
    title: "Temporal Flux",
    source: "armageddon",
    image: "TemporalFlux.png",
    deployment: "Alternating fronts",
    briefing: "Objectives phase in and out of the present. Armies must anticipate where the battle will become real next.",
    objectives: [
      "Label alternating objectives A and B. A objectives are active in rounds one, three and five; B objectives are active in rounds two and four.",
      "At the end of each Command phase, score 5VP for each active objective you control (maximum 15VP).",
      "Score 5VP at the end of the battle if you control both objectives nearest the centre."
    ],
    warzoneTitle: "Out of Time",
    warzone: "Units wholly within range of an inactive objective cannot be targeted from more than 18 inches away, but cannot perform mission actions.",
    victorBonus: "The winner may reroll one Battle Honour draw earned from this battle.",
    fit: "Its shifting lanes make a hazardous pass or unstable frontier feel unpredictable without extra bookkeeping."
  }),
  mission({
    id: "arm-offering-blood",
    title: "Offering of Blood",
    source: "armageddon",
    image: "OfferingOfBlood.png",
    deployment: "Ritual grounds",
    briefing: "The centre is a sacrificial nexus. Control it long enough to complete the rite—or deny the enemy the blood it demands.",
    objectives: [
      "Score 5VP for controlling one or more objectives and 5VP for controlling more than your opponent.",
      "A non-Battle-shocked unit on the central objective can begin the Offering action; it completes at the end of your next Command phase for 10VP.",
      "If that unit is destroyed before completion, its opponent scores 5VP."
    ],
    warzoneTitle: "The Ground Hungers",
    warzone: "Each time a unit is destroyed within range of the central objective, improve the Objective Control of models there by 1 until the end of the round.",
    victorBonus: "The winning player marks one additional participating unit for a Battle Honour draw.",
    fit: "Its central ritual suits cratered killing fields and sites saturated by old massacres."
  }),
  mission({
    id: "arm-fighting-gravity",
    title: "Fighting Gravity",
    source: "armageddon",
    image: "FightingGravity.png",
    deployment: "Inverted strongpoints",
    briefing: "Gravity surges around the objectives, alternately pinning warriors down and hurling them across the battlefield.",
    objectives: [
      "At the start of each round, alternate which diagonal pair of no-man's-land objectives is stable.",
      "Score 5VP for each stable objective and 3VP for each unstable objective you control (maximum 15VP per round).",
      "At battle's end, score 5VP if you control more objectives outside your deployment zone."
    ],
    warzoneTitle: "Gravitic Reversal",
    warzone: "Units near unstable objectives add 2 inches to vertical movement but subtract 2 inches from Advance and Charge rolls.",
    victorBonus: "The winner may draw its next Battle Honour from either the Battle Skill or Weapon Modification category.",
    fit: "Its punishing movement puzzle belongs on steep ridges and gravity-torn high ground."
  }),
  mission({
    id: "arm-seal-rifts",
    title: "Seal the Rifts",
    source: "armageddon",
    image: "SealTheRifts.png",
    deployment: "Rift containment",
    briefing: "Reality tears open at the objective sites. Armies race to close the breaches while fighting for the surviving ground.",
    objectives: [
      "An Infantry or Beast unit can begin Seal the Rift on a no-man's-land objective it controls; complete it at the end of your turn and remove that objective.",
      "Score 10VP for sealing a rift in no man's land, or 15VP for one in enemy territory.",
      "Score 5VP for each unsealed objective you control at the end of your Command phase (maximum 10VP)."
    ],
    warzoneTitle: "Reality Backlash",
    warzone: "When a rift is sealed, every unit within 6 inches makes one Hazard roll; the sealing unit may reroll its result.",
    victorBonus: "The winning alliance gains 3 RP. If it sealed three or more rifts, its first roster swap before the next battle costs 5 fewer RP.",
    fit: "A containment mission is ideal for the sealed approaches to the Dominatus core."
  }),
  mission({
    id: "arm-brazen-bridge",
    title: "Brazen Bridge",
    source: "armageddon",
    image: "BrazenBridge.png",
    deployment: "Bridgehead siege",
    briefing: "The attacker must force a defended crossing and establish a bridgehead before the garrison can collapse the approach.",
    objectives: [
      "The attacker scores 5VP for each bridge objective controlled at the end of their Command phase.",
      "The defender scores 5VP for each bridge objective they control and 5VP if no enemy unit is wholly within the inner perimeter.",
      "At battle's end, the attacker scores 15VP for controlling the far bridgehead; otherwise the defender scores 15VP."
    ],
    warzoneTitle: "Murder Lanes",
    warzone: "Units on the marked bridge lanes cannot receive the Benefit of Cover. Infantry on a bridge objective gain Steadfast while not Battle-shocked.",
    victorBonus: "The victor's alliance gains 2 RP and may choose who has first turn in its next battle fought on this territory.",
    fit: "Its defended crossing is a natural match for a fortress gate or fortified causeway."
  }),
  mission({
    id: "arm-blood-shadow",
    title: "Blood and Shadow",
    source: "armageddon",
    image: "BloodAndShadow.png",
    deployment: "Hidden rift assault",
    briefing: "The defender protects shadowed breaches while the attacker hunts them through dead ground and seals them under fire.",
    objectives: [
      "The attacker scores 10VP each time it completes Seal the Breach on one of the three rift objectives.",
      "The defender scores 5VP for each unsealed rift controlled at the end of their Command phase (maximum 15VP).",
      "At battle's end, score 10VP if you control the central objective."
    ],
    warzoneTitle: "Living Shadows",
    warzone: "Outside 12 inches, models wholly within the marked shadow sectors cannot be selected as ranged targets unless they are the closest eligible target.",
    victorBonus: "The winner may redeploy one unit after both armies deploy in its next battle on an adjacent territory.",
    fit: "Its stealthy breach hunt suits the concealed corridors around a ruined inner city."
  }),
  mission({
    id: "arm-breakout",
    title: "Breakout",
    source: "armageddon",
    image: "Breakout.png",
    deployment: "Encirclement",
    briefing: "A trapped force must punch through the cordon while the encircling army closes every escape route.",
    objectives: [
      "The defender scores 5VP for each unit that exits from the attacker's battlefield edge (maximum 30VP).",
      "The attacker scores 5VP for each destroyed enemy unit and 5VP for controlling the central objective (maximum 30VP combined).",
      "At battle's end, each side scores 10VP if it controls more objectives than its opponent."
    ],
    warzoneTitle: "Closing Cordon",
    warzone: "From round three onward, units arriving from Strategic Reserves cannot enter within 12 inches of the defender's battlefield edge.",
    victorBonus: "The winner's first roster swap before its next battle costs 5 fewer RP.",
    fit: "Its long escape corridor fits canyon mouths, evacuation routes and blockaded spaceports."
  }),
  mission({
    id: "arm-trail-blood",
    title: "Trail of Blood",
    source: "armageddon",
    image: "TrailOfBlood.png",
    deployment: "Urban manhunt",
    briefing: "Both armies hunt a wounded operative whose signal flickers between ruined districts.",
    objectives: [
      "Search an objective by completing the Signal Sweep action; after the third search, place the Agent marker there.",
      "Score 5VP each Command phase while you control the Agent marker, and 10VP if its carrier ends the battle in your deployment zone.",
      "Score 5VP the first time you destroy the enemy unit carrying the Agent."
    ],
    warzoneTitle: "Feral Pursuers",
    warzone: "At the start of round three, place two neutral threat markers in unoccupied ruins. Units ending nearby make a Battle-shock test.",
    victorBonus: "The next unit added to the winning alliance's active roster begins with one Battle Honour draw available after its first battle.",
    fit: "A moving manhunt uses dense urban blocks as hiding places and ambush lanes."
  }),
  mission({
    id: "arm-temporal-raid",
    title: "Temporal Raid",
    source: "armageddon",
    image: "TemporalRaid.png",
    deployment: "Mobile objectives",
    briefing: "Chronal anchors can be dragged out of the war zone before they vanish. Every objective becomes cargo.",
    objectives: [
      "A unit controlling an objective can move it up to 6 inches at the end of its Movement phase, but cannot Advance or Charge that turn.",
      "Score 5VP for each objective wholly within your territory at the end of your Command phase (maximum 15VP).",
      "Remove and score 10VP for each objective moved wholly into your deployment zone."
    ],
    warzoneTitle: "Chronal Drag",
    warzone: "Units moving an objective subtract 1 from Hit rolls until the start of their next turn.",
    victorBonus: "The winning alliance gains 3 RP; if it extracted two objectives, one adjacent neutral tile costs 1 fewer draft point in any later catch-up draft.",
    fit: "Its movable anchors evoke salvage hauled through tides, floodplains and broken causeways."
  }),
  mission({
    id: "arm-veil-worlds",
    title: "Veil Between Worlds",
    source: "armageddon",
    image: "VeilBetweenWorlds.png",
    deployment: "Empyric pressure front",
    briefing: "One army tries to thin the veil while the other stabilises it, forcing both sides to manipulate the same unstable sites.",
    objectives: [
      "Each no-man's-land objective begins at Veil level 3. The attacker can complete Rend the Veil to reduce a level; the defender can complete Reinforce to increase it.",
      "At each Command phase, the attacker scores 5VP per objective at level 1; the defender scores 5VP per objective at level 5.",
      "Both players score 5VP for controlling the central objective, regardless of its Veil level."
    ],
    warzoneTitle: "Thinning Reality",
    warzone: "When an objective reaches level 1 or 5, units within range make a Battle-shock test and attacks there gain Ignores Cover until round end.",
    victorBonus: "The winning alliance gains 2 RP and may reroll one post-battle Battle Honour draw.",
    fit: "Its escalating ritual struggle belongs at the reality-warped boundary of the central vault."
  }),
  mission({
    id: "arm-mouth-hell",
    title: "Into the Mouth of Hell",
    source: "armageddon",
    image: "IntoTheMouthOfHell.png",
    deployment: "Depth assault",
    briefing: "The attacker pushes through three defensive depths while the defender trades ground for time.",
    objectives: [
      "Divide the defender's half into Alpha, Beta and Gamma depth zones. The attacker scores 5VP per unit ending a Command phase in Beta and 10VP per unit in Gamma (maximum 20VP per round).",
      "The defender scores 5VP for each depth-zone objective controlled (maximum 15VP per round).",
      "At battle's end, the attacker scores 10VP if its Warlord is in Gamma; otherwise the defender scores 10VP."
    ],
    warzoneTitle: "No Way Back",
    warzone: "A unit that moves into a deeper zone cannot Fall Back toward its own battlefield edge unless it first passes a Battle-shock test.",
    victorBonus: "The victor gains 2 RP and may nominate one participating unit to draw from the Battle Skill category if it earns a Battle Honour.",
    fit: "Its successive defensive depths turn a canyon or breached approach into a desperate advance."
  }),
  mission({
    id: "arm-assault-gate",
    title: "Assault the Warp Gate",
    source: "armageddon",
    image: "AssaultTheWarpGate.png",
    deployment: "Final gate assault",
    briefing: "The campaign's two leading alliances converge on the central engine. The third alliance can enter as a disruptor under the finale terms agreed by the teams.",
    objectives: [
      "The two leading alliances score 5VP for each approach objective held at the end of a battle round.",
      "After controlling two approaches, an alliance can assault the central gate; hold it until the next round for 15VP.",
      "The disruptor cannot claim the final campaign victory, but scores 5 disruption points for each approach it contests; the teams decide how those points alter the finale."
    ],
    warzoneTitle: "Cataclysmic Gate",
    warzone: "At the end of every battle round, every unit within range of the central objective makes a Hazard roll. In the finale, use Onslaught battlefield size and team activation agreed by the players.",
    victorBonus: "The leading alliance that controls the central objective at battle's end wins the campaign. If neither does, total finale VP breaks the tie, then total faction Battle Honours, then the Warmaster decides.",
    fit: "This is the purpose-built climax for the central Dominatus Engine and the campaign's three-alliance finale."
  }),

  mission({
    id: "pn-gheists-static",
    title: "Gheists in the Static",
    source: "pariah",
    image: "GheistsInTheStatic.png",
    deployment: "Dead-zone relays",
    briefing: "Possessed transmissions spill from hardened relays. Secure the network while static blinds command and control.",
    objectives: [
      "Score 5VP for each relay objective you control at the end of your Command phase (maximum 15VP).",
      "An Infantry unit can complete Purge the Signal on a relay for 5VP; that relay becomes silent until the next round.",
      "Score 5VP at battle's end if you purged more relays than your opponent."
    ],
    warzoneTitle: "Comms Blackout",
    warzone: "Stratagems used on a unit more than 12 inches from a Character cost 1CP more, except Command Re-roll.",
    victorBonus: "The winner gains 2 RP and can reroll one Battle-shock test per battle while it controls this territory.",
    fit: "Its corrupted communications network fits ruined hive wards and isolated vox stations."
  }),
  mission({
    id: "pn-dig-site",
    title: "Dig Site Raid",
    source: "pariah",
    image: "DigSiteRaid.png",
    deployment: "Excavation raid",
    briefing: "Blackstone caches lie beneath the objectives. Extract them before the enemy secures the site.",
    objectives: [
      "Place one Cache token on each no-man's-land objective. An Infantry unit can pick up a Cache at the end of its Movement phase.",
      "Score 5VP for carrying a Cache and 10VP when its carrier reaches your battlefield edge; then remove it.",
      "Score 5VP for controlling the central excavation at the end of each battle round."
    ],
    warzoneTitle: "Unstable Excavation",
    warzone: "The first time a unit enters each crater or excavation terrain feature, make a Hazard roll for that unit.",
    victorBonus: "The winning alliance gains 1 RP for each Cache it extracted, to a maximum of 3 RP.",
    fit: "Its cache-recovery structure is made for crater fields and buried war relics."
  }),
  mission({
    id: "pn-quantum-siege",
    title: "Quantum Siege",
    source: "pariah",
    image: "QuantumSiege.png",
    deployment: "Shielded stronghold",
    briefing: "A quantum defence node flickers between states. The attacker must collapse its shield before the defender reasserts control.",
    objectives: [
      "The attacker scores 5VP for each outer node controlled; controlling two removes the central objective's shield until the next round.",
      "The defender scores 5VP for each outer node held and 10VP for controlling the shielded centre.",
      "At battle's end, award 15VP to the side controlling the central objective."
    ],
    warzoneTitle: "Quantum Shield",
    warzone: "Once per battle, each player can double one unit's Objective Control until the end of the phase; that unit then becomes Battle-shocked after scoring.",
    victorBonus: "The winner chooses one of its participating units; if that unit earns a Battle Honour, draw one additional card before choosing.",
    fit: "Its layered siege mechanics suit hardened core nodes and shielded fortifications."
  }),
  mission({
    id: "pn-unstable-archeotech",
    title: "Unstable Archeotech",
    source: "pariah",
    image: "UnstableArcheotech.png",
    deployment: "Archeotech recovery",
    briefing: "An unstable device must be moved from the centre to a secure extraction point without detonating it.",
    objectives: [
      "A non-Battle-shocked Infantry unit controlling the central objective can pick up the Device at the end of its Movement phase.",
      "Score 5VP each Command phase while carrying it, and 15VP if it reaches your extraction objective.",
      "If the carrier is destroyed, place the Device where the last model was removed."
    ],
    warzoneTitle: "Volatile Payload",
    warzone: "Once per battle, the carrier may Advance and still shoot or charge. After it does, make two Hazard rolls for that unit.",
    victorBonus: "One participating Character from the winning alliance may purchase its next Enhancement for 5 fewer RP, minimum 5 RP.",
    fit: "A dangerous machine-recovery mission belongs in manufactorums and abandoned industrial sites."
  }),
  mission({
    id: "pn-miasma",
    title: "Amidst the Miasma",
    source: "pariah",
    image: "AmidstTheMiasma.png",
    deployment: "Shrouded advance",
    briefing: "Toxic fog swallows the battlefield, forcing both armies to navigate by control beacons and fleeting silhouettes.",
    objectives: [
      "Score 5VP for controlling one or more objectives and 5VP for controlling more than your opponent.",
      "At the end of each battle round, score 5VP if you control an objective in enemy territory.",
      "An Infantry unit can Survey the Miasma on a no-man's-land objective for 3VP and reveal the surrounding sector until next round."
    ],
    warzoneTitle: "Pariah Miasma",
    warzone: "Models more than 18 inches apart are not visible to one another. A surveyed objective ignores this rule within 6 inches.",
    victorBonus: "The winner gains 2 RP and may place one unit into Strategic Reserves for 0CP in its next battle here.",
    fit: "Its short sight lines and beacon play suit toxic marshes and storm-lashed coasts."
  }),
  mission({
    id: "pn-final-acquisition",
    title: "Final Acquisition",
    source: "pariah",
    image: "FinalAcquisition.png",
    deployment: "Onslaught convergence",
    briefing: "Multiple armies converge on a relic complex. Hold the acquisition nodes and extract the primary artefact.",
    objectives: [
      "Use an Onslaught-size battlefield. Score 5VP per acquisition node controlled at the end of each battle round (maximum 15VP).",
      "After controlling three different nodes, an alliance can extract the central Relic; doing so scores 15VP.",
      "For team games, total the scores of allied players and cap primary VP at 50 per alliance."
    ],
    warzoneTitle: "Null Nexus",
    warzone: "Aura abilities have a maximum range of 6 inches. Units on the central objective cannot use re-rolls unless their alliance controls two acquisition nodes.",
    victorBonus: "The winning alliance gains 5 RP. In a finale, controlling the central Relic can be used as the first tiebreaker after total VP.",
    fit: "Its large-field convergence works for a core sector where several armies can collide."
  }),

  mission({
    id: "ng-strategic-strike",
    title: "Strategic Strike",
    source: "nachmund",
    image: "StrategicStrike.png",
    deployment: "Surgical insertion",
    briefing: "A rapid strike force must seize the control points before the defender can turn the wider installation against it.",
    objectives: [
      "Score 5VP for each control point held at the end of your Command phase (maximum 15VP).",
      "A unit can complete Designate Target on an enemy-territory objective for 5VP.",
      "At battle's end, score 10VP if you control the objective furthest from your deployment zone."
    ],
    warzoneTitle: "Precision Reserves",
    warzone: "Once per battle, one Strategic Reserves unit can enter one round earlier than normal, but must arrive more than 9 inches from all enemy models.",
    victorBonus: "The winner may redeploy one unit after both sides deploy in its next battle on this tile.",
    fit: "Its fast insertion pattern suits runways, transit hubs and exposed strategic infrastructure."
  }),
  mission({
    id: "ng-supply-raid",
    title: "Supply Raid",
    source: "nachmund",
    image: "SupplyRaid.png",
    deployment: "Scattered stockpiles",
    briefing: "Raid scattered supply caches and carry them back before the enemy can cut off the withdrawal route.",
    objectives: [
      "Each no-man's-land objective begins with one Supply token. A unit controlling it can pick the token up at the end of its Movement phase.",
      "Score 5VP while carrying a Supply token and 10VP when it reaches your deployment zone.",
      "A destroyed carrier drops its token; a unit can carry only one."
    ],
    warzoneTitle: "Lean Logistics",
    warzone: "A unit carrying Supplies subtracts 2 inches from its Move but gains the Benefit of Cover against attacks from more than 18 inches away.",
    victorBonus: "The winner gains 1 RP for each Supply token extracted, up to 3 RP.",
    fit: "Its cache-and-extract play fits ports, coast roads and isolated depots."
  }),
  mission({
    id: "ng-front-line",
    title: "Front Line Warfare",
    source: "nachmund",
    image: "FrontLineWarfare.png",
    deployment: "Opposed trench lines",
    briefing: "Take the enemy's forward line while refusing to yield your own. Every trench becomes a scoring position.",
    objectives: [
      "Score 5VP for your home objective, 5VP for the central line, and 10VP for the objective nearest the enemy line.",
      "Score no more than 15VP from primary objectives in one round.",
      "At battle's end, score 10VP if the enemy does not control your home objective."
    ],
    warzoneTitle: "Attritional Front",
    warzone: "Infantry that Remain Stationary within a trench gain a 5+ invulnerable save against ranged attacks until their next Movement phase.",
    victorBonus: "The winner adds 2 RP to its treasury and wins ties when defending this territory until it changes hands.",
    fit: "Its advancing line of objectives is designed for trenches and successive defensive belts."
  }),
  mission({
    id: "ng-final-stand",
    title: "Final Stand",
    source: "nachmund",
    image: "FinalStand.png",
    deployment: "Last redoubt",
    briefing: "A surrounded garrison holds a final redoubt while the attacker tries to crush it before relief can arrive.",
    objectives: [
      "The defender scores 10VP each round it controls the central redoubt, decreasing to 5VP from round four onward.",
      "The attacker scores 5VP for each outer objective and 10VP the first time it captures the redoubt.",
      "At battle's end, award 15VP to the player controlling the redoubt."
    ],
    warzoneTitle: "Prepared Last Line",
    warzone: "Defender Infantry on the redoubt gain Feel No Pain 6+. Once the redoubt changes hands, this benefit is lost for the rest of the battle.",
    victorBonus: "The winner draws one additional Battle Honour card for a unit that fought on the redoubt, then keeps the normal number.",
    fit: "Its surrounded holdout scenario is a direct fit for bastions, redoubts and headquarters approaches."
  }),
  mission({
    id: "ng-saboteurs",
    title: "Saboteurs",
    source: "nachmund",
    image: "Saboteurs.png",
    deployment: "Industrial infiltration",
    briefing: "Plant charges on the enemy's machinery while finding and disarming explosives placed in your own lines.",
    objectives: [
      "Infantry can complete Plant Charges on an enemy-territory objective for 5VP; place a Charge token there.",
      "A unit controlling a charged objective can complete Disarm to remove the token for 3VP.",
      "At battle's end, score 5VP for each surviving Charge token, to a maximum of 15VP."
    ],
    warzoneTitle: "Chain Reaction",
    warzone: "When a charged objective detonates at battle's end, units within range make a Hazard roll. Vehicles make two.",
    victorBonus: "The winning alliance's first roster swap before its next battle costs 5 fewer RP.",
    fit: "Its charge-and-disarm contest belongs among reactors, refineries and manufactorum machinery."
  }),
  mission({
    id: "ng-gauntlet",
    title: "The Gauntlet",
    source: "nachmund",
    image: "TheGauntlet.png",
    deployment: "Running the guns",
    briefing: "One force must drive through a narrow killing ground while the other turns the route into a gauntlet of fire.",
    objectives: [
      "The runner scores 5VP for each unit wholly within the central corridor and 10VP for each unit that exits the far edge (maximum 30VP).",
      "The blocker scores 5VP for each runner unit destroyed and 5VP for controlling both flank objectives.",
      "At battle's end, score 10VP for controlling the central checkpoint."
    ],
    warzoneTitle: "Crossfire Corridor",
    warzone: "A unit in the central corridor cannot receive the Benefit of Cover unless it is wholly within terrain. Units on flank objectives gain Ignores Cover.",
    victorBonus: "The winner gains 2 RP; one participating Vehicle or Mounted unit can reroll its next Battle Honour draw.",
    fit: "Its lethal corridor turns a canyon, pass or causeway into a proper running battle."
  }),
  mission({
    id: "ng-all-out-war",
    title: "All-Out War",
    source: "nachmund",
    image: "AllOutWar.png",
    deployment: "Onslaught battle lines",
    briefing: "There is no subtlety left: two battle groups collide across a wide front and victory belongs to the alliance that still holds ground.",
    objectives: [
      "Use an Onslaught-size battlefield. Score 5VP for controlling one objective, another 5VP for controlling two, and another 5VP for controlling more than the enemy.",
      "Score 2VP the first time each round an enemy unit is destroyed (5VP instead if it was on an objective).",
      "For team games, allied players share the 50VP primary cap."
    ],
    warzoneTitle: "Total Commitment",
    warzone: "Once per battle round, each alliance can use Heroic Intervention or Rapid Ingress for 0CP.",
    victorBonus: "The winning alliance gains 4 RP and each player on that side may nominate one participating unit for post-battle rewards.",
    fit: "Its broad, high-model-count clash suits open wastes and major phase-ending battles."
  }),

  mission({
    id: "dom-battlefield-dominance",
    title: "Battlefield Dominance",
    source: "dominatus",
    image: "CrucibleOfBattle.png",
    deployment: "Crucible of Battle",
    briefing: "Hold the centre, stretch the enemy line and prove which army can dominate the widest portion of the battlefield.",
    objectives: [
      "Score 5VP for controlling one or more objectives, 5VP for controlling more than your opponent, and 5VP for the central objective.",
      "Score 3VP the first time each round you capture an objective previously controlled by the opponent.",
      "Primary scoring is capped at 50VP over five rounds."
    ],
    warzoneTitle: "Commanding Ground",
    warzone: "A Battleline unit controlling an objective has Objective Control +1 per model, unless Battle-shocked.",
    victorBonus: "The winner draws one additional Battle Honour card, then keeps the normal number.",
    fit: "This straightforward Dominatus structure is ideal for a trench junction or broadly contested sector."
  }),
  mission({
    id: "dom-meatgrinder",
    title: "Meatgrinder",
    source: "dominatus",
    image: "TippingPoint.png",
    deployment: "Tipping Point",
    briefing: "The battle is decided by attrition around a narrow centre, where casualties matter as much as ground held.",
    objectives: [
      "Score 5VP for controlling one or more objectives and 5VP for controlling more than your opponent.",
      "Once per round, score 3VP when you destroy an enemy unit; score 5VP instead if it was within range of an objective.",
      "At battle's end, score 10VP if more than half your starting units remain."
    ],
    warzoneTitle: "Grinding Advance",
    warzone: "Units below Half-strength gain +1 to Battle-shock tests while within range of an objective.",
    victorBonus: "One surviving participating unit from the winner may draw its Battle Honour from the Battle Skill category.",
    fit: "Its attritional focus suits ash wastes where shelter is scarce and losses mount quickly."
  }),
  mission({
    id: "dom-outmanoeuvre",
    title: "Outmanoeuvre",
    source: "dominatus",
    image: "SweepingEngagement.png",
    deployment: "Sweeping Engagement",
    briefing: "Turn the enemy flank, occupy their rear and make mobility count for more than static defence.",
    objectives: [
      "Score 5VP for controlling one or more objectives and 5VP for controlling more than your opponent.",
      "Score 5VP if one or more of your units is wholly within enemy territory at the end of your turn.",
      "At battle's end, score 10VP if you control the objective nearest the enemy battlefield edge."
    ],
    warzoneTitle: "Open Flanks",
    warzone: "Once per battle, one unit arriving from Strategic Reserves can be set up one round earlier than normal.",
    victorBonus: "The winner can place one additional unit into Strategic Reserves for 0CP in its next battle on an adjacent territory.",
    fit: "Its sweeping flanks reward mobility across exposed ash fields and broken roads."
  }),
  mission({
    id: "dom-gather-intel",
    title: "Gather Intel",
    source: "dominatus",
    image: "SearchAndDestroy.png",
    deployment: "Search and Destroy",
    briefing: "Search the ruined districts, recover intelligence and prevent the enemy from assembling the full picture.",
    objectives: [
      "Score 5VP for controlling one or more objectives and 5VP for controlling more than your opponent.",
      "An Infantry unit can complete Gather Intel on a no-man's-land objective for 4VP; each objective can be searched once per player.",
      "At battle's end, score 10VP if you gathered intel from three different objectives."
    ],
    warzoneTitle: "Broken Datavaults",
    warzone: "After gathering intel, roll one D6: on a 5+, gain 1CP; on a 1, that unit makes a Hazard roll.",
    victorBonus: "The winner may look at two Battle Honour cards for its first eligible unit and choose one.",
    fit: "Its close search pattern belongs in dense ruins, hab-stacks and shattered civic districts."
  }),
  mission({
    id: "dom-sabotage",
    title: "Sabotage",
    source: "dominatus",
    image: "HammerAndAnvil.png",
    deployment: "Hammer and Anvil",
    briefing: "Drive down the length of the installation and destroy the enemy's infrastructure while guarding your own.",
    objectives: [
      "Score 5VP for controlling one or more objectives and 5VP for controlling more than your opponent.",
      "An Infantry unit can complete Sabotage on an objective in enemy territory for 8VP; remove that objective after scoring.",
      "At battle's end, score 5VP for each of your home objectives still on the battlefield."
    ],
    warzoneTitle: "Industrial Overload",
    warzone: "When an objective is sabotaged, every unit within range makes a Hazard roll; Vehicles and Monsters make two.",
    victorBonus: "The winning alliance's first roster swap before the next battle costs 5 fewer RP.",
    fit: "Its lengthwise demolition run is built for industrial corridors and production lines."
  }),
  mission({
    id: "dom-secure-asset",
    title: "Secure Asset",
    source: "dominatus",
    image: "DawnOfWar.png",
    deployment: "Dawn of War",
    briefing: "Locate the valuable asset, take possession and deliver it through a conventional but heavily contested front.",
    objectives: [
      "Score 5VP for controlling one or more objectives and 5VP for controlling more than your opponent.",
      "The central Asset can be picked up by a non-Battle-shocked Infantry unit; score 5VP each Command phase while carrying it.",
      "Score 15VP if the carrier reaches your home objective; then remove the Asset."
    ],
    warzoneTitle: "Unexploded Ordnance",
    warzone: "The first time each unit enters a crater, roll one D6. On a 1 it suffers D3 mortal wounds; on a 6 its Objective Control improves by 1 until round end.",
    victorBonus: "The winner gains 2 RP and may reduce one Character Enhancement purchase by 5 RP, minimum 5 RP.",
    fit: "Its portable asset makes crater fields and salvage grounds tactically meaningful."
  })
];

const MISSIONS_BY_ID = Object.fromEntries(MISSION_LIBRARY.map((entry) => [entry.id, entry]));

// This sequence follows the hand-authored terrain layout in world.js. Every
// sourced mission appears at least once before the list begins to repeat.
const MISSION_BY_TILE = [
  "arm-brazen-bridge",
  "arm-mouth-hell", "ng-gauntlet",
  "arm-metamorphosis", "arm-temporal-flux", "pn-miasma",
  "arm-empyric-distortion", "arm-breakout", "pn-gheists-static", "arm-lighting-path",
  "arm-total-domination", "arm-fighting-gravity", "ng-front-line", "arm-trail-blood", "ng-supply-raid",
  "ng-all-out-war", "dom-outmanoeuvre", "arm-seal-rifts", "arm-veil-worlds", "pn-unstable-archeotech", "arm-temporal-raid",
  "arm-mouth-hell", "ng-final-stand", "pn-final-acquisition", "arm-assault-gate", "pn-quantum-siege", "dom-gather-intel", "arm-lighting-path",
  "arm-offering-blood", "ng-strategic-strike", "dom-battlefield-dominance", "arm-blood-shadow", "pn-final-acquisition", "ng-saboteurs", "pn-dig-site", "ng-supply-raid",
  "arm-breakout", "dom-outmanoeuvre", "ng-front-line", "dom-sabotage", "pn-dig-site", "pn-gheists-static", "arm-temporal-raid", "pn-miasma", "ng-supply-raid",
  "ng-final-stand", "ng-strategic-strike", "dom-meatgrinder", "dom-battlefield-dominance", "pn-unstable-archeotech", "dom-secure-asset", "arm-trail-blood", "arm-lighting-path", "pn-miasma", "arm-brazen-bridge"
];

export function missionForTerritory(index, territoryName, terrainLabel) {
  const selected = MISSIONS_BY_ID[MISSION_BY_TILE[index]];
  if (!selected) throw new Error(`No mission is assigned to territory index ${index}.`);
  const { id: missionId, ...missionData } = selected;

  return {
    ...missionData,
    missionId,
    missionTitle: selected.title,
    sourceFit: `${selected.fit} That is why it is used at ${territoryName}, a ${terrainLabel.toLowerCase()} territory.`,
    adaptationNote: "Deployment diagram reproduced from the linked source. Mission text is a shortened adaptation for this escalation campaign, not a full reproduction of the published mission."
  };
}

export const MISSION_META = {
  count: MISSION_LIBRARY.length,
  assignedCount: MISSION_BY_TILE.length,
  sourceBooks: Object.values(SOURCES).map((source) => source.book)
};
