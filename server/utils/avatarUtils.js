const toDataUrl = (avatar) => {
  if (!avatar) return null;
  const bufferSource = avatar.data || avatar.buffer;
  if (!bufferSource) return null;
  const buffer = Buffer.from(bufferSource);
  const mime = avatar.contentType || "image/jpeg";
  return `data:${mime};base64,${buffer.toString("base64")}`;
};

const fromDataUrl = (dataUrl) => {
  if (!dataUrl || typeof dataUrl !== "string") return null;
  const trimmed = dataUrl.trim();
  if (!trimmed) return null;
  const matches = trimmed.match(/^data:(.+);base64,(.+)$/);
  if (!matches) return null;
  const mime = matches[1] || "image/jpeg/png/jpg/gif";
  try {
    const buffer = Buffer.from(matches[2], "base64");
    return { data: buffer, contentType: mime };
  } catch {
    return null;
  }
};

module.exports = {
  toDataUrl,
  fromDataUrl,
};
