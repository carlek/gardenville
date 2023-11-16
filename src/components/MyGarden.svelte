<script lang="ts">
    export let gardener;
</script>

<main>
        <div class="column">
            <div class="row">
                <strong>Name:</strong>
                {gardener.info.name}
            </div>
            <div class="row">
                <strong>Contact:</strong>
                {gardener.info.contact}
            </div>
            <div class="row">
                <h3>Plants:</h3>
                {#each gardener.plants as [plantId, quantity]}
                    <div class="nested-row">
                        <span>Plant ID:</span>
                        {plantId}, <span>Quantity:</span>
                        {quantity}
                    </div>
                {/each}
            </div>
            <div class="row">
                <h3>Products:</h3>
                {#each gardener.products as [productId, quantity]}
                    <div class="nested-row">
                        <span>Product ID:</span>
                        {productId}, <span>Quantity:</span>
                        {quantity}
                    </div>
                {/each}
            </div>
            <div class="row">
                <h3>Contest Entry:</h3>
                {#each gardener.contestEntry as { id, name, details }}
                    <div class="nested-row">
                        <span>Entry ID:</span>
                        {id}, <span>Name:</span>
                        {name}, <span>Details:</span>
                        {details}
                    </div>
                {/each}
            </div>
        </div>
</main>

<style>
    /* Style the column and row layout as needed */
    .column {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .row {
        display: flex;
        gap: 10px;
    }

    .nested-row {
        margin-left: 20px;
    }
</style>
