import test from "node:test";
import assert from "node:assert/strict";
import {
  appendOwnershipEvent,
  computeFactionStats,
  incomeOwnerForWeek,
  ownerAtWeek
} from "../js/core.js";
import { access } from "node:fs/promises";
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
  assert.equal(new Set(battlefields.map((territory) => territory.missionId)).size, 34);
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
