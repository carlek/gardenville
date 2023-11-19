import { writable } from 'svelte/store';
import { backend } from "./declarations/backend/index";

export const disableAddPlantButton = writable(false);
export const gotoAddPlant = writable(false);
export const haveAdded = writable(false);

export const disableAddProductButton = writable(false);
export const gotoAddProduct = writable(false);

export const disableContestButton = writable(false);
export const gotoContest = writable(false);
export const haveVoted = writable(false);

export const disableMyGardenButton = writable(false);
export const gotoMyGarden = writable(false);

export const disableDemoButton = writable(false);
export const gotoDemo = writable(false);

export const plants = writable(null);
export const products = writable(null);

function disableButtons(value: boolean) {
    disableAddPlantButton.set(value);
    disableAddProductButton.set(value);
    disableContestButton.set(value);
    disableMyGardenButton.set(value);
    disableDemoButton.set(value);
}

export function showAddPlant() {
    disableButtons(true);
    gotoAddPlant.set(true);
}

export function hideAddPlant() {
    disableButtons(false);
    gotoAddPlant.set(false);
    haveAdded.set(true);
}

export function showAddProduct() {
    disableButtons(true);
    gotoAddProduct.set(true);
}

export function hideAddProduct() {
    disableButtons(false);
    gotoAddProduct.set(false);
    haveAdded.set(true);
}

export function showContest() {
    disableButtons(true);
    gotoContest.set(true);
}

export function hideContest() {
    disableButtons(false);
    gotoContest.set(false);
    haveVoted.set(true);
}

export function showMyGarden() {
    disableButtons(true);
    gotoMyGarden.set(true);
}

export function hideMyGarden() {
    disableButtons(false);
    gotoMyGarden.set(false);
}

export function showDemo() {
    disableButtons(true);
    gotoDemo.set(true);
}

export function hideDemo() {
    disableButtons(false);
    gotoDemo.set(false);
}

export const updatePlants = async () => {
    const result = await backend.getPlants();
    plants.set(result);
};

export const updateProducts = async () => {
    const result = await backend.getProducts();
    products.set(result);
};
