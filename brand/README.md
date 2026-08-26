# brand

Source for social and profile assets. Everything here borrows its tokens from
`../styles.css` on purpose, so the site and the profile stay the same object.
If a colour changes there, change it here and re-render.

## X / Twitter banner

| File | Use |
| --- | --- |
| `x-banner.html` | Source. Edit this, never the PNGs. |
| `x-banner.png` | 3000x1000 (2x). **This is the one to upload.** |
| `x-banner-1500x500.png` | 1x fallback if a client rejects the 2x file. |

X wants 3:1. Uploading at 2x keeps it sharp on retina and X downsamples the
rest.

### Re-rendering

Requires Chrome and a network connection (the banner pulls JetBrains Mono and
Inter from Google Fonts, same as the site).

```bash
cd brand
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1500,500 \
  --virtual-time-budget=6000 \
  --screenshot=x-banner.png "file://$PWD/x-banner.html"
```

Drop `--force-device-scale-factor=2` for the 1x version.

### Layout constraints worth knowing before you edit

- **Bottom-left stays dark.** X drops the avatar over that corner. The content
  stack is centred so the two never collide, but do not move anything down and
  left.
- **Separators need opacity >= 0.15.** X scales the banner down hard on a
  phone; anything fainter disappears.
- **No horizontal crop to design around.** X preserves 3:1 and scales, so the
  full width survives. Legibility at small sizes is the real constraint, not
  cropping.

### The copy

The banner says one thing: `attempt 1 -> 429`, `attempt 2 -> 200 OK`,
`SUCCEEDED`, then *your agent never saw the 429.* That last line is the pitch,
and it is deliberately the same claim the X replies keep making. If you rewrite
it, keep it concrete. A generic tagline in a sans-serif would undo the point of
the terminal styling.
