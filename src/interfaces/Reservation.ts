export default interface Reservation {
  id?: string | number;
  entrydate: Date;
  exitdate: Date;
  /**
   * Amount of people in the reservation
   */
  people: number;
  /**
   * foreign key
   */
  id_hotel: string;
}
