/**
 * formatUtils.ts
 *
 * Utility functions for formatting data in the application.
 * These functions handle formatting of numbers, currencies, percentages, and dates.
 */

/**
 * Format a number as currency (USD)
 * @param value The number to format
 * @param minimumFractionDigits Minimum number of fraction digits (default: 2)
 * @param maximumFractionDigits Maximum number of fraction digits (default: 2)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
): string => {
  // For very small values, use more decimal places
  if (value > 0 && value < 0.01) {
    minimumFractionDigits = 6;
    maximumFractionDigits = 6;
  }

  // For large values, use fewer decimal places
  if (value >= 1000) {
    minimumFractionDigits = 0;
    maximumFractionDigits = 2;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

/**
 * Format a number as a percentage
 * @param value The number to format (e.g., 0.05 for 5%)
 * @param minimumFractionDigits Minimum number of fraction digits (default: 2)
 * @param maximumFractionDigits Maximum number of fraction digits (default: 2)
 * @returns Formatted percentage string
 */
export const formatPercentage = (
  value: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100); // Divide by 100 because the API returns percentages as absolute values
};

/**
 * Format a large number with abbreviations (K, M, B, T)
 * @param value The number to format
 * @param minimumFractionDigits Minimum number of fraction digits (default: 0)
 * @param maximumFractionDigits Maximum number of fraction digits (default: 1)
 * @returns Formatted number string with abbreviation
 */
export const formatLargeNumber = (
  value: number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 1,
): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return "N/A";
  }

  if (value < 1000) {
    return value.toFixed(minimumFractionDigits);
  }

  const abbreviations = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  if (tier >= abbreviations.length) {
    return "Value too large";
  }

  const suffix = abbreviations[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;

  return `${scaled.toFixed(maximumFractionDigits)}${suffix}`;
};

/**
 * Format a date as a string
 * @param timestamp The timestamp to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  timestamp: number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
): string => {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(timestamp));
};

/**
 * Format a relative time (e.g., "2 hours ago")
 * @param timestamp The timestamp to format
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  // Convert milliseconds to seconds
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) {
    return "just now";
  }

  // Convert seconds to minutes
  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  // Convert minutes to hours
  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  // Convert hours to days
  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  // Convert days to months
  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  // Convert months to years
  const years = Math.floor(months / 12);

  return `${years} year${years === 1 ? "" : "s"} ago`;
};
