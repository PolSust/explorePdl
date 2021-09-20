interface AutocompletionProps {
  inputQuery: string;
  /**
   * Callback function called when an autocompletition item is pressed
   */
  onAutocompletionItemPress: (
    nom: string,
    codeDepartment?: number | string,
  ) => void;
  /**
   * if it needs to look for cities on a specific department
   */
  codeDepartment?: number | string;
}

export default AutocompletionProps;
