<script lang="ts">
  import './App.css';
  import Login from './components/Login.svelte';
  import HomePage from "./components/Home.svelte"

  let isAuthenticated : boolean = false;
  
</script>

<main>
     
  {#if isAuthenticated}
    <HomePage {isAuthenticated} />
  {:else}
    <Login bind:isAuthenticated />
  {/if}

</main>


