<script>
    import { ToDoService } from '../services/todo.service';
    import ToDoList from './ToDoList.svelte';
</script>

<style lang="scss">
    main {
        max-width: 850px;
        margin: 0 auto;
        padding: 20px;
    }
</style>

<main>
    <article>
        <ToDoList />
    </article>
</main>