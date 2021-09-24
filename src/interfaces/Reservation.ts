export default interface Reservation {
  id?: string | number;
  entrydate: Date | undefined;
  exitdate: Date | undefined;
  /**
   * Amount of people in the reservation
   */
  people: number | undefined;
  /**
   * foreign key
   */
  id_hotel: string | number | undefined;
}
