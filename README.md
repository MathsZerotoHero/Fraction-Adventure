# Fraction Adventure — app version (PWA)

Keep all seven files in **one folder**. They only work together.

| File | What it does |
|---|---|
| `index.html` | The whole app. This is the only file with lessons and questions in it. |
| `manifest.json` | The name tag. Tells the phone the app's name, icon and colours. |
| `sw.js` | The offline helper ("service worker"). Keeps a copy of the app on the phone. |
| `icon-192.png`, `icon-512.png` | The app icon on Android. |
| `apple-touch-icon.png` | The app icon on iPhone and iPad. |

---

## Step 1 — Put the folder online

A phone will only install an app from an **https://** address. Opening the file
from a folder still runs the app, but there will be no install button.

### Option A — GitHub Pages (free, permanent, no command line)

1. Make a free account at **github.com**.
2. Top right **+** → **New repository**.
   Name it `fraction-app`. Choose **Public** (free Pages needs public).
   Do not tick "Add a README". Click **Create repository**.
3. On the empty repo page click **uploading an existing file**.
   Drag in all seven files — the files themselves, not the folder.
4. Scroll down, click **Commit changes**.
5. **Settings** tab → **Pages** in the left sidebar.
   Under *Build and deployment*: Source = **Deploy from a branch**,
   Branch = **main**, folder = **/ (root)**. Click **Save**.
6. Wait 1–2 minutes, refresh the page. Your link appears at the top:
   `https://YOUR-USERNAME.github.io/fraction-app/`

To update later: repo → **Add file** → **Upload files** → drag the changed
files in → *Commit changes*. Same link, new version in about a minute.

### Option B — Netlify Drop (fastest, no account)

1. Go to **https://app.netlify.com/drop**
2. Drag the whole folder onto the page.
3. In about ten seconds you get a link like
   `https://gentle-otter-12345.netlify.app`

Cloudflare Pages and Vercel work the same way as Netlify.

## Step 2 — Install it on a phone or tablet

**Android (Chrome)**
Open the link → a bar appears saying *Install app*.
If it does not appear: menu (⋮) → *Add to Home screen* → *Install*.

**iPhone / iPad (must be Safari, not Chrome)**
Open the link → Share button (□↑) → *Add to Home Screen* → *Add*.

You now have an icon. It opens full screen with no address bar.

## Step 3 — Check that offline works

1. Open the installed app once while online, and tap around a little.
2. Turn on aeroplane mode.
3. Open the app again. It should still work.

The first load needs internet. After that everything is stored on the device.

---

## Changing the app later

1. Edit `index.html`.
2. Open `sw.js` and change the version line near the top:
   `const VERSION = "fraction-adventure-v1";` → `"fraction-adventure-v2"`
   **This step is not optional.** Without it phones keep showing the old version.
3. Drag the folder onto Netlify Drop again (or your host).
4. On the phone, close the app completely and reopen it twice. The new version
   appears on the second open.

## Things worth knowing

- **Progress is per device.** Stars on the tablet are not the stars on the phone.
  Clearing browsing data for the site erases progress.
- **Fonts** load from Google on first open. Offline before that, the app falls
  back to a built-in rounded font and still works.
- **Nothing is uploaded anywhere.** No login, no server, no tracking. Everything
  stays in the browser's own storage on that device.
- **This is not in the Play Store or App Store.** Anyone with the link can
  install it. Getting into the stores needs a wrapper (Capacitor) and a
  developer account.

## Testing on your own computer first

Double-clicking `index.html` works for trying the lessons, but the offline
helper stays off. To test it properly, open a terminal in the folder and run:

    python3 -m http.server 8000

then visit `http://localhost:8000` in Chrome. Service workers are allowed on
localhost, so the install button appears there too.
