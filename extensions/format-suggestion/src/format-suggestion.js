// [START format-suggestion.ext-target]
export default async () => {
  // [END format-suggestion.ext-target]

  // [START format-suggestion.attribute]
  const { selectedSuggestion, acceptedAddressInputFields } = shopify.target;
  // [END format-suggestion.attribute]

  // [START format-suggestion.fetch]
  const response = await fetchSuggestions();

  const { result } = await response.json();

  const { formattedAddress } = result.suggestions.find(
    ({ global_address_key }) => global_address_key === selectedSuggestion.id
  );

  return {
    formattedAddress: toFormattedAddress(
      formattedAddress,
      acceptedAddressInputFields
    ),
  };
  // [END format-suggestion.fetch]
};

// [START format-suggestion.fetch]
async function fetchSuggestions() {
  return fetch(
    `https://shopify.github.io/address-autocomplete/format-suggestion.json`
  );
}
// [END format-suggestion.fetch]

// [START format-suggestion.accepted-fields]
/**
 * Always return `address1` and `address2`. Keep `addressLineComponents` only for the
 * components the buyer's country accepts, so a country that collects the street name
 * and number separately receives them as separate values.
 */
function toFormattedAddress(
  { addressLineComponents, ...address },
  acceptedAddressInputFields = []
) {
  const acceptedComponents = Object.fromEntries(
    Object.entries(addressLineComponents ?? {}).filter(([field]) =>
      acceptedAddressInputFields.includes(field)
    )
  );

  if (Object.keys(acceptedComponents).length === 0) {
    return address;
  }

  return { ...address, addressLineComponents: acceptedComponents };
}
// [END format-suggestion.accepted-fields]
