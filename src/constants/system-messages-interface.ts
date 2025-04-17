export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const MUTATIONS_METHODS = [
  HttpMethod.PATCH,
  HttpMethod.PUT,
  HttpMethod.POST,
  HttpMethod.DELETE,
];

export const METHODS_SUCCESS_MESSAGES_MAP: Record<HttpMethod, string> = {
  [HttpMethod.GET]: "Data retrieved successfully",
  [HttpMethod.POST]: "Item created successfully",
  [HttpMethod.PATCH]: "Item updated successfully",
  [HttpMethod.PUT]: "Item updated successfully",
  [HttpMethod.DELETE]: "Item deleted successfully",
};

export const METHODS_FAILURE_MESSAGES_MAP: Record<HttpMethod, string> = {
  [HttpMethod.GET]: "Failed to retrieve data",
  [HttpMethod.POST]: "Failed to create item",
  [HttpMethod.PATCH]: "Failed to update item",
  [HttpMethod.PUT]: "Failed to update item",
  [HttpMethod.DELETE]: "Failed to delete item",
};
