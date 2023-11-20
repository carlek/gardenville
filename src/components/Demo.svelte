<script lang="ts">
    import "../styles/styles.css";
    import { hideDemo, plants, products, updatePlants, updateProducts } from "../sharedStore";
    import type { Gardener } from "../../backend";
    import { backend } from "../declarations/backend";
    import { Principal } from "azle";
    var gardener: Gardener;

    const getGardener = async () => { 
        const demo_id: Principal = Principal.fromText("jrywm-b6exd-effuv-yadtk-vgbbr-vdskx-pqk5w-7bq3j-e2khf-dfqas-vae"); 
        const _gardener = await backend.getGardener(demo_id);
        gardener = _gardener[0];
        updatePlants();
        updateProducts();
    };

    $: if (gardener) {
        $plants;    // trigger these when gardener is available
        $products; 
    }

    getGardener();


</script>

<main>
    {#if gardener}
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
                                <th>Contest ID</th>
                                <th>Name</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- {#each gardener.contestEntry as { id, name, details }}
                                <tr class="data-row">
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{details}</td>
                                </tr>
                            {/each} -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <button class="done-button" on:click={hideDemo}>Close</button>
    </div>
    {/if}
</main>
