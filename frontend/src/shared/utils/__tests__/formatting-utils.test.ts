import { Decimal } from "decimal.js";
import { describe, expect, test } from "vitest";
import {
  formatBytes,
  formatDate,
  formatDateTime,
  formatDecimal,
  formatMoney,
  formatPercentage,
} from "../formatting-utils";

describe("formatting-utils", () => {
  describe("formatDecimal", () => {
    test("formats basic decimal values", () => {
      expect(formatDecimal(10.39)).toBe("10.39");
      expect(formatDecimal("10.39")).toBe("10.39");
      expect(formatDecimal(new Decimal("10.39"))).toBe("10.39");
    });

    test("formats with thousands separators", () => {
      expect(formatDecimal(1000)).toBe("1,000.00");
      expect(formatDecimal(1000000)).toBe("1,000,000.00");
      expect(formatDecimal("1234567.89")).toBe("1,234,567.89");
    });

    test("respects decimal places parameter", () => {
      expect(formatDecimal(10.123456, 0)).toBe("10");
      expect(formatDecimal(10.123456, 1)).toBe("10.1");
      expect(formatDecimal(10.123456, 3)).toBe("10.123");
      expect(formatDecimal(10.123456, 5)).toBe("10.12346");
    });

    test("supports custom separators", () => {
      expect(formatDecimal(1234.56, 2, ".", ",")).toBe("1.234,56");
      expect(formatDecimal(1234.56, 2, " ", ".")).toBe("1 234.56");
      expect(formatDecimal(1234.56, 2, "'", ".")).toBe("1'234.56");
    });

    test("handles negative numbers", () => {
      expect(formatDecimal(-1234.56)).toBe("-1,234.56");
      expect(formatDecimal("-1234.56", 1)).toBe("-1,234.6");
    });

    test("handles zero", () => {
      expect(formatDecimal(0)).toBe("0.00");
      expect(formatDecimal(0, 0)).toBe("0");
      expect(formatDecimal(0, 3)).toBe("0.000");
    });
  });

  describe("formatPercentage", () => {
    test("formats basic percentages", () => {
      expect(formatPercentage(0.1234)).toBe("12.34%");
      expect(formatPercentage("0.5")).toBe("50.00%");
      expect(formatPercentage(new Decimal("0.75"))).toBe("75.00%");
    });

    test("respects decimal places parameter", () => {
      expect(formatPercentage(0.123456, 0)).toBe("12%");
      expect(formatPercentage(0.123456, 1)).toBe("12.3%");
      expect(formatPercentage(0.123456, 3)).toBe("12.346%");
      expect(formatPercentage(0.123456, 4)).toBe("12.3456%");
    });

    test("supports excluding percentage sign", () => {
      expect(formatPercentage(0.1234, 2, false)).toBe("12.34");
      expect(formatPercentage(0.5, 1, false)).toBe("50.0");
    });

    test("handles edge cases", () => {
      expect(formatPercentage(0)).toBe("0.00%");
      expect(formatPercentage(1)).toBe("100.00%");
      expect(formatPercentage(-0.1)).toBe("-10.00%");
      expect(formatPercentage(2.5)).toBe("250.00%");
    });

    test("handles very small and large numbers", () => {
      expect(formatPercentage(0.0001, 4)).toBe("0.0100%");
      expect(formatPercentage(10.5, 1)).toBe("1,050.0%"); // includes thousands separator
    });
  });

  describe("formatDate", () => {
    test("formats Date objects", () => {
      const date = new Date(2023, 11, 25); // December 25, 2023
      expect(formatDate(date)).toBe("12/25/2023");
    });

    test("formats date strings", () => {
      expect(formatDate("2023-12-25")).toBe("12/25/2023");
      expect(formatDate("2023-01-01")).toBe("1/1/2023");
      expect(formatDate("2023-12-31")).toBe("12/31/2023");
    });

    test("formats ISO datetime strings", () => {
      expect(formatDate("2023-12-25T10:30:00Z")).toBe("12/25/2023");
      expect(formatDate("2023-01-01T00:00:00.000Z")).toBe("1/1/2023");
    });

    test("formats timestamps", () => {
      const timestamp = new Date(2023, 11, 25).getTime();
      expect(formatDate(timestamp)).toBe("12/25/2023");
    });

    test("handles various date formats", () => {
      expect(formatDate("2023-02-28")).toBe("2/28/2023");
      expect(formatDate("2024-02-29")).toBe("2/29/2024"); // leap year
    });
  });

  describe("formatDateTime", () => {
    test("formats Date objects with time", () => {
      const date = new Date(2023, 11, 25, 14, 30, 45); // December 25, 2023 2:30:45 PM
      expect(formatDateTime(date)).toBe("12/25/2023 14:30:45");
    });

    test("formats datetime strings", () => {
      // Note: These tests might be timezone-dependent, so we'll test the format structure
      const result = formatDateTime("2023-12-25T14:30:45Z");
      expect(result).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
    });

    test("formats timestamps with time", () => {
      const timestamp = new Date(2023, 11, 25, 9, 15, 30).getTime();
      expect(formatDateTime(timestamp)).toBe("12/25/2023 09:15:30");
    });

    test("includes seconds in output", () => {
      const date = new Date(2023, 0, 1, 0, 0, 0); // January 1, 2023 midnight
      expect(formatDateTime(date)).toBe("1/01/2023 00:00:00");
    });

    test("handles various time formats", () => {
      const morning = new Date(2023, 5, 15, 8, 5, 12); // June 15, 2023 8:05:12 AM
      expect(formatDateTime(morning)).toBe("6/15/2023 08:05:12");

      const evening = new Date(2023, 5, 15, 20, 45, 0); // June 15, 2023 8:45:00 PM
      expect(formatDateTime(evening)).toBe("6/15/2023 20:45:00");
    });
  });

  describe("formatBytes", () => {
    test("handles zero bytes", () => {
      expect(formatBytes(0)).toBe("0 B");
    });

    test("formats bytes under 1024", () => {
      expect(formatBytes(1)).toBe("1 B");
      expect(formatBytes(512)).toBe("512 B");
      expect(formatBytes(1023)).toBe("1023 B");
    });

    test("formats KB range", () => {
      expect(formatBytes(1024)).toBe("1 KB");
      expect(formatBytes(1536)).toBe("1.5 KB");
      expect(formatBytes(2048)).toBe("2 KB");
    });

    test("formats MB range", () => {
      expect(formatBytes(1048576)).toBe("1 MB");
      expect(formatBytes(1572864)).toBe("1.5 MB");
      expect(formatBytes(10485760)).toBe("10 MB");
    });

    test("formats GB range", () => {
      expect(formatBytes(1073741824)).toBe("1 GB");
      expect(formatBytes(1610612736)).toBe("1.5 GB");
      expect(formatBytes(10737418240)).toBe("10 GB");
    });

    test("formats TB range", () => {
      expect(formatBytes(1099511627776)).toBe("1 TB");
      expect(formatBytes(1649267441664)).toBe("1.5 TB");
    });

    test("respects decimal places parameter", () => {
      expect(formatBytes(1536, 0)).toBe("2 KB");
      expect(formatBytes(1536, 1)).toBe("1.5 KB");
      expect(formatBytes(1536, 2)).toBe("1.5 KB"); // trailing zeros are removed
      expect(formatBytes(1536, 3)).toBe("1.5 KB"); // trailing zeros are removed
      // Test with value that actually has multiple decimals
      expect(formatBytes(1587, 2)).toBe("1.55 KB");
      expect(formatBytes(1587, 1)).toBe("1.5 KB");
    });

    test("handles negative decimal places", () => {
      expect(formatBytes(1536, -1)).toBe("2 KB");
    });

    test("formats larger units", () => {
      expect(formatBytes(1125899906842624)).toBe("1 PB"); // 1 PB
      expect(formatBytes(1152921504606846976)).toBe("1 EB"); // 1 EB
    });
  });

  describe("formatMoney", () => {
    test("formats basic money values", () => {
      expect(formatMoney("10.39")).toBe("$10.39");
      expect(formatMoney(100)).toBe("$100.00");
      expect(formatMoney("1000")).toBe("$1,000.00");
    });

    test("respects custom decimal places", () => {
      expect(formatMoney("10.123", 0)).toBe("$10");
      expect(formatMoney("10.123", 1)).toBe("$10.1");
      expect(formatMoney("10.123", 3)).toBe("$10.123");
    });

    test("respects custom currency symbol", () => {
      expect(formatMoney("10.39", 2, "€")).toBe("€10.39");
      expect(formatMoney("10.39", 2, "¥")).toBe("¥10.39");
    });

    test("supports symbol at end", () => {
      expect(formatMoney("10.39", 2, "USD", ",", ".", true)).toBe("10.39 USD");
    });
  });
});
