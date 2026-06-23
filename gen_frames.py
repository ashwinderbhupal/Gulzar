"""
Placeholder hero-frame generator for the Gulzar Construction scroll hero.
Renders a luxury home assembling itself layer-by-layer on a pure-black void,
with a slow orbit. Pure-black background so it blends with the page.

This is a drop-in stand-in for the Higgsfield AI video frames. Once the
Higgsfield connector is reconnected, replace public/frames/*.jpg and
public/hero.mp4 with the real exports — no code changes needed.
"""
import math, os
from PIL import Image, ImageDraw

W, H = 1920, 1080
FPS = 24
SECONDS = 5
N = FPS * SECONDS            # 120 frames
OUT = os.path.join(os.path.dirname(__file__), "public", "frames")
os.makedirs(OUT, exist_ok=True)

# Brand palette
BLACK   = (0, 0, 0)
TIMBER  = (139, 94, 60)      # #8B5E3C accent
TIMBER_HI = (176, 124, 80)   # #B07C50 hover
CONCRETE = (58, 58, 60)
CONCRETE_HI = (84, 84, 88)
STEEL   = (120, 122, 128)
STEEL_HI = (158, 160, 168)
GLASS   = (38, 48, 58)
GLASS_GLOW = (208, 176, 130) # warm interior light
ROOF    = (30, 30, 32)
ROOF_HI = (54, 54, 58)

def ease(t):
    # easeInOutCubic
    t = max(0.0, min(1.0, t))
    return 4*t*t*t if t < 0.5 else 1 - pow(-2*t + 2, 3)/2

def phase(g, start, end):
    """0->1 progress of this layer given global progress g over [start,end]."""
    if g <= start: return 0.0
    if g >= end: return 1.0
    return ease((g - start) / (end - start))

# Isometric-ish projection with a rotating azimuth for the orbit feel.
def project(x, y, z, cx, cy, scale, az):
    ca, sa = math.cos(az), math.sin(az)
    rx = x * ca - y * sa
    ry = x * sa + y * ca
    sx = cx + (rx - ry) * 0.866 * scale
    sy = cy - (rx + ry) * 0.5 * scale - z * scale
    return (sx, sy)

# Building footprint half-extents and storey height
HX, HY, HZ = 2.4, 1.4, 1.0   # width, depth, storey height
FLOORS = 2

