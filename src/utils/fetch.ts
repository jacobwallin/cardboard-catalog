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
