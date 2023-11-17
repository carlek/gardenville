<script lang="ts">
    import { hideMyGarden } from "../sharedStore";

    export let gardener;
</script>

<main>
    <div class="mygarden-container">
        <div class="column">
            <div class="row">
                <h3>Plants:</h3>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each gardener.plants as [plantId, quantity]}
                            <tr class="data-row">
                                <td>{plantId}</td>
                                <td>{quantity}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="column">
            <div class="row">
                <h3>Products:</h3>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each gardener.products as [productId, quantity]}
                            <tr class="data-row">
                                <td>{productId}</td>
                                <td>{quantity}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="column">
            <div class="row">
                <h3>Contest Entry:</h3>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Entry ID</th>
                            <th>Name</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each gardener.contestEntry as { id, name, details }}
                            <tr class="data-row">
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{details}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <button class="done-button" on:click={hideMyGarden}>Close</button>
</main>

<style>
    /* Style the container as a flex row */
    .mygarden-container {
        display: flex;
        gap: 20px;
    }

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

    /* Apply styling to tables */
    .styled-table {
        border-collapse: collapse;
        width: 100%;
        font-size: 0.9rem; /* Reduce font size */
        border-radius: 10px; /* Round edges */
        overflow: hidden; /* Hide overflow for rounded corners */
    }

    .styled-table th,
    .styled-table td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        font-weight: bold; /* Bold font for values */
    }

    .styled-table th {
        background-color: #6479ff; /* Blue background for column headers */
        color: white; /* White font color for column headers */
    }

    /* Style for data rows */
    .data-row {
        background-color: white; /* White background for data rows */
        color: black; /* Black font color for data rows */
    }
</style>
