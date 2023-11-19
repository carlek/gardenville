<script lang="ts">
    import { Principal } from "azle";
    import "../styles/styles.css";
    import { backend } from "../declarations/backend/index.js"; 
    import { hideAddProduct, updateProducts, products } from '../sharedStore';
    export let principal: Principal | null;

    let productName = '';
    let productDetails = '';
    var quantity = null;
    var productId = null;

    let createProductMessage = null;
    let addProductToGardenerMessage = null;

    const addNewProduct = async () => {
        if (productName && productDetails) {
            [productId, createProductMessage] = await backend.createProduct(productName, productDetails);
            await updateProducts(); 
        } else {
            createProductMessage = 'Please fill in both product name and details.';
        }
    };

    const addProductToGardener = async () => {
        const gardenerId = principal; 
        addProductToGardenerMessage = null;
        if (productId !== null && quantity !== null) {
            [productId, addProductToGardenerMessage] =
            await backend.addGardenersProduct(gardenerId, productId, quantity);
        } else {
            addProductToGardenerMessage = 'Please specify product ID and quantity';
        }
    };
</script>

<main class="product-input-page">
    <div class="actions-container">
        <h3>New Product?</h3>
        <div class="input-section">
            <label for="productName">Name:</label>
            <textarea id="producttName" bind:value={productName}></textarea>
        </div>
        <div class="input-section">
            <label for="productDetails">Details:</label>
            <textarea id="productDetails" bind:value={productDetails}></textarea>
        </div>
        <button class="add-to-gardenville-button" on:click={addNewProduct}>Add to GardenVille</button>

        <h3>Add Product to Your Garden</h3>
        <div class="input-section">
            <label for="productId">Product:</label>
            <select id="productId" bind:value={productId}>
                {#each $products as { id, name, details }}
                    <option value={id}>{name} 🪴 {details}</option>
                {/each}
            </select>
        </div>
        <div class="input-section">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" bind:value={quantity} />
        </div>
        <button class="add-to-garden-button" on:click={addProductToGardener}>Add to Garden</button>
        <button class="done-button" on:click={hideAddProduct}>Done</button>
    </div>
    {#if createProductMessage !== null}
        <p class="create-product-message">{createProductMessage}</p>
    {/if}
    {#if addProductToGardenerMessage !== null}
        <p class="add-to-gardener-message">{addProductToGardenerMessage}</p>
    {/if}
</main>
