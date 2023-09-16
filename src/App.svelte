<script lang="ts">
  import './App.css';
  import Login from './components/Login.svelte';
  import HomePage from "./components/Home.svelte"

  let isAuthenticated : boolean = localStorage.getItem('isAuthenticated') === 'true';
  let principal: string = localStorage.getItem('principal') ?? 'New User';

</script>

<main>
     
  {#if isAuthenticated}
    <HomePage {isAuthenticated} {principal} />
  {:else}
    <Login bind:isAuthenticated bind:principal />
  {/if}

</main>
