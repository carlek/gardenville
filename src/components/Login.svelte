<script lang="ts">
    // import { AuthClient } from './auth';
    import { AuthClient } from "@dfinity/auth-client";
    import { Principal } from "azle";
    import gardenImage from "../assets/garden.jpg";
    import "../styles/styles.css";
    export let isAuthenticated: boolean = false;
    export let principal: Principal | null;

    const handleLoginSuccess = (authClient: AuthClient) => {
        isAuthenticated = true;
        principal = authClient.getIdentity().getPrincipal();
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("principal", principal.toString());
    };

    const handleLoginFail = (error?: string) => {
        console.error("Login Failed: ", error);
    };

    const login = async () => {
        const authClient = await AuthClient.create();
        const isLocalNetwork = process.env.DFX_NETWORK == "local";
        const identityProviderUrl = isLocalNetwork
            ? `http://127.0.0.1:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`
            : "https://identity.ic0.app/";

        authClient.login({
            identityProvider: identityProviderUrl,
            maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
            onSuccess: async () => {
                handleLoginSuccess(authClient);
            },
            onError: (error?: string) => {
                handleLoginFail(error);
            },
        });
    };
</script>

<main>
    <p class="gardenville-motto">plant - grow - share</p>

    <div>
        <img src={gardenImage} class="logo" alt="Garden" />
    </div>

    {#if isAuthenticated}
        <button on:click={() => (isAuthenticated = false)}>Logout</button>
    {:else}
        <button on:click={login}>Login</button>
    {/if}
</main>
