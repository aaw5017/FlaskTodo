<script>
    import { createEventDispatcher } from 'svelte';
    export let data;

    const dispatcher = createEventDispatcher();
    function dispatchDelete() {
        dispatcher('delete', data.id);
    }
    function dispatchEdit() {
        dispatcher('edit', data.id);
    }

</script>
<style>
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
    .edit {
        margin-left: auto;
        margin-right: 10px;
    }
    .edit:hover {
        color: #0c5460;
    }
    .delete {
        color: #721c24;
    }
</style>

<li>
    <span>{data.text}</span>
    <button type="button"
        class="action edit"
        title="Edit this ToDo"
        on:click={dispatchEdit}>
        <i class="fa fa-edit"></i>
    </button>
    <button type="button"
        class="action delete"
        title="Delete this ToDo"
        on:click="{dispatchDelete}">
        <i class="fa fa-times"></i>
    </button>
</li>