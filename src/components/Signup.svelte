<script lang="ts">
    import "../styles/styles.css";
    import { backend } from "../declarations/backend/index.js";
    import { getInitialMint } from "../../backend/config";
    import { Principal } from "azle";

    export let toggleSignup: () => void;
    export let isAuthenticated: boolean;
    export let principal: Principal | null;

    let name = "";
    let contact = "";

    const handleSubmit = async () => {
        console.log("Name:", name);
        console.log("Contact:", contact);

        if (principal) {
            const gardenerInfo = {id: principal, name: name, contact: contact};
            await backend.createGardener(gardenerInfo);
            const toAccount = {owner: principal, subaccount: []};
            const amount = getInitialMint();
            const result = await backend.mintTokens(toAccount, amount);
            console.log(result)
            if ("Ok" in result) {
                console.log(`Successfully minted ${amount} tokens for ${gardenerInfo.name}`);
            } else {
                console.error(`Error minting tokens: ${result.Err}`);
            }
            toggleSignup();
        } else {
            console.error("No authenticated user available.");
        }
    };
</script>

<main
    class="signup-page"
    style={isAuthenticated
        ? "background-image: url('../assets/garden.jpg');"
        : "background-image: none;"}
>
    <h1>Sign Up for GardenVille</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <label>
            Name:
            <input type="text" bind:value={name} />
        </label>
        <label>
            Contact:
            <input type="text" bind:value={contact} />
        </label>
        <button type="submit" class="submit-button">Submit</button>
        <img src="../assets/icp-logo.png" alt="ICP Logo" class="icp-logo" />
    </form>
</main>
