<script lang="ts">
    import "../styles/styles.css";
    export let isAuthenticated: boolean;
    export let principal: Principal | null;
    export let handleLogout: () => void;
    export let toggleSignup: () => void;

    import { onMount } from "svelte";
    import { backend } from "../declarations/backend/index.js";
    import { Principal } from "azle";
    import Contest from "./Contest.svelte";
    import AddPlant from "./AddPlant.svelte";

    let gardenerName: string | null = null;
    let isInitialized = false;
    let gardener;
    let balance: bigint;
    let symbol: string;

    const fetchBalance = async () => {
        const result = await backend.getBalance({owner: principal, subaccount: []});
        symbol = await backend.getIcrcSymbol();
        balance = ('Ok' in result) ? result.Ok : null;
    };
    
    onMount(async () => {
        if (isAuthenticated && principal) {
            const result = await backend.getGardener(principal);
            gardener = result[0];
            gardenerName = gardener ? gardener.info.name : null;
            fetchBalance(); 
            isInitialized = true;
        }
    });

    const handleSignup = () => {
        toggleSignup();
        console.log(`signup: ${principal}`);
    };

    let showContestPage = false;
    let haveVoted = false;
    const showContest = () => {
        showContestPage = true;
    }
    const hideContest = () => {
        showContestPage = false;
        haveVoted = true;
    }

    let showAddPlantPage = false;
    let haveAdded = false;
    const showAddPlant = () => {
        showAddPlantPage = true;
    }
    const hideAddPlant = () => {
        showAddPlantPage = false;
        haveAdded = true;
    }

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
                {#if showContestPage}
                    <button class="contest-button" on:click={hideContest}>Done</button>
                {:else}
                    {#if !haveVoted}
                        <button class="contest-button" on:click={showContest} disabled={showAddPlantPage}>Contest</button>
                    {/if}
                {/if}
                {#if showAddPlantPage}
                    <button class="add-plant-button" on:click={hideAddPlant}>Done</button>
                {:else}
                    {#if !haveAdded}
                        <button class="add-plant-button" on:click={showAddPlant} disabled={showContestPage}>Add Plant</button>
                    {/if}
                {/if}
            </div>
            {#if showAddPlantPage} <AddPlant {principal} />{/if}
            {#if showContestPage} <Contest {principal} />{/if}
        {:else}
            <h1>Welcome to GardenVille!</h1>
            <h2>Sign up to start your Gardening Journey</h2>
            <button class="signup-button" on:click={handleSignup}>Signup</button>
        {/if}
        <img src="../assets/icp-logo.png" alt="ICP Logo" class="icp-logo" />
        <button class="logout-button" on:click={handleLogout}>Logout</button>
    {/if}
</main>
