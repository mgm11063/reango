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
  const response = await fetch(`${BASE_PATH}/rooms/`, {
    method: "POST",
    body: JSON.stringify({
      name: formData.name,
      address: formData.address,
      price: formData.price,
      beds: formData.beds,
      lat: formData.lat,
      lng: formData.lng,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      check_in: formData.check_in,
      check_out: formData.check_out,
      instant_book: formData.instant_book,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return;
};
