import QueryWithCursor from "./QueryWithCursor";

export default interface UserChatrooms extends QueryWithCursor {
  searchTerm?: string;
}
