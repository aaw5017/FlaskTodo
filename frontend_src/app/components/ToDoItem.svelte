<script>
    import { onMount, createEventDispatcher } from 'svelte';

    // Props
    export let data;

    // Locals
    const dispatcher = createEventDispatcher();
    let isEditing = false, inputEl, editText;

    onMount(() => {
        editText = data.text;
    });

    function dispatchDelete() {
        dispatcher('delete', data.id);
    }
    function toggleCompleted() {
        data.is_completed = !data.is_completed;

        dispatcher('edit', { ...data });
    }
    function toggleEdit() {
        isEditing = !isEditing;

        if (isEditing) {
            setTimeout(function() {
                inputEl.focus();
            }, 1);

            return;
        }

        editText = data.text;
    }
    function handleKeydown(e) {
        const { key } = e;

        switch(key.toLowerCase()) {
            case 'enter': {
                if (editText.length === 0) {
                    return;
                }

                const { id, is_completed } = data;
                dispatcher('edit', { id, text: editText, is_completed });
                isEditing = false;

                break;
            }
            case 'escape': {
                isEditing = false;
                break;
            }
        }
    }
</script>
<style>
    .ml-auto {
        margin-left: auto;
    }
    .success {
        color: #4BB543;
    }
    .danger {
        color: #721c24;
    }

    li {
        padding: 15px 10px;
        border-bottom: 1px solid #b6b5b6;
        display: flex;
        align-items: center;
    }
    li:last-child {
        border-bottom: none;
    }

    .action {
        visibility: hidden;
    }
    li:hover > .action {
        visibility: visible;
    }

    .completed-toggle {
        margin-right: 15px;
        font-size: 1.2rem;
    }
    .completed-toggle:hover {
        color: #808080;
    }
    .done {
        text-decoration: line-through;
        opacity: .75;
    }

    .edit {
        margin-right: 10px;
    }
    .edit:hover {
        color: #0c5460;
    }


    .editor-wrap {
        flex-grow: 1;
    }
    .editor-wrap > input {
        margin-bottom: 10px;
    }
</style>

<li>
    {#if !isEditing}
        <button type="button"
            on:click="{toggleCompleted}"
            class="completed-toggle"
            title="Click to toggle ToDo completion.">
            {#if data.is_completed}
                <i class="fa fa-check-circle success"></i>
            {:else}
                <i class="far fa-circle"></i>
            {/if}
        </button>
        <span class="{data.is_completed ? 'done' : ''}">{data.text}</span>
        <button type="button"
            class="action edit ml-auto"
            title="Edit this ToDo"
            on:click="{toggleEdit}">
            <i class="fa fa-edit"></i>
        </button>
        <button type="button"
            class="action danger"
            title="Delete this ToDo"
            on:click="{dispatchDelete}">
            <i class="fa fa-times"></i>
        </button>
    {/if}

    {#if isEditing}
        <div class="editor-wrap">
            <input type="text"
                bind:value="{editText}"
                bind:this="{inputEl}"
                on:keydown="{handleKeydown}" />
            <button type="button"
                class="btn btn-danger"
                on:click="{toggleEdit}">Cancel</button>
        </div>
    {/if}
</li>