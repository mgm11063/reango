import { IRoomForm } from "./types";

const BASE_PATH = "http://127.0.0.1:8000";

export function getRoomList() {
  return fetch(`${BASE_PATH}/rooms/`).then((response) => response.json());
}
export function getRoom(roomId: string) {
  return fetch(`${BASE_PATH}/rooms/${roomId}/`).then((response) =>
    response.json()
  );
}
export const createRoom = async (formData: IRoomForm) => {
  console.log("======", formData);
  const response = await fetch(`${BASE_PATH}/rooms/`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return;
};
