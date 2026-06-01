export const FREE_SHIPPING_THRESHOLD = 5000;
export const SHIPPING_FEE = 99;

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatINR = (amount: number) => inrFormatter.format(amount);
