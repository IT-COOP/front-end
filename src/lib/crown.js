const minimumBronzeCount = 2;
const minimumSilverCount = 4;
const minimumGoldCount = 8;

export function getCrown(projectCount) {
  let currentCrown;

  if (projectCount >= minimumGoldCount) {
    currentCrown = "gold";
  } else if (projectCount >= minimumSilverCount) {
    currentCrown = "silver";
  } else if (projectCount >= minimumBronzeCount) {
    currentCrown = "bronze";
  } else {
    currentCrown = "none";
  }

  return currentCrown;
}

export function getExperienceAmount(projectCount) {
  let amount;

  if (projectCount >= minimumGoldCount) {
    amount = 100;
    return amount;
  } else if (projectCount > minimumSilverCount) {
    amount = (projectCount / minimumGoldCount) * 100;
  } else if (projectCount > minimumBronzeCount) {
    amount = (projectCount / minimumSilverCount) * 100;
  } else {
    amount = (projectCount / minimumBronzeCount) * 100;
  }

  return Math.round(amount) === 100 ? 0 : Math.round(amount);
}

export function getRemainingCount(projectCount) {
  if (projectCount >= minimumGoldCount) {
    return 0;
  }

  if (projectCount === minimumSilverCount) {
    return minimumGoldCount - minimumSilverCount;
  }

  if (projectCount === minimumBronzeCount) {
    return minimumSilverCount - minimumBronzeCount;
  }

  if (4 <= projectCount && projectCount < 8) {
    return minimumGoldCount - projectCount;
  }

  if (2 <= projectCount && projectCount < 4) {
    return minimumSilverCount - projectCount;
  }

  return minimumBronzeCount - projectCount;
}
