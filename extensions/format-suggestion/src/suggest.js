// [START address-autocomplete.ext-target]
export default async () => {
  // [END address-autocomplete.ext-target]
  // [START address-autocomplete.attributes]
      const {field, value, selectedCountryCode} = shopify.target;
  // [END address-autocomplete.attributes]

  // [START address-autocomplete.fetch]
      const response = await fetchSuggestions(
        field,
        value,
        selectedCountryCode,
        shopify.signal
      );
      const { result } = await response.json();
  // [END address-autocomplete.fetch]

  // [START address-autocomplete.map]
      const suggestions = result.suggestions.map((suggestion) => {
        return {
          id: suggestion.global_address_key,
          label: suggestion.text,
          matchedSubstrings: suggestion.matched,
          formattedAddress: suggestion.formattedAddress,
        };
      });

      return { suggestions };
  // [END address-autocomplete.map]
    }

  // [START address-autocomplete.fetch]
  /**
   * In this example, suggestions are fetched from a static file. In your implementation,
   * use the address field and its current query value to fetch meaningful address suggestions.
   */
  async function fetchSuggestions(_field, _value, _selectedCountryCode, signal) {
    return fetch(
      `https://shopify.github.io/address-autocomplete/address-autocomplete.json`,
      {
        // Pass `signal` to each fetch request
        signal,
      }
    );
  }
  // [END address-autocomplete.fetch]
