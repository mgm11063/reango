const BASE_PATH = "http://127.0.0.1:8000";
export interface IRoom {
  id: Number;
  name: String;
  address: String;
  price: String;
  beds: String;
  lat: String;
  lng: String;
  bedrooms: Number;
  bathrooms: Number;
  check_in: String;
  check_out: String;
  instant_book: Boolean;
}

export function getRoomList() {
  return fetch(`${BASE_PATH}/rooms/`).then((response) => response.json());
}

export function getRoom(roomId: String) {
  return fetch(`${BASE_PATH}/rooms/${roomId}/`).then((response) =>
    response.json()
  );
}
