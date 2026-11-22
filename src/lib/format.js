export const formatPrice = (value) =>
  new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(
    Number(value) || 0,
  );

export const formatDate = (value) =>
  new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export const imageUrl = (path) =>
  path?.startsWith("/") ? path : "/images/filtru-aer.jpg";
