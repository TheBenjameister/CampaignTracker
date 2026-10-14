import test from "node:test";
import assert from "node:assert/strict";
import {
  appendOwnershipEvent,
  computeFactionStats,
  incomeOwnerForWeek,
  ownerAtWeek
} from "../js/core.js";
import { access } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { buildWorld } from "../js/world.js";

const territory = {
  id: "T02",
  rpValue: 2,
  lockedUntilPhase: 1
};

const campaign = {
  campaign: { week: 4, phase: 1 },
  factions: {
    alpha: { rpSpent: 1 },
    beta: { rpSpent: 0 },
    gamma: { rpSpent: 0 }
  },
  ownershipHistory: {
    T02: [
      { week: 0, owner: "alpha" },
      { week: 2, owner: "beta" }
    ]
  }
};

test("ownerAtWeek returns the latest capture", () => {
  assert.equal(ownerAtWeek(campaign.ownershipHistory.T02, 1), "alpha");
  assert.equal(ownerAtWeek(campaign.ownershipHistory.T02, 2), "beta");
});

test("income changes on the week after a capture", () => {
  assert.equal(incomeOwnerForWeek(campaign, "T02", 2), "alpha");
  assert.equal(incomeOwnerForWeek(campaign, "T02", 3), "beta");
});

test("stats total historical income and spending", () => {
  const stats = computeFactionStats(campaign, [territory]);
  assert.equal(stats.alpha.generated, 4);
  assert.equal(stats.alpha.balance, 3);
  assert.equal(stats.beta.generated, 4);
  assert.equal(stats.beta.weeklyIncome, 2);
});

test("ownership events replace same-week edits and collapse duplicates", () => {
  const copy = structuredClone(campaign);
  appendOwnershipEvent(copy, "T02", "gamma", 2);
  assert.deepEqual(copy.ownershipHistory.T02, [
    { week: 0, owner: "alpha" },
    { week: 2, owner: "gamma" }
  ]);
});

test("every capturable territory has a sourced campaign mission and local deployment image", async () => {
  const world = buildWorld();
  const battlefields = world.filter((territory) => !territory.headquartersFor);

  assert.equal(world.length, 55);
  assert.equal(battlefields.length, 52);
  assert.equal(new Set(battlefields.map((territory) => territory.missionId)).size, 42);
  assert.deepEqual(
    new Set(battlefields.map((territory) => territory.sourceBook)),
    new Set(["Armageddon", "Pariah Nexus", "Nachmund Gauntlet", "Dominatus"])
  );

  await Promise.all(battlefields.map((territory) => {
    assert.ok(territory.objectives.length >= 3);
    assert.ok(territory.victorBonus);
    assert.ok(territory.sourceFit.includes(territory.name));
    return access(fileURLToPath(new URL(`../${territory.deploymentImage}`, import.meta.url)));
  }));
});

test("the central defence ring contains nine walls and three cannon emplacements", () => {
  const world = buildWorld();
  const walls = world.filter((territory) => territory.defenceRole === "Curtain wall");
  const cannons = world.filter((territory) => territory.defenceRole === "Annihilator Cannon");

  assert.deepEqual(
    walls.map((territory) => territory.id),
    ["T12", "T14", "T17", "T20", "T23", "T27", "T40", "T41", "T42"]
  );
  assert.deepEqual(cannons.map((territory) => territory.id), ["T13", "T31", "T34"]);

  for (const territory of [...walls, ...cannons]) {
    assert.equal(territory.terrainId, "fortress");
    assert.match(territory.missionId, /^ring-/);
  }

  for (const territory of walls) {
    assert.match(territory.victorBonus, /Fortification asset/i);
  }

  for (const territory of cannons) {
    assert.match(territory.victorBonus, /5-inch blast marker/i);
    assert.match(territory.victorBonus, /non-finalist disruptor/i);
  }
});

test("only the nine illustrated special locations are strategic", () => {
  const world = buildWorld();
  const strategicTerritories = world.filter((territory) => territory.strategic);
  const strategicIds = strategicTerritories
    .map((territory) => territory.id);

  assert.deepEqual(strategicIds, ["T05", "T07", "T10", "T22", "T28", "T38", "T44", "T49", "T52"]);

  for (const territory of strategicTerritories) {
    assert.equal(territory.draftCost, 2);
    assert.equal(territory.rpValue, 2);
    assert.ok(territory.strategicBonus);
  }

  for (const territory of world.filter((territory) => !territory.strategic)) {
    assert.equal(territory.strategicBonus, null);
  }
});

test("headquarters cannot be assaulted and have no mission data", () => {
  const headquarters = buildWorld().filter((territory) => territory.headquartersFor);

  assert.equal(headquarters.length, 3);
  for (const territory of headquarters) {
    assert.equal(territory.capturable, false);
    assert.equal(territory.missionId, undefined);
    assert.equal(territory.deploymentImage, undefined);
    assert.equal(territory.victorBonus, undefined);
  }
});

test("the central territory uses the three-alliance finale", () => {
  const centre = buildWorld().find((territory) => territory.id === "T25");
  assert.equal(centre.missionId, "arm-assault-gate");
  assert.match(centre.briefing, /third alliance/i);
  assert.match(centre.victorBonus, /wins the campaign/i);
});

test("the campaign page includes all five disposition agendas", async () => {
  const html = await readFile(fileURLToPath(new URL("../index.html", import.meta.url)), "utf8");

  for (const disposition of [
    "Take and Hold",
    "Purge the Foe",
    "Disruption",
    "Reconnaissance",
    "Priority Assets"
  ]) {
    assert.match(html, new RegExp(`>${disposition}<`));
  }

  assert.match(html, /territory mission decides victory and capture/i);
  assert.match(html, /no more than three Agenda Achieved results/i);
  assert.match(html, /never award RP or decide territory control/i);
});
