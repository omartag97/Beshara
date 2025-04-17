import { FetchArgs } from "@reduxjs/toolkit/query";

export const buildURLQueryParams = (
  queryParams: Record<string, unknown>,
): string => {
  const urlParams = new URLSearchParams();

  for (const key in queryParams) {
    if (queryParams[key] && typeof queryParams[key] !== "object") {
      urlParams.append(key, String(queryParams[key]));
    } else if (queryParams[key] instanceof Array && !!queryParams[key].length) {
      urlParams.append(key, queryParams[key].join(","));
    }
  }

  return urlParams.toString();
};

const appendAPIKey = (url: string): string => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}`;
};

export const transformRequest = (
  args: string | FetchArgs,
): string | FetchArgs => {
  try {
    if (typeof args === "string") {
      return appendAPIKey(args);
    }

    return {
      ...args,
      url: appendAPIKey(args.url),
    };
  } catch (error) {
    console.error("Error transforming request:", error);
    throw error;
  }
};
