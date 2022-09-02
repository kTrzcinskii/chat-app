import QueryWithCursor from "../interfaces/QueryWithCursor";

export default function transformUrlWithQueryCursor(
  url: string,
  query?: QueryWithCursor
) {
  if (!query) {
    return url;
  }
  if (query.cursor && query.limit) {
    return `${url}limit=${query.limit}&cursor=${query.cursor}`;
  }
  if (query.cursor && !query.limit) {
    return `${url}cursor=${query.cursor}`;
  }
  if (query.limit && !query.cursor) {
    return `${url}limit=${query.limit}`;
  }
  return url;
}
