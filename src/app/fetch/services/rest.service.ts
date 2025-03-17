import { apiErrorParser } from "../helpers";

const baseUrl = "https://jsonplaceholder.typicode.com/";
async function apiGetService<R>(url: string) {
  try {
    const response = await fetch(`${baseUrl}${url}`, { method: "GET" });

    const data: R = await response.json();
    return { result: data, error: null };
  } catch (error) {
    const errored = apiErrorParser(error);
    return { result: null, error: errored };
  }
}

async function apiPostService<D = unknown, R = unknown>(
  url: string,
  values?: D
) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: values ? JSON.stringify(values) : undefined,
    });

    const data: R = await response.json();
    return { result: data, error: null };
  } catch (error) {
    return { result: null, error: apiErrorParser(error) };
  }
}

async function apiPutService<D, R = unknown>(url: string, values: D) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data: R = await response.json();
    return { result: data, error: null };
  } catch (error) {
    return { result: null, error: apiErrorParser(error) };
  }
}

async function apiPatchService<D, R = unknown>(url: string, values?: D) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: values ? JSON.stringify(values) : undefined,
    });

    const data: R = await response.json();
    return { result: data, error: null };
  } catch (error) {
    return { result: null, error: apiErrorParser(error) };
  }
}

async function apiDeleteService<R = unknown>(url: string) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data: R = await response.json();
    return { result: data, error: null };
  } catch (error) {
    return { result: null, error: apiErrorParser(error) };
  }
}

export {
  apiGetService,
  apiPostService,
  apiPutService,
  apiDeleteService,
  apiPatchService,
};
