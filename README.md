# The Dominatus Front

A buildless, static campaign tracker for a three-phase tabletop escalation campaign. It is designed to run on GitHub Pages without a database, login system, or server-side code.

## What is included

- A 10-row, 55-territory triangular hex map.
- Three uncapturable corner headquarters for Alpha, Beta, and Gamma.
- A seven-hex central region locked until Phase 3.
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
- The 35-mission library and its 55-tile assignment are defined in `js/missions.js`.
- The visual design is in `styles.css`.
- The background map is `assets/dominatus-war-map.png`.

The cards use shortened, faction-agnostic campaign adaptations rather than reproducing complete published mission rules. Each card identifies and links its source, explains why it fits the territory, and uses a locally stored copy of that mission's deployment diagram. Sources: [Armageddon](https://wahapedia.ru/wh40k11ed/the-rules/armageddon/), [Dominatus](https://wahapedia.ru/wh40k11ed/the-rules/dominatus/), [Nachmund Gauntlet](https://wahapedia.ru/wh40k11ed/the-rules/nachmund-gauntlet/), and [Pariah Nexus](https://wahapedia.ru/wh40k11ed/the-rules/pariah-nexus/). Review the adaptations before organised play and confirm you have permission to republish the source diagrams if the site will be public.

## Background map

The restored campaign background is the original generated war-torn world artwork. To replace it with a hand-drawn map later, overwrite `assets/dominatus-war-map.png` with a `1536 × 1024` PNG. The responsive ten-row triangle and every territory remain separate SVG elements, so replacing the image will not disturb ownership, selection, or mission data.
