
import {
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { buildURLQueryParams, transformRequest } from "@/helpers/urls";
import { API_URL } from "@/config";
import {
  METHODS_FAILURE_MESSAGES_MAP,
  METHODS_SUCCESS_MESSAGES_MAP,
  MUTATIONS_METHODS,
  HttpMethod,
} from "@/constants/system-messages-interface";

import { enqueueSnackbar } from "notistack";

interface QueryResult {
  data?: unknown;
  error?: FetchBaseQueryError;
  meta?: FetchBaseQueryMeta;
}

interface CustomResponse {
  data: unknown;
  meta: {
    request: { method: string };
    response: { status: number };
  };
}

interface CustomFetchArgs extends FetchArgs {
  responseHandler?: () => Promise<CustomResponse>;
}

export const systemMessages = (result: QueryResult) => {
  if (!result.meta?.request || !result.meta?.response) return;

  const method = result.meta.request.method as HttpMethod;
  const status = result.meta.response.status;

  if (MUTATIONS_METHODS.includes(method)) {
    if (status >= 200 && status < 300) {
      enqueueSnackbar(METHODS_SUCCESS_MESSAGES_MAP[method], {
        variant: "success",
        autoHideDuration: 3000,
      });
    } else {
      enqueueSnackbar(METHODS_FAILURE_MESSAGES_MAP[method], {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,

  paramsSerializer: buildURLQueryParams,
});

export const customBaseQuery: BaseQueryFn<
  string | CustomFetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const modifiedArgs = transformRequest(args);

  if (typeof modifiedArgs === "object" && "responseHandler" in modifiedArgs) {
    try {
      const response = await modifiedArgs.responseHandler!();
      const result = {
        data: response.data,
        meta: response.meta,
      };
      systemMessages(result);
      return result;
    } catch (error) {
      const result = {
        error: {
          status: 500,
          data: error instanceof Error ? error.message : "Unknown error",
        },
        meta: {
          request: { method: modifiedArgs.method || "POST" },
          response: { status: 500 },
        },
      };
      systemMessages(result);
      return result;
    }
  }

  const result = await baseQuery(modifiedArgs, api, extraOptions);
  systemMessages(result);
  return result;
};
