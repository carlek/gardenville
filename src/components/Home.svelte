<script lang="ts">
    import "../styles/styles.css";
    export let isAuthenticated: boolean;
    export let principal: Principal | null;
    export let handleLogout: () => void;
    export let toggleSignup: () => void;
    export var gardener: Gardener;

    import { onMount } from "svelte";
    import { backend } from "../declarations/backend/index.js";
    import { Principal } from "azle";

    import AddPlant from "./AddPlant.svelte";
    import AddProduct from "./AddProduct.svelte";
    import Contest from "./Contest.svelte";
    import MyGarden from "./MyGarden.svelte";

    import {
        disableContestButton,
        showContest,
        gotoContest,
        disableAddPlantButton,
        showAddPlant,
        gotoAddPlant,
        disableAddProductButton,
        showAddProduct,
        gotoAddProduct,
        disableMyGardenButton,
        showMyGarden,
        gotoMyGarden,
        disableDemoButton,
        showDemo,
        gotoDemo,
    } from "../sharedStore";

    import { updatePlants, updateProducts } from "../sharedStore";
    import type { Gardener } from "../../backend";
    import Demo from "./Demo.svelte";
    
    let isInitialized: boolean = false;
    let gardenerName: string | null = null;
    let balance: bigint;
    let symbol: string;

    const fetchBalance = async () => {
        const result = await backend.getBalance({owner: principal, subaccount: []});
        symbol = await backend.getIcrcSymbol();
        balance = ('Ok' in result) ? result.Ok : null;
    };

    onMount(async () => {
        if (isAuthenticated && principal) {
            const _gardener = await backend.getGardener(principal);
            gardener = _gardener[0];
            gardenerName = gardener ? gardener.info.name : null;
             isInitialized = true;
            fetchBalance();
            updateProducts();
            updatePlants();
        }
    });

    const handleSignup = () => {
        toggleSignup();
        console.log(`signup: ${principal}`);
    };

</script>

<main
    class="home-page"
    style={isAuthenticated
        ? "background-image: url('../assets/garden.jpg');"
        : "background-image: none;"}
>
    {#if isAuthenticated && isInitialized}
        {#if gardenerName !== null}
            <div class="info-container">
                <h3>Welcome back to GardenVille</h3>
                <div class="info-item">Name: {gardener.info.name}</div>
                <div class="info-item">Contact: {gardener.info.contact}</div>
                {#if balance !== undefined}
                    <div class="info-item">Current Balance: {balance} {symbol}</div>
                {:else}
                    <div class="info-item">Loading balance...</div>
                {/if}
            </div>
            <div class="buttons-container">
                <button class="addplant-button" on:click={showAddPlant} disabled={$disableAddPlantButton}>Add Plant</button>
                <button class="addproduct-button" on:click={showAddProduct} disabled={$disableAddProductButton}>Add Product</button>
                <button class="mygarden-button" on:click={showMyGarden} disabled={$disableMyGardenButton}>MyGarden</button>
                <button class="contest-button" on:click={showContest} disabled={$disableContestButton}>Contest</button>
                <button class="demo-button" on:click={showDemo} disabled={$disableDemoButton}>Demo</button>
            </div>
            {#if $gotoAddPlant} <AddPlant {principal} />{/if}
            {#if $gotoAddProduct} <AddProduct {principal} />{/if}
            {#if $gotoContest} <Contest {principal} />{/if}
            {#if $gotoMyGarden} <MyGarden {gardener} />{/if}
            {#if $gotoDemo} <Demo />{/if}
        {:else}
            <h1>Welcome to GardenVille!</h1>
            <h2>Sign up to start your Gardening Journey</h2>
            <button class="signup-button" on:click={handleSignup}>Signup</button>
        {/if}
        <img src="../assets/icp-logo.png" alt="ICP Logo" class="icp-logo" />
        <button class="logout-button" on:click={handleLogout}>Logout</button>
    {/if}
</main>
