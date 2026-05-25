"""
One-off helper: remove the light/cream background from images/logo.png
by flood-filling transparency from each edge inward.

This preserves any white pixels INSIDE the logo (like the small house window detail)
because we only fill from the outside in, not by global colour matching.
"""

from PIL import Image
from collections import deque


SRC = "images/logo.png"
DST = "images/logo.png"  # overwrite in place
TOLERANCE = 38           # how close to the corner colour counts as "background"


def is_bg(px, ref, tol):
    return (
        abs(px[0] - ref[0]) <= tol
        and abs(px[1] - ref[1]) <= tol
        and abs(px[2] - ref[2]) <= tol
    )


def main():
    img = Image.open(SRC).convert("RGBA")
    w, h = img.size
    pixels = img.load()

    # Sample background colour from the four corners and average them
    corners = [pixels[0, 0], pixels[w - 1, 0], pixels[0, h - 1], pixels[w - 1, h - 1]]
    ref = (
        sum(c[0] for c in corners) // 4,
        sum(c[1] for c in corners) // 4,
        sum(c[2] for c in corners) // 4,
    )
    print(f"Sampled background colour: {ref}")

    # BFS flood-fill from every edge pixel
    visited = [[False] * h for _ in range(w)]
    q = deque()

    for x in range(w):
        for y in (0, h - 1):
            if is_bg(pixels[x, y], ref, TOLERANCE):
                q.append((x, y))
                visited[x][y] = True
    for y in range(h):
        for x in (0, w - 1):
            if is_bg(pixels[x, y], ref, TOLERANCE) and not visited[x][y]:
                q.append((x, y))
                visited[x][y] = True

    removed = 0
    while q:
        x, y = q.popleft()
        # Make transparent
        pixels[x, y] = (255, 255, 255, 0)
        removed += 1

        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                if is_bg(pixels[nx, ny], ref, TOLERANCE):
                    visited[nx][ny] = True
                    q.append((nx, ny))

    print(f"Made {removed:,} pixels transparent ({removed * 100 / (w * h):.1f}%)")

    # Soften edges: any pixel that is still close to the bg colour AND has a
    # transparent neighbour gets partial alpha
    softened = 0
    for x in range(w):
        for y in range(h):
            px = pixels[x, y]
            if px[3] == 0:
                continue
            if not is_bg(px, ref, TOLERANCE + 25):
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and pixels[nx, ny][3] == 0:
                    # Compute alpha based on how close to BG colour we are
                    dist = (
                        abs(px[0] - ref[0])
                        + abs(px[1] - ref[1])
                        + abs(px[2] - ref[2])
                    ) / 3
                    alpha = min(255, int(dist * 4))
                    pixels[x, y] = (px[0], px[1], px[2], alpha)
                    softened += 1
                    break

    print(f"Softened {softened:,} edge pixels")

    img.save(DST, "PNG")
    print(f"Saved → {DST}")


if __name__ == "__main__":
    main()
