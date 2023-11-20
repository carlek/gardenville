<script lang="ts">
    import "../styles/styles.css";
    import { hideMyGarden, plants, products } from "../sharedStore";
    import type { Gardener } from "../../backend";
    import { backend } from "../declarations/backend";
    export var gardener: Gardener;

    const refreshGardener = async () => {
        const _gardener = await backend.getGardener(gardener.info.id);
        gardener = _gardener[0];
    };

    refreshGardener();

</script>

<main>
    <div class="mygarden-container">
        <div class="column">
            <div class="row">
                <div class="table-container">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Plant</th>
                                <th>Description</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each gardener.plants as [plantId, quantity]}
                                {#if $plants.find(plant => plant.id === plantId)}
                                    {#each $plants.filter(plant => plant.id === plantId) as plant}
                                        <tr class="data-row">
                                            <td>{plant.name}</td>
                                            <td>{plant.details}</td>
                                            <td>{quantity}</td>
                                        </tr>
                                    {/each}
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="row">
                <div class="table-container">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Details</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each gardener.products as [productId, quantity]}
                                {#if $products.find(product => product.id === productId)}
                                    {#each $products.filter(product => product.id === productId) as product}
                                        <tr class="data-row">
                                            <td>{product.name}</td>
                                            <td>{product.details}</td>
                                            <td>{quantity}</td>
                                        </tr>
                                    {/each}
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="row">
                <div class="table-container">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Plant</th>
                                <th>Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="data-row">
                                {#each $plants.filter(plant => plant.id === gardener.contestEntry.plant) as plant} {#each $products.filter(product => product.id === gardener.contestEntry.product) as product}
                                    <td>{plant.name}</td>
                                    <td>{product.name}</td>
                                {/each} {/each}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <button class="done-button" on:click={hideMyGarden}>Close</button>
    </div>
</main>
