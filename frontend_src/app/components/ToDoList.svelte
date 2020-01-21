<script>
    import { onMount } from 'svelte';
    import { ToDoService } from '../services/todo.service';
    import ToDoItem from './ToDoItem.svelte';

    let isReady = false,
        isLoading = false,
        todos = [],
        newText = '',
        inputEl;

    onMount(async () => {
        try {
            todos = await ToDoService.getAll();
        } catch (error) {
            console.error(error);
        } finally {
            isReady = true;
        }
    });

    async function handleSubmit(e) {
        if (newText.length === 0) {
            return;
        }

        isLoading = true;
        try {
            const newToDo = await ToDoService.add(newText);
            todos = [...todos, newToDo];
            newText = '';
            setTimeout(function() {
                inputEl.focus(); // Fix for Chrome-based browsers. Engine is too fast without setTimeout
            }, 1);
        } catch (error) {
            console.error(error);
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
            const { detail: todo } = event;

            await ToDoService.update(todo);

            todos = todos.map(td => {
                if (td.id !== todo.id) {
                    return td;
                }

                return { ...td, ...todo };
            });
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
    <h1 class="todo-list-header">ToDo List</h1>

    {#if !isReady}
        <h2 class="todo-list-header">Loading ToDo List...</h2>
    {/if}

    {#if isReady}
        <form on:submit|preventDefault="{handleSubmit}">
            <input bind:value="{newText}"
                bind:this="{inputEl}"
                type="text"
                maxlength="250"
                placeholder="Type a ToDo and hit 'Enter'"
                disabled="{isLoading}" />
        </form>
        {#if todos.length > 0}
            <ul class="list">
                {#each todos as todo}
                    <ToDoItem data="{todo}"
                        on:delete="{handleDelete}"
                        on:edit="{handleEdit}" />
                {/each}
            </ul>
        {:else}
            <h4 class="todo-list-header"><i>No ToDos. Add some!</i></h4>
        {/if}
    {/if}
</section>