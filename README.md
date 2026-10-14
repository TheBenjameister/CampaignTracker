# The Dominatus Front

A buildless, static campaign tracker for a three-phase tabletop escalation campaign. It is designed to run on GitHub Pages without a database, login system, or server-side code.

## What is included

- A 10-row, 55-territory triangular hex map.
- Three uncapturable corner headquarters for Alpha, Beta, and Gamma.
- A seven-hex central region locked until Phase 3.
- A twelve-territory defence ring made up of nine wall sectors and three Annihilator Cannon emplacements, each with a bespoke siege mission and grand-finale benefit.
- Clickable non-HQ location cards with sourced deployment maps, adapted objectives, war-zone rules, victor bonuses, RP yield, and strategic bonuses.
- Mission-free headquarters cards that clearly identify those three territories as permanent, non-assaultable strongholds.
- Automatic weekly RP calculations based on territory-control history.
- A Warmaster editor that records ownership changes and exports an updated `campaign.json` file.
- Responsive layouts for desktop, tablet, and mobile.

## Updating the campaign

1. Open `editor.html` on the published site.
2. Enter the current week, phase, points limit, and total RP spent by each alliance.
3. Select any capturable hex and change its controlling alliance.
4. Download the updated `campaign.json` file.
5. Replace `data/campaign.json` in the repository and commit the change.

The website will update when GitHub Pages finishes deploying the commit. Changes made in the editor do not alter the repository on their own.

### RP timing

RP is generated at the start of every campaign week. A territory captured during Week 4 changes colour immediately but begins generating RP for its new controller at the start of Week 5. Opening-draft control should be entered during Week 0.

## Publishing with GitHub Pages

This folder is already initialised as a Git repository on the `main` branch. In GitHub Desktop, use **File → Add local repository**, select this folder, then choose **Publish repository**. You do not need to use **Create new repository** or copy the files into another folder.

After publishing:

1. Open the repository on GitHub and choose **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Choose the `main` branch and the repository root (`/`).
4. Save and wait for GitHub to provide the public URL.

No build command or GitHub Actions workflow is required. The root `index.html` and `.nojekyll` file make the repository ready for branch-based GitHub Pages hosting.

## Local preview

Serve the folder with any simple local web server, then open `index.html` through that server. Opening the HTML file directly will prevent the browser from loading `data/campaign.json` because of browser security restrictions.

## Customising the setting

- Mutable campaign state is stored in `data/campaign.json`.
- Territory names, bonuses, and map rules are defined in `js/world.js`.
- The 47-entry mission library and its 55-tile assignment (42 distinct missions in use) are defined in `js/missions.js`.
- The visual design is in `styles.css`.
- The background map is `assets/dominatus-war-map.png`.

## Mission sources and adaptation note

Deployment diagrams are reproduced from the linked sources with permission for use by this private-entertainment campaign site. Mission text is a shortened adaptation for this escalation campaign, not a full reproduction of the published missions. Each card identifies and links its source and explains why that mission fits the territory.

Sources: [Armageddon](https://wahapedia.ru/wh40k11ed/the-rules/armageddon/), [Dominatus](https://wahapedia.ru/wh40k11ed/the-rules/dominatus/), [Nachmund Gauntlet](https://wahapedia.ru/wh40k11ed/the-rules/nachmund-gauntlet/), [Pariah Nexus](https://wahapedia.ru/wh40k11ed/the-rules/pariah-nexus/), [The Breaking of the Perfect Fortress](https://assets.warhammer-community.com/horusheresy_exemplarybattles_thebreakingoftheperfectfortress_eng_24.09-5ds3vom7i0.pdf), and [Legacies of the Age of Darkness: Orbital Defences](https://assets.warhammer-community.com/dave-s-downloads-25-09/horusheresy_legaciesoftheageofdarkness_legionesastartes_eng_24.09.23.pdf).

## Central defence ring

The six inner city territories and the Dominatus Engine are protected by three arcs of three wall territories. Crownfire Battery, Grief Battery and Wrath Battery sit between those arcs.

- A controlled wall territory grants one Fortification asset in the grand finale.
- Each controlled Annihilator Cannon fires once per battle round using a 5-inch blast marker. A finalist fires at the end of one of its alliance turns; a cannon controlled by the third-alliance disruptor fires at the end of the battle round.
- Units touched by the marker suffer 1 mortal wound, or D3 mortal wounds if beneath its centre hole. Friendly fire applies.

## Background map

The campaign background is the Hexton Hills export stored at `assets/dominatus-war-map.png`. Its native `4058 × 2384` canvas, grid origin and tile spacing are matched by the calibrated background sizing and positioning in `styles.css`. The responsive ten-row SVG triangle remains separate from the artwork, but now sits directly over the corresponding 55 illustrated hexes at every zoom level and viewport size.

If this map is exported again, keep the same Hexton Hills canvas dimensions and grid placement. If either changes, recalibrate the second `background-size` and `background-position` values in `.map-canvas::before` rather than moving the interactive hexes individually.
