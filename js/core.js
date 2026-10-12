export const OWNER_IDS = ["alpha", "beta", "gamma"];

export function cloneCampaign(data) {
  return JSON.parse(JSON.stringify(data));
}

export function ownerAtWeek(history = [], week = 0) {
  return [...history]
    .filter((event) => Number(event.week) <= Number(week))
    .sort((a, b) => Number(a.week) - Number(b.week))
    .at(-1)?.owner ?? "neutral";
}

export function currentOwner(data, territoryId) {
  return ownerAtWeek(
    data.ownershipHistory?.[territoryId],
    Number(data.campaign?.week ?? 0)
  );
}

export function incomeOwnerForWeek(data, territoryId, week) {
  // Income is generated at the start of a week. A capture made during week N
  // therefore starts producing income in week N + 1.
  return ownerAtWeek(data.ownershipHistory?.[territoryId], Number(week) - 1);
}

export function appendOwnershipEvent(data, territoryId, owner, captureWeek) {
  data.ownershipHistory ??= {};
  const events = [...(data.ownershipHistory[territoryId] ?? [])]
    .filter((event) => Number(event.week) !== Number(captureWeek));

  events.push({ week: Number(captureWeek), owner });
  events.sort((a, b) => Number(a.week) - Number(b.week));

  // Remove consecutive events that do not change control.
  data.ownershipHistory[territoryId] = events.filter((event, index, list) => {
    if (index === 0) return true;
    return event.owner !== list[index - 1].owner;
  });

  return data;
}

export function computeFactionStats(data, territories) {
  const stats = Object.fromEntries(
    OWNER_IDS.map((id) => [id, {
      id,
      territories: 0,
      weeklyIncome: 0,
      generated: 0,
      spent: Number(data.factions?.[id]?.rpSpent ?? 0),
      balance: 0
    }])
  );

  const currentWeek = Math.max(0, Number(data.campaign?.week ?? 0));
  const currentPhase = Math.max(1, Number(data.campaign?.phase ?? 1));

  for (const territory of territories) {
    const owner = currentOwner(data, territory.id);
    const isUnlocked = currentPhase >= territory.lockedUntilPhase;

    if (stats[owner]) {
      stats[owner].territories += 1;
      if (isUnlocked) stats[owner].weeklyIncome += territory.rpValue;
    }

    for (let week = 1; week <= currentWeek; week += 1) {
      const incomeOwner = incomeOwnerForWeek(data, territory.id, week);
      if (stats[incomeOwner]) stats[incomeOwner].generated += territory.rpValue;
    }
  }

  for (const faction of Object.values(stats)) {
    faction.balance = faction.generated - faction.spent;
  }

  return stats;
}

export function rankFactions(stats) {
  return Object.values(stats).sort((a, b) => {
    if (b.territories !== a.territories) return b.territories - a.territories;
    return a.id.localeCompare(b.id);
  });
}

export function validateCampaign(data) {
  const errors = [];
  if (!data || typeof data !== "object") errors.push("Campaign data must be an object.");
  if (!data?.campaign) errors.push("Missing campaign settings.");
  if (!data?.factions) errors.push("Missing faction settings.");
  if (!data?.ownershipHistory) errors.push("Missing ownership history.");
  if (Number(data?.campaign?.week) < 0) errors.push("Campaign week cannot be negative.");
  if (![1, 2, 3].includes(Number(data?.campaign?.phase))) errors.push("Phase must be 1, 2 or 3.");
  return errors;
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(Number(value ?? 0));
}
