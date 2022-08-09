


const detectIfSupportsWebp = async () => {
  if (!self.createImageBitmap) return false;

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}


const record: { loaded: boolean; waiting?: Promise<boolean>; res?: boolean } = {
  loaded: false,
  waiting: undefined,
  res: false
}
export const supportsWebp = async () => {
  if (record.loaded) {
    return record.res as boolean
  }
  if (record.waiting) {
    return record.waiting
  }

  record.waiting = detectIfSupportsWebp().then((flag) => {
    // will only trigger only once
    record.loaded = true
    record.waiting = undefined
    record.res = flag
    return flag
  })

  return record.waiting
}