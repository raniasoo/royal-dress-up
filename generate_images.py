import openai
import urllib.request
import os
import time
import sys

API_KEY = sys.argv[1] if len(sys.argv) > 1 else ""
client = openai.OpenAI(api_key=API_KEY)

BASE = os.path.join("C:", os.sep, "projects", "royal-dress-up", "public", "dresses")
SUFFIX = ", professional fashion photography, studio lighting, clean white background, no face visible, high detail, 4K"
FLAT_LAY_SUFFIX = ", flat-lay photography, top-down view, garment laid flat on white background, no mannequin, no model, no hanger, wrinkle-free, high detail, 4K"
ACC_SUFFIX = ", product photography, studio lighting, white background, elegant display, macro detail, 4K"

DRESSES = [
    ("diana-revenge", "A stunning black off-shoulder mini cocktail dress, Christina Stambolian design, silk chiffon with asymmetric hemline, fitted bodice with draped neckline, 1990s glamour style, bold and elegant"),
    ("diana-wedding", "An extravagant ivory silk taffeta wedding gown with dramatic long train, romantic puffy sleeves, lace bodice adorned with sequins and pearls, Emanuel design, 1980s royal wedding style"),
    ("diana-travolta", "A midnight blue velvet off-shoulder evening gown, full-length A-line silhouette, fitted bodice, flowing skirt, 1980s elegant ballroom style, rich deep navy velvet fabric"),
    ("kate-engagement", "A royal blue jersey wrap dress, knee-length, long sleeves, V-neckline with wrapped bodice, elegant and accessible style, 2010s contemporary fashion"),
    ("kate-wedding", "A white satin gazaar wedding gown with delicate lace sleeves, V-neckline, fitted bodice, long train, hand-cut English and French Chantilly lace applique with floral motifs"),
    ("kate-red-korea", "An elegant red A-line evening dress, fitted waist, long sleeves, midi length, sophisticated silhouette, 2020s modern royal style, rich crimson red fabric"),
    ("elizabeth-coronation", "A white satin coronation gown with elaborate gold and silver thread embroidery of Commonwealth flowers, regal and majestic, 1950s royal ceremonial dress"),
    ("daphne-wedding", "A Regency era ivory silk wedding gown with silver embroidery, empire waistline, puff sleeves, delicate lace trim, early 1800s English aristocratic style"),
    ("daphne-blue-ball", "A pastel blue Regency era ball gown, empire waistline, short puff sleeves, floor-length flowing skirt, delicate floral embroidery, early 1800s debutante style"),
    ("charlotte-gold", "An extravagant gold court gown with elaborate gold thread embroidery and jewel embellishments, massive skirt with corset bodice, 18th century Georgian royal court fashion"),
    ("penelope-yellow", "A bright yellow Regency era dress, empire waistline, puff sleeves with ribbon details, floor-length, ornate style, early 1800s English society fashion"),
    ("marie-robe", "An elaborate Robe a la Francaise, wide pannier silhouette, pastel pink and cream silk with floral embroidery, extensive lace trim, 18th century French Rococo court fashion"),
    ("meghan-givenchy-wedding", "A minimalist white bateau neckline wedding gown, pure white silk cady fabric, clean lines, six seams on bodice, three-quarter sleeves, modern understated elegance"),
    ("meghan-stella-reception", "A lily white halterneck evening dress, high neck with open back, silk crepe fabric, floor-length, sleek modern Hollywood glamour, contemporary minimalist design"),
    ("grace-kelly-wedding", "A classic 1950s wedding gown with high neckline, long lace sleeves, full skirt, Brussels rose point lace bodice, timeless elegance, Old Hollywood glamour bridal gown"),
    ("grace-kelly-blue-chiffon", "An ice blue chiffon evening gown, flowing ethereal fabric, floor-length, 1950s Hollywood glamour, French Riviera elegance, elegant and dreamy"),
]

