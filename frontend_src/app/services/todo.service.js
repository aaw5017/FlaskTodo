class Service {
    constructor() {
        this._baseUrl = '/todos';
        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll() {
        const res = await fetch(this._baseUrl);
        return await res.json();
    }
    async add(text) {
        const modelJson = JSON.stringify({
                text,
                is_completed: false
            }),
            headers = new Headers({
                'Content-Type': 'application/json',
                'Content-Length': modelJson.length
            });

        const res = await fetch(this._baseUrl, {
            method: 'POST',
            headers,
            body: modelJson
        });

        return await res.json();
    }
    async update(todo) {
        const modelJson = JSON.stringify(todo),
            headers = new Headers({
                'Content-Type': 'application/json',
                'Content-Length': modelJson.length
            });

        const res = await fetch(`${this._baseUrl}/${todo.id}`, {
            method: 'PUT',
            headers,
            body: modelJson
        });

        return await res.json();
    }
    async delete(id) {
        const res = await fetch(`${this._baseUrl}/${id}`, {
            method: 'DELETE'
        });

        return await res.text();
    }
}

export const ToDoService = new Service();