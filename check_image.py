from PIL import Image
import sys

def check_transparency(path):
    try:
        img = Image.open(path)
        print(f"Format: {img.format}")
        print(f"Mode: {img.mode}")
        
        if img.mode != 'RGBA':
            print("Image does NOT have an alpha channel (Mode is not RGBA).")
            return

        # Check for actual transparency
        extrema = img.getextrema()
        alpha_extrema = extrema[3]
        print(f"Alpha channel range: {alpha_extrema}")
        
        if alpha_extrema[0] == 255 and alpha_extrema[1] == 255:
             print("Alpha channel is fully opaque to the limit (all 255). No transparency found.")
        else:
             print(f"Image has transparency. Alpha min: {alpha_extrema[0]}, Alpha max: {alpha_extrema[1]}")

        # Check for checkerboard pattern in corners (heuristic)
        # Often these are grey/white squares.
        pixels = img.load()
        corners = [
            pixels[0, 0],
            pixels[10, 0],
            pixels[0, 10],
            pixels[10, 10]
        ]
        print(f"Sample pixels (top-left area): {corners}")

    except Exception as e:
        print(f"Error: {e}")

check_transparency('public/images/maps/level1_icon.png')
