export const audioTypes = ['m4a', 'flac', 'mp3', 'mp4', 'wav', 'wma', 'aac'];

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}