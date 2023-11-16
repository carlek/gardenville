import { writable } from 'svelte/store';

export const disableAddPlantButton = writable(false);
export const gotoAddPlant = writable(false);
export const haveAdded = writable(false);

export const disableContestButton = writable(false);
export const gotoContest = writable(false);
export const haveVoted = writable(false);

export const disableMyGardenButton = writable(false);
export const gotoMyGarden = writable(false);

export function showAddPlant() {
    disableContestButton.set(true);
    disableMyGardenButton.set(true);
    gotoAddPlant.set(true);
}

export function hideAddPlant() {
    disableContestButton.set(false);
    disableMyGardenButton.set(false);
    gotoAddPlant.set(false);
    haveAdded.set(true);
}

export function showContest() {
    disableAddPlantButton.set(true);
    disableMyGardenButton.set(true);
    gotoContest.set(true);
}

export function hideContest() {
    disableAddPlantButton.set(false);
    disableMyGardenButton.set(false);
    gotoContest.set(false);
    haveVoted.set(true);
}

export function showMyGarden() {
    disableAddPlantButton.set(true);
    disableContestButton.set(true);
    gotoMyGarden.set(true);
}

export function hideMyGarden() {
    disableAddPlantButton.set(false);
    disableContestButton.set(false);
    gotoMyGarden.set(false);
}
