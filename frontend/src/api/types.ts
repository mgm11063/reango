export interface IRoom {
  id: number;
  name: string;
  address: string;
  price: number;
  beds: number;
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  check_in: string;
  check_out: string;
  instant_book: boolean;
}
export interface IRoomForm {
  name: string;
  address: string;
  price: number;
  beds: number;
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  check_in: string;
  check_out: string;
  instant_book: boolean;
}
