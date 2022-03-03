const baseUri = "https://localhost:3000"; //replace
const pathForRefresh="user/refresh";

export async function send(opts: Req) {

    if (opts.data) {
        opts.headers = new Headers();
        opts.headers.set('Content-Type', 'application/json');
        opts.body = JSON.stringify(opts.data);

    }

    if (opts.token) {
        opts.headers['Authorization'] = `Bearer ${opts.token}`;
    }

    opts.credentials = 'include';

    let r = await fetch(`${baseUri}/${opts.path}`, opts);

    if (r.status === 401) {
        console.log("try to refresh");
        let refresh = await post(pathForRefresh);
        if (refresh && refresh.token) {
            console.log("refreshed");
            r = await fetch(`${baseUri}/${opts.path}`, opts);
        } else {
            console.log("failed to refresh");
            //do something
        }
    }
    if (r.ok && r) {
        const contentType = r.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await r.json();
        } else {
            return await r.text();
        }

    }

    console.log("failed to fetch");
    return null;
}


export function get(path, token?) {
    let req: Req = { path, token, method: 'GET' };
    return send(req);
}

export function del(path, token?) {
    let req: Req = { path, token, method: 'DELETE' };
    return send(req);
}

export function post(path, data?, token?) {
    let req: Req = { path, data, token, method: 'POST' };
    return send(req);
}

export function put(path, data, token?) {
    let req: Req = { path, data, token, method: 'PUT' };
    return send(req);
}

interface Req {
    method: string;
    path: string;
    data?: object;
    body?: string;
    token: string;
    headers?: Headers;
    credentials?: RequestCredentials;
}