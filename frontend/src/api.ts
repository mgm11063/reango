const BASE_PATH = "http://127.0.0.1:8000";

export interface IRoom {
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

export function getRooms() {
  return fetch(`${BASE_PATH}/api/v1/rooms/list/`).then((response) =>
    response.json()
  );
}
