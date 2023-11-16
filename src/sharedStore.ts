import { writable } from 'svelte/store';

export const activeAddPlantPage = writable(false);
export const haveAdded = writable(false);
export const activeContestPage = writable(false);
export const haveVoted = writable(false);

export function showAddPlant() {
  activeAddPlantPage.set(true);
}

export function hideAddPlant() {
  activeAddPlantPage.set(false);
  haveAdded.set(true);
}

export function showContest() {
    activeContestPage.set(true);
}
export function hideContest() {
    activeContestPage.set(false);
    haveVoted.set(true);
}
