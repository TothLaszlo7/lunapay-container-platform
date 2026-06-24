export function formatMoney(amount, currency = "HUF", locale = "hu-HU") {
  const n = Number(amount || 0);

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${n.toLocaleString(locale)} ${currency}`;
  }
}