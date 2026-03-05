/**
 * Input sanitization utilities for production security
 */

/**
 * Strip HTML tags from a string to prevent XSS
 */
export function stripHtml(input: string): string {
    return input.replace(/<[^>]*>/g, "");
}

/**
 * Sanitize a plain text input: trim, strip HTML, limit length
 */
export function sanitizeText(input: unknown, maxLength: number = 500): string {
    if (typeof input !== "string") return "";
    return stripHtml(input).trim().slice(0, maxLength);
}

/**
 * Sanitize an email: trim, lowercase, validate basic format
 */
export function sanitizeEmail(input: unknown): string {
    if (typeof input !== "string") return "";
    return input.trim().toLowerCase().slice(0, 254); // RFC 5321 max
}

/**
 * Sanitize a phone number: keep only digits, +, and spaces
 */
export function sanitizePhone(input: unknown): string {
    if (typeof input !== "string") return "";
    return input
        .replace(/[^\d+\s\-()]/g, "")
        .trim()
        .slice(0, 20);
}

/**
 * Validate that a base64 image string is reasonable
 * Returns the string if valid, empty string if not
 */
export function sanitizeBase64Image(
    input: unknown,
    maxSizeBytes: number = 5 * 1024 * 1024,
): string {
    if (typeof input !== "string" || !input) return "";

    // Must start with a valid image data URI
    if (!input.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,/)) {
        return "";
    }

    // Estimate base64 decoded size (base64 is ~4/3 of original)
    const base64Part = input.split(",")[1] || "";
    const estimatedSize = (base64Part.length * 3) / 4;

    if (estimatedSize > maxSizeBytes) {
        return "";
    }

    return input;
}

/**
 * Sanitize an entire request body object, stripping unexpected fields
 * Only keeps the specified allowed fields
 */
export function pickFields<T extends Record<string, unknown>>(
    body: T,
    allowedFields: string[],
): Partial<T> {
    const result: Partial<T> = {};
    for (const field of allowedFields) {
        if (field in body) {
            result[field as keyof T] = body[field as keyof T];
        }
    }
    return result;
}
