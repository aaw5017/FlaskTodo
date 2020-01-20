<script>
    import { onMount } from 'svelte';
    import { ToDoService } from '../services/todo.service';
    import ToDoItem from './ToDoItem.svelte';

    let isReady = false,
        isLoading = false,
        hasError = false,
        errorText = '',
        todos = [],
        newText = '',
        inputEl;

    onMount(async () => {
        try {
            todos = await ToDoService.getAll();
        } catch (error) {
            console.log(error);
            hasError = true;
            errorText = 'Unable to load ToDo list. Please try again.';
        } finally {
            isReady = true;
        }
    });

    async function handleSubmit(e) {
        if (newText.length === 0) return;

        isLoading = true;
        try {
            const newToDo = await ToDoService.add(newText);
            todos = [...todos, newToDo];
            newText = '';
            setTimeout(function() {
                inputEl.focus(); // Fix for Chrome-based browsers. Engine is too fast without setTimeout
            }, 1);
        } catch (error) {
            console.log(error);
            hasError = true;
            errorText = 'Unable to add ToDo item. Please try again.';
        } finally {
            isLoading = false;
        }
    }

    async function handleDelete(event) {
        try {
            const { detail: todoId } = event;

            await ToDoService.delete(todoId);
            todos = todos.filter(td => td.id !== todoId);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleEdit(event) {
        try {
            const { detail: todoId } = event;

            await ToDoService.delete(todoId);
            todos = todos.filter(td => td.id !== todoId);
        } catch (error) {
            console.error(error);
        }
    }
</script>

<style>
    input[type="text"] {
        margin-bottom: .75rem;
    }
    .todo-list-header {
        text-align: center;
    }
    .list {
        border: 1px solid #b6b5b6;
        border-radius: 4px;
        box-shadow: 2px 2px 5px 0 #aaa;
    }
</style>

<section class="todo-list-container">
    {#if isReady}
        {#if hasError}
            <strong>An error occurred. Unable to load ToDo list.</strong>
        {:else}
            <h1 class="todo-list-header">ToDo List</h1>
            <form on:submit|preventDefault="{handleSubmit}">
                <input bind:value="{newText}"
                    bind:this="{inputEl}"
                    type="text"
                    maxlength="250"
                    placeholder="Type a ToDo and hit 'Enter'"
                    disabled="{isLoading}"
                    autofocus />
            </form>
            {#if todos.length > 0}
                <ul class="list">
                    {#each todos as todo}
                        <ToDoItem data="{todo}" on:delete="{handleDelete}" on:edit="{handleEdit}" />
                    {/each}
                </ul>
            {/if}
        {/if}
    {:else}
        <strong>Loading...</strong>
    {/if}
</section>