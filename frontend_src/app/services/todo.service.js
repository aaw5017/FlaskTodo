class Service {
    constructor() {
        this._baseUrl = '/todos';
        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    _isJsonResponse(contentType) {
        return ((contentType || '').indexOf('application/json') > -1);

    }

    // Async keyword guarantees that the function will return a Promise / thenable
    async _makeRequest(url, options) {
        const resp = await fetch(url, options),
            { status, headers } = resp,
            isJson = this._isJsonResponse(headers.get('content-type')),
            data = (isJson) ? await resp.json() : await resp.text();

        if (status > 199 && status < 300) {
            return data;
        }

        const defaultMsg = `Request was not successful at ${url}`;
        const message = (isJson) ? (data.message || defaultMsg)
            : data || defaultMsg;

        throw new Error(message);
    }

    getAll() {
        return this._makeRequest(this._baseUrl);
    }

    add(text) {
        const body = JSON.stringify({
                text,
                is_completed: false
            }),
            headers = new Headers({
                'Content-Type': 'application/json',
                'Content-Length': body.length
            });

        return this._makeRequest(this._baseUrl, { method: 'POST', headers, body });
    }

    update(todo) {
        const modelJson = JSON.stringify(todo),
            headers = new Headers({
                'Content-Type': 'application/json',
                'Content-Length': modelJson.length
            });

        return this._makeRequest(`${this._baseUrl}/${todo.id}`, {
            method: 'PUT',
            headers,
            body: modelJson
        });
    }

    delete(id) {
        return this._makeRequest(`${this._baseUrl}/${id}`, { method: 'DELETE' });
    }
}

export const ToDoService = new Service();