// [START format-suggestion.ext-target]
export default async () => {
  // [END format-suggestion.ext-target]

  // [START format-suggestion.attribute]
  const { selectedSuggestion } = shopify.target;
  // [END format-suggestion.attribute]

  // [START format-suggestion.fetch]
  const response = await fetchSuggestions();

  const { result } = await response.json();

  const formattedAddress = result.suggestions.find(
    ({ global_address_key }) => global_address_key === selectedSuggestion.id
  );

  return formattedAddress;
  // [END format-suggestion.fetch]
};

// [START format-suggestion.fetch]
async function fetchSuggestions() {
  return fetch(
    `https://shopify.github.io/address-autocomplete/format-suggestion.json`
  );
}
// [END format-suggestion.fetch]
