<script lang="ts">
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
    </form>
</main>

<style>
    .signup-page {
        background-image: url("../assets/garden.jpg");
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100dvh;
        width: 100dvw;
        color: white;
        position: relative;
    }
    .submit-button {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: #646cff; /* Background color for the button */
        border: none;
        color: white;
        padding: 0.5rem 1rem; /* Added padding for the button */
        border-radius: 4px; /* Rounded corners for the button */
        font-weight: bold; /* Make the text bold for better visibility */
        cursor: pointer;
        transition: background-color 0.2s; /* Smooth transition for hover effect */
        &:hover {
            background-color: #e62828;
        }
    }
    
</style>
