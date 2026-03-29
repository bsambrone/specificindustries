const VALID_DIMENSIONS = ["1024x1024", "1536x1024", "1024x1536"] as const;
const VALID_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"] as const;

export function validateDimensions(width: number, height: number): string | null {
  const size = `${width}x${height}`;
  if (!VALID_DIMENSIONS.includes(size as typeof VALID_DIMENSIONS[number])) {
    return `Invalid dimensions: ${size}. Valid options: ${VALID_DIMENSIONS.join(", ")}`;
  }
  return null;
}

export function validateFilename(filename: string): string | null {
  if (filename.includes("/") || filename.includes("\\") || filename.includes("..")) {
    return "Filename must not contain path separators or '..'";
  }

  const ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
  if (!VALID_EXTENSIONS.includes(ext as typeof VALID_EXTENSIONS[number])) {
    return `Invalid file extension: ${ext}. Valid options: ${VALID_EXTENSIONS.join(", ")}`;
  }

  return null;
}
