from PIL import Image
import os

def make_transparent(input_path):
    if not os.path.exists(input_path):
        print(f"⚠️ File not found: {input_path}")
        return

    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Detect white or near-white pixels (threshold > 245)
            if item[0] > 245 and item[1] > 245 and item[2] > 245:
                newData.append((255, 255, 255, 0)) # Make it fully transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(input_path, "PNG")
        print(f"✅ Background removed for {input_path}")
    except Exception as e:
        print(f"❌ Error processing {input_path}: {e}")

print("Making logos transparent...")
make_transparent("public/logo.png")
make_transparent("src/app/icon.png")
make_transparent("public/logo-full.png")
print("Done! 🎉")