for f in range(N):
    g = f / (N - 1)
    img = Image.new("RGB", (W, H), BLACK)
    draw = ImageDraw.Draw(img, "RGBA")

    cx, cy = W * 0.5, H * 0.62
    scale = 150
    # slow clockwise orbit: start front-right, settle to front
    az = math.radians(38) - ease(g) * math.radians(20)

    def P(x, y, z): return project(x, y, z, cx, cy, scale, az)
    def quad(p, fill, outline=None, ow=1):
        draw.polygon(p, fill=fill, outline=outline)
        if outline and ow > 1:
            for i in range(len(p)):
                draw.line([p[i], p[(i+1) % len(p)]], fill=outline, width=ow)

    def box_faces(x0, y0, z0, x1, y1, z1, top, side_l, side_r, outline=None, ow=1):
        t = [P(x0,y0,z1), P(x1,y0,z1), P(x1,y1,z1), P(x0,y1,z1)]
        l = [P(x0,y0,z0), P(x1,y0,z0), P(x1,y0,z1), P(x0,y0,z1)]
        r = [P(x1,y0,z0), P(x1,y1,z0), P(x1,y1,z1), P(x1,y0,z1)]
        quad(r, side_r, outline, ow)
        quad(l, side_l, outline, ow)
        quad(t, top, outline, ow)

    # Faint ground reflection line fades in early then out
    refl = phase(g, 0.02, 0.12) * (1 - phase(g, 0.85, 1.0))
    if refl > 0.01:
        ga = int(40 * refl)
        draw.line([(W*0.18, H*0.74), (W*0.82, H*0.74)], fill=(*TIMBER, ga), width=2)

    # choreography timeline
    p_slab  = phase(g, 0.06, 0.20)
    p_frame = phase(g, 0.18, 0.40)
    p_floor = phase(g, 0.34, 0.50)
    p_walls = phase(g, 0.46, 0.64)
    p_roof  = phase(g, 0.60, 0.74)
    p_glass = phase(g, 0.70, 0.86)
    p_clad  = phase(g, 0.80, 0.97)

    drop = lambda p, d: (1 - p) * d

    # 1) Concrete slab foundation
    if p_slab > 0:
        dz = drop(p_slab, 2.2)
        box_faces(-HX-0.15, -HY-0.15, -0.18+dz, HX+0.15, HY+0.15, 0.0+dz,
                  top=(*CONCRETE_HI, int(255*p_slab)),
                  side_l=(*CONCRETE, int(255*p_slab)),
                  side_r=(*tuple(int(c*0.8) for c in CONCRETE), int(255*p_slab)),
                  outline=(*TIMBER, int(90*p_slab)), ow=1)

    # 2) Structural frame
    if p_frame > 0:
        posts = [(-HX,-HY),(HX,-HY),(HX,HY),(-HX,HY)]
        top_h = HZ*FLOORS * p_frame
        lw = max(2, int(7*scale/150))
        for (px,py) in posts:
            draw.line([P(px,py,0), P(px,py,top_h)], fill=(*STEEL_HI, int(255*p_frame)), width=lw)
        if p_frame > 0.5:
            ba = (p_frame-0.5)/0.5
            ring = [P(px,py,top_h) for (px,py) in posts]
            for i in range(4):
                draw.line([ring[i], ring[(i+1)%4]], fill=(*STEEL, int(255*ba)), width=max(2,int(6*scale/150)))

    # 3) Floor plates
    if p_floor > 0:
        for fl in range(1, FLOORS+1):
            z = HZ*fl
            slide = (1-p_floor)*1.6
            box_faces(-HX+slide, -HY, z-0.06, HX+slide, HY, z,
                      top=(*CONCRETE_HI, int(220*p_floor)),
                      side_l=(*CONCRETE, int(220*p_floor)),
                      side_r=(*tuple(int(c*0.8) for c in CONCRETE), int(220*p_floor)))

    # 4) Wall panels close
    if p_walls > 0:
        a = int(255*p_walls)
        box_faces(-HX, HY-0.05, 0, HX, HY, HZ*FLOORS,
                  top=(*ROOF, a), side_l=(*CONCRETE, a), side_r=(*CONCRETE_HI, a))
        box_faces(HX-0.05, -HY, 0, HX, HY, HZ*FLOORS,
                  top=(*ROOF, a), side_l=(*CONCRETE_HI, a), side_r=(*CONCRETE, a))

    # 5) Roof descends and seats
    if p_roof > 0:
        dz = drop(p_roof, 1.4)
        z0 = HZ*FLOORS
        box_faces(-HX-0.12, -HY-0.12, z0+dz, HX+0.12, HY+0.12, z0+0.16+dz,
                  top=(*ROOF_HI, int(255*p_roof)),
                  side_l=(*ROOF, int(255*p_roof)),
                  side_r=(*tuple(int(c*0.7) for c in ROOF_HI), int(255*p_roof)),
                  outline=(*TIMBER, int(120*p_roof)), ow=1)

    # 6) Glazing fills openings (warm glow)
    if p_glass > 0:
        a = int(255*p_glass)
        glow = int(160 * p_glass)
        for fl in range(FLOORS):
            z0 = fl*HZ + 0.12
            z1 = (fl+1)*HZ - 0.06
            n = 4
            for i in range(n):
                x0 = -HX + 0.18 + i*(2*HX-0.36)/n
                x1 = x0 + (2*HX-0.36)/n - 0.10
                pnl = [P(x0,-HY,z0), P(x1,-HY,z0), P(x1,-HY,z1), P(x0,-HY,z1)]
                quad(pnl, (*GLASS, a), outline=(*TIMBER, int(80*p_glass)))
                inner = [P(x0+0.03,-HY,z0+0.05), P(x1-0.03,-HY,z0+0.05),
                         P(x1-0.03,-HY,z1-0.05), P(x0+0.03,-HY,z1-0.05)]
                quad(inner, (*GLASS_GLOW, glow))

    # 7) Warm timber cladding wraps the facade last
    if p_clad > 0:
        a = int(235*p_clad)
        for k in range(7):
            z0 = k*(HZ*FLOORS)/7
            z1 = (k+1)*(HZ*FLOORS)/7 - 0.02
            shade = 0.82 + 0.18*((k % 2))
            col = tuple(int(c*shade) for c in TIMBER)
            pnl2 = [P(HX,0.0,z0), P(HX,HY,z0), P(HX,HY,z1), P(HX,0.0,z1)]
            quad(pnl2, (*col, a))
        fascia = [P(-HX-0.12,-HY-0.12,HZ*FLOORS+0.16), P(HX+0.12,-HY-0.12,HZ*FLOORS+0.16),
                  P(HX+0.12,-HY-0.12,HZ*FLOORS+0.20), P(-HX-0.12,-HY-0.12,HZ*FLOORS+0.20)]
        quad(fascia, (*TIMBER_HI, a))

    img.save(os.path.join(OUT, f"frame_{f+1:04d}.jpg"), quality=88)

print(f"FRAME_COUNT={N}")
