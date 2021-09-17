export default interface Hotel {
  id?: number | string;
  name: string;
  /**
   * The number references a category
   */
  category: number;
  city: string;
  department: string;
  /**
   * The rating of the hotel
   */
  stars: number;
  description: string;
  /**
   * The path to the image
   */
  picture: string;
}
