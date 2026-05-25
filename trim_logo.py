"""
Trim the transparent padding around images/logo.png so the actual
logo content fills the entire image. This makes the GC mark appear
larger at the same CSS display size.
"""

from PIL import Image


SRC = "images/logo.png"
DST = "images/logo.png"


def main():
    img = Image.open(SRC).convert("RGBA")
    print(f"Original size: {img.size}")

    # getbbox() on an RGBA image returns the bounding box of all
    # non-transparent pixels (i.e. anywhere alpha > 0).
    # We want to be a bit stricter: only count pixels with meaningful
    # opacity, ignoring very faint shadow remnants.
    pixels = img.load()
    w, h = img.size

    min_x, min_y, max_x, max_y = w, h, 0, 0
    threshold = 30  # alpha must be > 30 to count as "real" content

    for y in range(h):
        for x in range(w):
            if pixels[x, y][3] > threshold:
                if x < min_x:
                    min_x = x
                if x > max_x:
                    max_x = x
                if y < min_y:
                    min_y = y
                if y > max_y:
                    max_y = y

    if min_x >= max_x or min_y >= max_y:
        print("No content found, aborting.")
        return

    # Small uniform padding so the logo doesn't touch the very edge
    pad = 12
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(w, max_x + pad)
    max_y = min(h, max_y + pad)

    bbox = (min_x, min_y, max_x + 1, max_y + 1)
    print(f"Content bbox: {bbox}")

    cropped = img.crop(bbox)
    print(f"Cropped size: {cropped.size}")

    cropped.save(DST, "PNG")
    print("Saved trimmed logo.png")


if __name__ == "__main__":
    main()
