# Video Compression & Poster Generation

Background videos and their poster frames should be re-encoded before going live so the hero loads fast and looks sharp. This doc is the copy-paste reference.

## Prerequisite

```bash
brew install ffmpeg
```

## What each flag does

- `-movflags +faststart` — moves metadata to the start of the file. **Critical** for web playback; without this the browser can only play once the full file is downloaded.
- `-an` — strips audio. Hero videos are muted, saves ~10%.
- `-crf 26` — quality vs size. Lower = bigger / better. 26 is the sweet spot for web hero loops. Drop to 23 if you see artefacts, raise to 28 for smaller files.
- `scale=1280:-2` — downscales to 1280px wide, auto height. 1080p is overkill for a background loop.
- `-preset slow` — slower encode, smaller output. Worth the wait for one-off compression.

## Compress all hero videos at once

Run from the project root:

```bash
cd client/public/assets/videos
for f in freecompress-castle2-1 freecompress-tent2-3 freecompress-conga2; do
  ffmpeg -i "$f.mp4" -c:v libx264 -preset slow -crf 26 -vf "scale=1280:-2" \
    -an -movflags +faststart -y "$f-web.mp4"
done
```

## Compress the rustic-set and banner videos

```bash
ffmpeg -i woodnew.mp4 -c:v libx264 -preset slow -crf 26 -vf "scale=1280:-2" \
  -an -movflags +faststart -y woodnew-web.mp4

ffmpeg -i 119431_img-2693-172838102348671.mp4 -c:v libx264 -preset slow -crf 26 \
  -vf "scale=1280:-2" -an -movflags +faststart -y 119431_img-2693-web.mp4
```

## Extract poster frames (for `<video poster="...">`)

Grabs a frame ~1s in so you skip black intro frames:

```bash
cd ../images
mkdir -p posters
for f in castle2-1 tent2-3 conga2; do
  ffmpeg -i "../videos/freecompress-$f.mp4" -ss 00:00:01 -vframes 1 \
    -vf "scale=1920:-2" -q:v 2 -y "posters/hero-$f.jpg"
done
ffmpeg -i ../videos/woodnew.mp4 -ss 00:00:02 -vframes 1 \
  -vf "scale=1920:-2" -q:v 2 -y posters/woodnew.jpg
```

## After running the above

Tell Claude (or whoever is in the hot seat) and the new files will get wired into:

- `client/src/pages/Home.jsx` — hero slider video sources and poster attributes
- `client/src/pages/LightingExtras.jsx` — the rustic-set video banner
- `client/index.html` — the `<link rel="preload">` hints for the first hero video + poster

Then delete the originals to keep the repo slim.

## Expected file sizes after compression

| File | Before | After (target) |
|---|---|---|
| `freecompress-castle2-1.mp4` | 4.4 MB | ~1.5 MB |
| `freecompress-tent2-3.mp4` | 4.2 MB | ~1.5 MB |
| `freecompress-conga2.mp4` | 5.1 MB | ~1.8 MB |
| `woodnew.mp4` | 6.3 MB | ~2-3 MB |
| `119431_img-2693-172838102348671.mp4` | 2.6 MB | ~1 MB |
