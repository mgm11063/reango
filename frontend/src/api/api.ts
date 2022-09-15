import { IReportForm } from "./types";

const BASE_PATH = "http://127.0.0.1:8000";

export function getRoomList() {
  return fetch(`${BASE_PATH}/reports/`).then((response) => response.json());
}
export function getRoom(roomId: string) {
  return fetch(`${BASE_PATH}/reports/${roomId}/`).then((response) =>
    response.json()
  );
}
export const createRoom = async (formData: IReportForm) => {
  console.log(formData);

  const response = await fetch(`${BASE_PATH}/reports/`, {
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

export function getRoomTag() {
  return fetch(`${BASE_PATH}/rooms/tags`).then((response) => response.json());
}
