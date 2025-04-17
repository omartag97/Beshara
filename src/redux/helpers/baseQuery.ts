import {
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { buildURLQueryParams } from "@/helpers/urls";
import { API_URL } from "@/config";
import {
  METHODS_FAILURE_MESSAGES_MAP,
  METHODS_SUCCESS_MESSAGES_MAP,
  MUTATIONS_METHODS,
  HttpMethod,
} from "@/constants/system-messages-interface";

import { enqueueSnackbar } from "notistack";

type CustomMeta = {
  request: { method: string };
  response: { status: number };
};

type CustomQueryResult = {
  data?: unknown;
  error?: FetchBaseQueryError;
  meta?: CustomMeta;
};

interface CustomResponse {
  data: unknown;
  meta: CustomMeta;
}

interface CustomFetchArgs extends FetchArgs {
  responseHandler?: () => Promise<CustomResponse>;
}

const convertToCustomMeta = (
  meta?: FetchBaseQueryMeta,
): CustomMeta | undefined => {
  if (!meta?.request || !meta?.response) return undefined;
  return {
    request: { method: meta.request.method },
    response: { status: meta.response.status },
  };
};

export const systemMessages = (result: CustomQueryResult) => {
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
  if (typeof args === "object" && "responseHandler" in args) {
    try {
      const response = await args.responseHandler!();
      const result: CustomQueryResult = {
        data: response.data,
        meta: response.meta,
      };
      systemMessages(result);
      return {
        data: response.data,
        meta: undefined,
        error: undefined,
      };
    } catch (error) {
      const result: CustomQueryResult = {
        error: {
          status: 500,
          data: error instanceof Error ? error.message : "Unknown error",
        },
        meta: {
          request: { method: args.method || "POST" },
          response: { status: 500 },
        },
      };
      systemMessages(result);
      return {
        error: result.error,
        data: undefined,
        meta: undefined,
      };
    }
  }

  const result = await baseQuery(args, api, extraOptions);
  const customResult: CustomQueryResult = {
    ...result,
    meta: convertToCustomMeta(result.meta),
  };
  systemMessages(customResult);
  return result;
};
