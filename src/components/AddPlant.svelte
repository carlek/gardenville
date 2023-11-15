<!-- PlantInput.svelte -->
<script lang="ts">
    import { Principal } from "azle";
    import "../styles/styles.css";
    import { backend } from "../declarations/backend/index.js"; 
    export let principal: Principal;

    let plantName = '';
    let plantDetails = '';
    var quantity = null;
    var plantId = null;

    let createPlantMessage = null;

    const createNewPlant = async () => {
        if (plantName && plantDetails) {
            plantId = await backend.createPlant(plantName, plantDetails);
            createPlantMessage = `Plant ${plantName} created with ID ${plantId}.`;
        } else {
            createPlantMessage = 'Please fill in both plant name and details.';
        }
    };

    const addPlantToGardener = async () => {
        // Assuming you have the gardener's ID stored somewhere
        const gardenerId = principal; // Replace with the actual gardener's ID

        if (plantId !== null && quantity !== null) {
            await backend.addGardenersPlant(gardenerId, plantId, quantity);
            createPlantMessage = `${quantity} of ${plantId} added`;
        } else {
            createPlantMessage = 'Please specify plant ID and quantity';
        }
    };
</script>

<main class="plant-input-page">
    <h2>Plant Input</h2>

    <div class="input-section">
        <label for="plantName">Plant Name:</label>
        <textarea id="plantName" bind:value={plantName}></textarea>
    </div>
    <div class="input-section">
        <label for="plantDetails">Plant Details:</label>
        <textarea id="plantDetails" bind:value={plantDetails}></textarea>
    </div>
    <button class="create-plant-button" on:click={createNewPlant}>Create Plant</button>

    <h2>Add Plant to Gardener</h2>
    <div class="input-section">
        <label for="plantId">Plant ID:</label>
        <input type="number" id="plantId" bind:value={plantId} />
    </div>
    <div class="input-section">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" bind:value={quantity} />
    </div>
    <button class="add-to-gardener-button" on:click={addPlantToGardener}>Add to Gardener</button>

    {#if createPlantMessage !== null}
        <p class="create-plant-message">{createPlantMessage}</p>
    {/if}
</main>
