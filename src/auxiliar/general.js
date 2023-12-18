export function $(elementId) {
  return document.getElementById(elementId);
}

export function convertToMoney(value) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  };
  if (!value) return "$0";

  const formattedValue = Number(value).toLocaleString("en-US", options);
  return formattedValue.replace(/,/g, ".");
}
