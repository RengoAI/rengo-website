import { format, parseISO } from "date-fns";
import { Decimal } from "decimal.js";

/**
 * Formats a number as a decimal string using decimal.js for precision.
 * @param value The number to format
 * @param decimalPlaces The number of decimal places to display (default: 2)
 * @param thousandsSeparator The character to use as thousands separator (default: ",")
 * @param decimalSeparator The character to use as decimal separator (default: ".")
 * @returns Formatted decimal string
 */
export const formatDecimal = (
  value: number | string | Decimal,
  decimalPlaces: number = 2,
  thousandsSeparator: string = ",",
  decimalSeparator: string = ".",
): string => {
  // Create a Decimal instance
  const decimalValue = new Decimal(value);

  // Format to specified decimal places
  const formattedNumber = decimalValue.toFixed(decimalPlaces);

  // Split number into integer and fraction parts
  const [integerPart, fractionPart] = formattedNumber.split(".");

  // Add thousands separators to integer part
  const integerWithSeparators = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator,
  );

  // Reconstruct the number with decimal separator
  return fractionPart
    ? `${integerWithSeparators}${decimalSeparator}${fractionPart}`
    : integerWithSeparators;
};

/**
 * Formats a number as a percentage string using decimal.js for precision.
 * @param value The number to format (decimal form, e.g., 0.1234 for 12.34%)
 * @param decimalPlaces The number of decimal places to display (default: 2)
 * @param includeSign Whether to include the % sign (default: true)
 * @returns Formatted percentage string
 */
export const formatPercentage = (
  value: number | string | Decimal,
  decimalPlaces: number = 2,
  includeSign: boolean = true,
): string => {
  // Create a Decimal instance
  const decimalValue = new Decimal(value);

  // Convert decimal to percentage by multiplying by 100
  const percentValue = decimalValue.times(100);

  // Use formatDecimal to handle the formatting
  const formattedValue = formatDecimal(percentValue, decimalPlaces);

  // Add % sign if requested
  return includeSign ? `${formattedValue}%` : formattedValue;
};

/**
 * Formats a number as a monetary string using decimal.js for precision.
 * @param value The number to format
 * @param decimalPlaces The number of decimal places to display (default: 2)
 * @param currencySymbol The currency symbol to prepend (default: "$")
 * @param thousandsSeparator The character to use as thousands separator (default: ",")
 * @param decimalSeparator The character to use as decimal separator (default: ".")
 * @param symbolAtEnd Whether to place the currency symbol at the end (default: false)
 * @returns Formatted money string
 */
export const formatMoney = (
  value: number | string | Decimal,
  decimalPlaces: number = 2,
  currencySymbol: string = "$",
  thousandsSeparator: string = ",",
  decimalSeparator: string = ".",
  symbolAtEnd: boolean = false,
): string => {
  // Use formatDecimal to handle the number formatting
  const formattedValue = formatDecimal(
    value,
    decimalPlaces,
    thousandsSeparator,
    decimalSeparator,
  );

  // Add currency symbol at the beginning or end
  return symbolAtEnd
    ? `${formattedValue} ${currencySymbol}`
    : `${currencySymbol}${formattedValue}`;
};

/**
 * Safely parses a date string, handling UTC dates properly
 * @param date Date string, Date object, or number
 * @returns Date object
 */
const parseDate = (date: string | Date | number): Date => {
  if (date instanceof Date) {
    return date;
  }

  if (typeof date === "number") {
    return new Date(date);
  }

  // For string dates, use parseISO to handle ISO date strings properly
  // This avoids timezone conversion issues with date-only strings
  try {
    return parseISO(date);
  } catch {
    // Fallback to regular Date constructor if parseISO fails
    return new Date(date);
  }
};

/**
 * Formats a date as M/d/yyyy, preserving the original date without timezone conversion
 * @param date Date string, Date object, or number
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date | number): string => {
  const parsedDate = parseDate(date);

  // For date-only formatting, we want to avoid timezone shifts
  // Extract the date components directly to ensure we get the intended date
  if (typeof date === "string" && date.includes("T")) {
    // For datetime strings, extract just the date part if it's UTC
    const dateOnly = date.split("T")[0];
    if (dateOnly.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateOnly.split("-").map(Number);
      return `${month}/${day}/${year}`;
    }
  }

  return format(parsedDate, "M/d/yyyy");
};

/**
 * Formats a date as M/dd/yyyy HH:mm:ss
 * @param date Date string, Date object, or number
 * @returns Formatted datetime string
 */
export const formatDateTime = (date: string | Date | number): string => {
  const parsedDate = parseDate(date);
  return format(parsedDate, "M/dd/yyyy HH:mm:ss");
};

/**
 * Formats bytes as a human-readable string with appropriate units.
 * @param bytes The number of bytes to format
 * @param decimals The number of decimal places to display (default: 1)
 * @returns Formatted bytes string (e.g., "1.2 MB", "350 KB", "45 B")
 */
export const formatBytes = (bytes: number, decimals: number = 1): string => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
