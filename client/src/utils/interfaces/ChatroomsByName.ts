import QueryWithCursor from "./QueryWithCursor";

export default interface IChatroomsByName extends QueryWithCursor {
  name: string;
}
