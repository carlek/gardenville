<!-- Main.svelte -->
<script lang="ts">
    import "../styles/styles.css";
    import SignUpForm from "./SignUpForm.svelte";

    export let toggleSignup: () => void;
    export let isAuthenticated: boolean;
    export let principal: Principal | null;
</script>

<main
    class="signup-page"
    style={isAuthenticated
        ? "background-image: url('../assets/garden.jpg');"
        : "background-image: none;"}
>
    <h1>Sign Up for GardenVille</h1>
    <SignUpForm {toggleSignup} {isAuthenticated} {principal} />
    <img src="../assets/icp-logo.png" alt="ICP Logo" class="icp-logo" />
</main>
