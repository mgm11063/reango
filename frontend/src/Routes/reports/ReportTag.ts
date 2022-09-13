import { useQuery } from "react-query";
import { getRoomTag } from "../../api/api";
import { IRoomTag } from "../../api/types";

export function RoomTags() {
  const { data } = useQuery("tags", getRoomTag);
  const arr: IRoomTag[] = [];
  for (const key in data) {
    arr.push(data[key]["name"]);
  }
  return arr;
}
