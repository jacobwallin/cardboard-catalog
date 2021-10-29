export function postData(url: string, payload: object) {
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(payload), // body data type must match "Content-Type" header
  }).then((response) => {
    return response.json();
  });
}

export function get(url: string) {
  return fetch(url).then((response) => {
    // if response is not ok, throw it
    if (!response.ok) throw response;
    return response.json();
  });
}

export function post(url: string, payload: any) {
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
  }).then((response) => {
    // if response is not ok, throw it
    if (!response.ok) throw response;
    return response.json();
  });
}
