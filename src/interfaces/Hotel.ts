export default interface Hotel {
  id?: number | string;
  name: string | undefined;
  /**
   * The number references a category
   */
  category: number | undefined;
  city: string | undefined;
  department: string | undefined;
  /**
   * The rating of the hotel
   */
  stars: number | undefined;
  description: string | undefined;
  /**
   * Base64 encoded image
   */
  picture?: string | undefined;
}