ACCESSORIES = [
    ("spencer-tiara", "An ornate diamond tiara with central floral motifs and scrollwork design, multiple diamond flowers and tulip shapes, platinum and diamonds, 1930s Art Deco influenced design"),
    ("lovers-knot-tiara", "An elegant tiara featuring 19 hanging oriental pearls within diamond lover knot arches, platinum set with diamonds and drop pearls, extremely detailed and delicate"),
    ("diana-pearl-choker", "A multi-strand pearl choker necklace with a large sapphire and diamond brooch as centerpiece, multiple rows of creamy white pearls, blue sapphire cabochon surrounded by diamonds"),
    ("kate-sapphire-earrings", "A pair of sapphire and diamond drop earrings, oval blue sapphire surrounded by small brilliant diamonds, delicate platinum setting"),
    ("diana-clutch", "An elegant black leather clutch bag, sleek rectangular shape, minimal hardware, 1990s sophisticated style, smooth leather with subtle gold clasp"),
    ("elizabeth-gloves", "A pair of white silk ceremonial gloves with delicate embroidery on the back, 1953 coronation style, fine stitching details"),
    ("kate-pumps", "A pair of nude patent leather stiletto pumps, pointed toe, 3-inch heel, classic and elegant, glossy finish"),
    ("diana-sapphire-ring", "A stunning 12-carat oval Ceylon blue sapphire engagement ring surrounded by 14 solitaire diamonds in white gold setting, iconic cluster ring"),
    ("elizabeth-diadem", "A magnificent diamond diadem crown featuring 1333 diamonds and pearls, cross pattee and fleur-de-lis design, 1820 George IV commission"),
    ("marie-necklace", "An extraordinary diamond necklace with 647 diamonds totaling 2800 carats, elaborate multi-strand design, 18th century French royal jewelry, cascading rows of brilliant diamonds"),
    ("charlotte-tiara", "A large ornate crystal tiara with towering design, hundreds of crystals and rhinestones, Regency era dramatic crown style, tall and imposing"),
    ("meghan-aquamarine-ring", "A large emerald-cut aquamarine cocktail ring flanked by small diamonds in yellow gold setting, vivid pale blue aquamarine gemstone, statement piece"),
    ("meghan-queen-mary-tiara", "A diamond bandeau tiara with Art Deco design, flexible platinum band set with brilliant diamonds, center brooch with 10 diamonds, geometric patterns"),
    ("grace-kelly-hermes", "A classic structured leather handbag in tan cognac brown, trapezoid shape, single top handle, turn-lock closure, 1950s iconic design, elegant and timeless"),
    ("kate-cartier-halo", "A Cartier Halo tiara with 739 brilliant-cut diamonds and 149 baguette-cut diamonds, scroll motif design, 1936 Art Deco style, sparkling"),
]

def generate(slug, prompt, is_accessory=False, flat_lay=False, force=False):
    suffix = ACC_SUFFIX if is_accessory else (FLAT_LAY_SUFFIX if flat_lay else SUFFIX)
    full_prompt = prompt + suffix
    subdir = "flat-lay" if flat_lay else ""
    out_dir = os.path.join(BASE, slug, subdir) if subdir else os.path.join(BASE, slug)
    out_name = "garment.png" if flat_lay else "catalog.png"
    out_path = os.path.join(out_dir, out_name)

    if not force and os.path.exists(out_path):
        print(f"  SKIP (exists): {slug} {'[flat-lay]' if flat_lay else ''}")
        return True

    os.makedirs(out_dir, exist_ok=True)

    try:
        # flat-lay는 세로 비율로 생성 (Fashn 처리 해상도 864x1296에 근접)
        size = "1024x1024" if is_accessory else ("1024x1792" if flat_lay else "1024x1024")
        response = client.images.generate(
            model="dall-e-3",
            prompt=full_prompt,
            size=size,
            quality="standard",
            n=1,
        )
        url = response.data[0].url
        urllib.request.urlretrieve(url, out_path)
        size_kb = os.path.getsize(out_path) // 1024
        print(f"  OK: {slug} ({size_kb}KB) {'[flat-lay]' if flat_lay else ''}")
        return True
    except Exception as e:
        print(f"  FAIL: {slug} - {e}")
        return False

mode = sys.argv[2] if len(sys.argv) > 2 else "all"
force = "--force" in sys.argv

if mode == "flat-lay":
    # flat-lay 가먼트 이미지만 생성 (AI 피팅용)
    print(f"=== Generating {len(DRESSES)} flat-lay garment images ===")
    print()
    success = 0
    fail = 0
    for slug, prompt in DRESSES:
        ok = generate(slug, prompt, flat_lay=True, force=force)
        if ok: success += 1
        else: fail += 1
        time.sleep(1)
    print(f"\n=== Done: {success} success, {fail} fail ===")
else:
    # 기존 catalog + accessories 생성
    print(f"=== Generating {len(DRESSES)} dresses + {len(ACCESSORIES)} accessories ===")
    print()
    success = 0
    fail = 0

    print("--- Dresses (catalog) ---")
    for slug, prompt in DRESSES:
        ok = generate(slug, prompt, is_accessory=False)
        if ok: success += 1
        else: fail += 1
        time.sleep(1)

    print()
    print("--- Accessories ---")
    for slug, prompt in ACCESSORIES:
        ok = generate(slug, prompt, is_accessory=True)
        if ok: success += 1
        else: fail += 1
        time.sleep(1)

    print()
    print(f"=== Done: {success} success, {fail} fail (+ 1 already done = {success+1} total) ===")
