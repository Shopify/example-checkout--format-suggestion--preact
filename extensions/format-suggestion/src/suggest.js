// [START address-autocomplete.ext-target]
export default async () => {
      const {field, value, selectedCountryCode} = shopify.target;
      const response = await fetchSuggestions(
        field,
        value,
        selectedCountryCode,
        shopify.signal
      );
      const { result } = await response.json();

      // [START format-suggestion.update]
      const suggestions = result.suggestions.map((suggestion) => {
        return {
          id: suggestion.global_address_key,
          label: suggestion.text,
          matchedSubstrings: suggestion.matched,
        };
      });
      // [END format-suggestion.update]

      return { suggestions };
    }

  /**
   * In this example, suggestions are fetched from a static file. In your implementation,
   * use the address field and its current query value to fetch meaningful address suggestions.
   */
  async function fetchSuggestions(_field, _value, _selectedCountryCode, signal) {
    // [START format-suggestion.update]
    return fetch(
      `https://shopify.github.io/address-autocomplete/address-autocomplete.json`,
      {
        // Pass `signal` to each fetch request
        signal,
      }
    );
    // [END format-suggestion.update]
  }

