"""
Recolor the black 'GG' mark in images/logo.png to white,
while keeping the brown wood-grain panels and window detail intact.

We classify each pixel:
  - Neutral (low saturation, low brightness)  -> the black GG mark -> WHITE
  - Warm / saturated                          -> brown wood        -> UNCHANGED
  - Transparent                               -> UNCHANGED
"""

from PIL import Image


SRC = "images/logo.png"
DST = "images/logo.png"   # overwrite in place


def main():
    img = Image.open(SRC).convert("RGBA")
    pixels = list(img.getdata())
    out = []
    recolored = 0

    for r, g, b, a in pixels:
        if a == 0:
            out.append((r, g, b, a))
            continue

        max_c = max(r, g, b)
        min_c = min(r, g, b)
        # Saturation 0..1 (chroma over value)
        sat = (max_c - min_c) / max_c if max_c > 0 else 0
        brightness = (r + g + b) / 3.0

        # A "black GG mark" pixel = grayscale-ish AND not very bright
        is_neutral_dark = sat < 0.20 and brightness < 130

        if is_neutral_dark:
            # Invert: 0 -> 255 (so pure black -> pure white,
            # and mid-grey edges -> light-grey for natural anti-aliasing).
            out.append((255 - r, 255 - g, 255 - b, a))
            recolored += 1
        else:
            out.append((r, g, b, a))

    img.putdata(out)
    img.save(DST, "PNG")
    print(f"Recolored {recolored:,} pixels ({recolored * 100 / len(pixels):.1f}%) to white")
    print("Saved logo.png")


if __name__ == "__main__":
    main()
