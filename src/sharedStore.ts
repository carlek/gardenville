import { writable } from 'svelte/store';

export const disableAddPlantButton = writable(false);
export const gotoAddPlant = writable(false);
export const haveAdded = writable(false);

export const disableContestButton = writable(false);
export const gotoContest = writable(false);
export const haveVoted = writable(false);

export function showAddPlant() {
    disableContestButton.set(true);
    gotoAddPlant.set(true);
}

export function hideAddPlant() {
    disableContestButton.set(false);
    gotoAddPlant.set(false);
    haveAdded.set(true);
}

export function showContest() {
    disableAddPlantButton.set(true);
    gotoContest.set(true);
}

export function hideContest() {
    disableAddPlantButton.set(false);
    gotoContest.set(false);
    haveVoted.set(true);
}
