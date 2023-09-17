<script lang="ts">
    import "../styles/styles.css";
    
    export let isAuthenticated: boolean;

    let name = "";
    let contact = "";

    const handleSubmit = () => {
        console.log("Name:", name);
        console.log("Contact:", contact);
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
