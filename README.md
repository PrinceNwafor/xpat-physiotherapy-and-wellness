# Xpat Physiotherapy &amp; Wellness — Demo Website Preview

A fast, mobile-first, **booking-first** website preview built for
**Xpat Physiotherapy &amp; Wellness** — a physiotherapy clinic in Port Harcourt, Nigeria
(`@xpat.physiotherapy`).

Pure **HTML + CSS + vanilla JS**. No build step, no dependencies, no framework.
The whole site is a single page (`index.html`) so it loads fast and the clinic
can read, own and customise it easily.

> This is a **preview/demo**. A green “PREVIEW” banner sits at the very top — delete
> that one line in `index.html` once the clinic approves the design.

---

## 🚀 Run it locally

Because it’s plain static files, you can simply **double-click `index.html`** to open
it in a browser. For the best experience (so videos and relative paths behave exactly
like production), serve it locally:

```bash
# from inside the xpat-physiotherapy-and-wellness/ folder

# Option A — Python (already on most machines)
python -m http.server 5173
#   → open http://localhost:5173

# Option B — Node (if you have it)
npx serve .
#   → open the URL it prints

# Option C — VS Code
# Right-click index.html → “Open with Live Server”
```

## 🏗️ Build command

**There is no build step.** What you see is what ships — just upload the folder.
“Building” = copying these files to any static host (GitHub Pages, Netlify, Vercel,
cPanel, etc.).

---

## 🌍 Live URL & route

The site is designed to live at the slug **`/xpat-physiotherapy-and-wellness`**.
On GitHub Pages the repo name becomes that slug automatically, so the public URL is:

```
https://<your-github-username>.github.io/xpat-physiotherapy-and-wellness/
```

---

## 🎨 Where to replace the logo &amp; assets

All editable media lives in **`assets/`**:

| What | File to replace | Used in |
|------|-----------------|---------|
| **Logo** | `assets/logo/xpat-logo.jpg` | Header, footer, favicon |
| Hero / consultation photo | `assets/images/consultation.jpg` | Hero, gallery |
| Gait/standing therapy photo | `assets/images/gait-training.jpg` | Gallery |
| Parallel-bars rehab photo | `assets/images/parallel-bars.jpg` | Trust block, gallery |
| Back-pain flyer | `assets/images/back-pain-flyer.webp` | Gallery |
| Clinic tour video | `assets/videos/clinic-tour.mp4` | Gallery videos |
| Treatment video | `assets/videos/treatment.mp4` | Gallery videos |
| Desk-stretches video | `assets/videos/desk-stretches.mp4` | Gallery videos |

**Keep the same file names** when you swap in new media and nothing else needs to
change. To add gallery photos, drop them in `assets/images/` and replace the
two “+ Add your photo” placeholder tiles in the gallery section of `index.html`.

> Tip: file names must have **no spaces** — use hyphens (e.g. `team-photo.jpg`).

---

## ✏️ Easy things to edit later

Everything below is plain text in `index.html` / `css/style.css` / `js/main.js`:

| Item | Where |
|------|-------|
| **WhatsApp number** | `js/main.js` → `WHATSAPP_NUMBER` (one place). Also search `wa.me/2349162222551` in `index.html` for the direct buttons. |
| **Phone numbers** | Search `+2349162222551` and `+2348037459000` in `index.html`. |
| **Address** | Search `Rumueprikom Road` in `index.html` (top bar, location, footer, schema). |
| **Map pin** | The `<iframe>` in the **Location** section — paste a Google Maps embed of the exact address. |
| **Opening hours** | The `.hours-list` in the Location section + the top bar badge. |
| **Brand colours** | `css/style.css` → `:root` (`--color-primary` blue, `--color-accent` magenta, `--color-green`). Derived from the logo. |
| **Prices &amp; HMOs** | FAQ answers marked *“(Clinic: replace…)”* — add real fees and your accepted HMO list. |
| **Therapist names &amp; photos** | The **Meet the team** section — replace placeholder cards with real names, qualifications &amp; photos. |
| **Testimonials** | The **Patient results** section — swap the sample quotes for real patient reviews. |
| **SEO title/description** | `<head>` of `index.html`. Tuned around *“physiotherapy clinic in Port Harcourt.”* |

---

## 📱 Responsiveness

Mobile-first. Breakpoints at **640px**, **768px**, **960px** and **1100px**.
`overflow-x: hidden` on the body and fluid grids mean **no sideways scrolling /
no empty swipe space** on phones. Test by resizing the browser or using device
emulation in DevTools.

---

## ✅ Going live (connect the form to a backend, optional)

The booking form is **front-end only** — it opens a pre-filled WhatsApp chat, which
is exactly the “replace WhatsApp-as-homepage” flow the clinic already uses. To also
store leads, open `js/main.js`, find the `bookingForm` submit handler, and add a
`fetch()` POST to your endpoint alongside (or instead of) the WhatsApp open.

---

### Folder structure

```
xpat-physiotherapy-and-wellness/
├── index.html            ← the whole site (single page)
├── css/style.css         ← design system + all styles
├── js/main.js            ← nav, reveal, counters, FAQ, booking→WhatsApp
├── assets/
│   ├── logo/             ← xpat-logo.jpg  (replace before launch)
│   ├── images/           ← clinic photos
│   └── videos/           ← clinic videos
└── README.md
```
