/**
 * Utility functions for handling video URLs and player functionality
 */

/**
 * Convert a regular YouTube URL to an embeddable format
 * @param url - YouTube URL (watch or embed format)
 * @returns Embeddable YouTube URL
 */
export function getEmbeddableYouTubeUrl(url: string): string {
    // If already in embed format, return as is
    if (url.includes("/embed/")) {
        return url;
    }

    // Extract video ID from various YouTube URL formats
    const videoIdMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );

    if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }

    // If we can't parse it, return the original URL
    return url;
}

/**
 * Extract video ID from YouTube URL
 * @param url - YouTube URL
 * @returns Video ID or null if not found
 */
export function getYouTubeVideoId(url: string): string | null {
    const match = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
}

/**
 * Generate thumbnail URL for YouTube video
 * @param url - YouTube URL
 * @param quality - Thumbnail quality ('default', 'medium', 'high', 'standard', 'maxres')
 * @returns Thumbnail URL
 */
export function getYouTubeThumbnail(
    url: string,
    quality: "default" | "medium" | "high" | "standard" | "maxres" = "medium"
): string {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
        return "";
    }

    const qualityMap = {
        default: "default",
        medium: "mqdefault",
        high: "hqdefault",
        standard: "sddefault",
        maxres: "maxresdefault",
    };

    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Validate if a URL is a valid YouTube video URL
 * @param url - URL to validate
 * @returns Boolean indicating if URL is valid YouTube video
 */
export function isValidYouTubeUrl(url: string): boolean {
    const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/;
    return youtubeRegex.test(url);
}

/**
 * Parse duration string to seconds
 * @param duration - Duration string (e.g., "15 min", "1h 30min", "45s")
 * @returns Duration in seconds
 */
export function parseDurationToSeconds(duration: string): number {
    const hourMatch = duration.match(/(\d+)h/);
    const minuteMatch = duration.match(/(\d+)\s*min/);
    const secondMatch = duration.match(/(\d+)s/);

    let totalSeconds = 0;

    if (hourMatch) {
        totalSeconds += parseInt(hourMatch[1]) * 3600;
    }

    if (minuteMatch) {
        totalSeconds += parseInt(minuteMatch[1]) * 60;
    }

    if (secondMatch) {
        totalSeconds += parseInt(secondMatch[1]);
    }

    return totalSeconds;
}

/**
 * Format seconds to readable duration string
 * @param seconds - Duration in seconds
 * @returns Formatted duration string
 */
export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}min`;
    } else if (minutes > 0) {
        return `${minutes}min ${
            remainingSeconds > 0 ? `${remainingSeconds}s` : ""
        }`.trim();
    } else {
        return `${remainingSeconds}s`;
    }
}
