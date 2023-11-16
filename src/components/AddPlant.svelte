<script lang="ts">
    import { writable } from 'svelte/store';
    import { Principal } from "azle";
    import "../styles/styles.css";
    import { backend } from "../declarations/backend/index.js"; 
    import { hideAddPlant } from '../sharedStore';
    export let principal: Principal | null;

    let plantName = '';
    let plantDetails = '';
    var quantity = null;
    var plantId = null;

    let createPlantMessage = null;
    let addPlantToGardenerMessage = null;

    let plants = writable([]);
    const updatePlants = async () => {
        const result = await backend.getPlants();
        plants.set(result);
    };
    updatePlants(); 

    const createNewPlant = async () => {
        if (plantName && plantDetails) {
            plantId = await backend.createPlant(plantName, plantDetails);
            createPlantMessage = `Plant ${plantName} created with ID ${plantId}.`;
            updatePlants(); 
        } else {
            createPlantMessage = 'Please fill in both plant name and details.';
        }
    };

    const addPlantToGardener = async () => {
        const gardenerId = principal; 
        createPlantMessage = null;
        if (plantId !== null && quantity !== null) {
            await backend.addGardenersPlant(gardenerId, plantId, quantity);
            addPlantToGardenerMessage = `${quantity} of ${plantId} added`;
        } else {
            addPlantToGardenerMessage = 'Please specify plant ID and quantity';
        }
    };
</script>

<main class="plant-input-page">
    <div class="actions-container">
        <h3>New Plant?</h3>
        <div class="input-section">
            <label for="plantName">Name:</label>
            <textarea id="plantName" bind:value={plantName}></textarea>
        </div>
        <div class="input-section">
            <label for="plantDetails">Details:</label>
            <textarea id="plantDetails" bind:value={plantDetails}></textarea>
        </div>
        <button class="create-plant-button" on:click={createNewPlant}>Add to GardenVille</button>

        <h3>Add Plant to Your Garden</h3>
        <div class="input-section">
            <label for="plantId">Plant:</label>
            <select id="plantId" bind:value={plantId}>
                {#each $plants as { id, name, details }}
                    <option value={id}>{name} 🪴 {details}</option>
                {/each}
            </select>
        </div>
        <div class="input-section">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" bind:value={quantity} />
        </div>
        <button class="add-to-gardener-button" on:click={addPlantToGardener}>Add to Garden</button>
        <button class="done-button" on:click={hideAddPlant}>Done</button>
    </div>
    {#if createPlantMessage !== null}
        <p class="create-plant-message">{createPlantMessage}</p>
    {/if}
    {#if addPlantToGardenerMessage !== null}
        <p class="add-to-gardener-message">{addPlantToGardenerMessage}</p>
    {/if}
</main>
