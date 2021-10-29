import { logout } from "../store";

export function get(url: string, dispatch: any): Promise<any> {
  return fetch(url).then((response: Response) => {
    if (!response.ok) {
      if (response.status === 401) {
        dispatch(logout());
      } else {
        throw response;
      }
    }
    return response.json();
  });
}

export function post(url: string, payload: any, dispatch: any): Promise<any> {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
  }).then((response: Response) => {
    if (!response.ok) {
      if (response.status === 401) {
        dispatch(logout());
      } else {
        throw response;
      }
    }
    return response.json();
  });
}
export function postString(url: string, payload: string, dispatch: any): Promise<any> {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "text/plain",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: payload,
  }).then((response: Response) => {
    if (!response.ok) {
      if (response.status === 401) {
        dispatch(logout());
      } else {
        throw response;
      }
    }
    return response.json();
  });
}

export function put(url: string, payload: any, dispatch: any): Promise<any> {
  return fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
  }).then((response: Response) => {
    if (!response.ok) {
      if (response.status === 401) {
        dispatch(logout());
      } else {
        throw response;
      }
    }
    return response.json();
  });
}

export function del(url: string, dispatch: any): Promise<any> {
  return fetch(url, {
    method: "DELETE",
  }).then((response: Response) => {
    if (!response.ok) {
      if (response.status === 401) {
        dispatch(logout());
      } else {
        throw response;
      }
    }
    return response.json();
  });
}
