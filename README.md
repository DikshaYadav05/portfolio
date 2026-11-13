# Diksha Yadav – Portfolio Website

A responsive personal portfolio built with only HTML5, CSS3 and Vanilla JavaScript. It runs directly on GitHub Pages. There is no build step.

## Folder structure

```
portfolio/
├── index.html                 All page content
├── css/style.css              All styling (light and dark themes)
├── js/script.js               Theme toggle, menu, scroll effects, resume button
├── assets/
│   ├── images/                profile.jpg (add cyber-security-lab.png here)
│   └── documents/             resume.pdf
└── README.md
```

## Your files

| File | Folder | Status |
|---|---|---|
| `profile.jpg` | `assets/images/` | Added. Replace it with another square photo (about 400 x 400 px) any time, keeping the same name. |
| `resume.pdf` | `assets/documents/` | Added. Replace it with a new PDF using the same name when you update your resume. |
| `cyber-security-lab.png` | `assets/images/` | Not added yet. Add a project screenshot (about 1200 x 800 px) with this exact name. Until then, a green placeholder is shown. |

## Edit the content

Open `index.html`. Every editable part has an `<!-- EDIT: ... -->` comment above it.

- **Add a project:** copy the whole `<article class="project-card">` block in the Projects section and change the text. Add your image name in its `<img src="...">`.
- **Add a GitHub link to a project:** find the `TODO` comment inside the project card and remove the comment markers.
- **Add a certificate:** in the Certifications section, copy one `<li class="cert-item">` block and change the name, organization, date and verify link.
- **Change colours:** edit the variables at the top of `css/style.css` (`:root` for light, `[data-theme="dark"]` for dark).

## Put it on GitHub Pages

1. Create a new repository on GitHub, for example `portfolio`.
2. Upload **everything inside this folder** (so `index.html` is at the top level of the repository).
3. Open the repository, then **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Choose branch **main** and folder **/ (root)**, then click **Save**.
5. Wait one or two minutes. Your site will be live at `https://YOUR-USERNAME.github.io/portfolio/`.

Tip: if you name the repository `YOUR-USERNAME.github.io`, the site opens at `https://YOUR-USERNAME.github.io/`.

## Test on your computer

Double-click `index.html` to open it in a browser. For a closer match to the live site, use the **Live Server** extension in VS Code (right-click `index.html` → Open with Live Server).

## Notes

- The fonts load from Google Fonts. If you are offline, the site falls back to your system fonts.
- The resume button checks that `resume.pdf` exists on the live site. When it is missing, it shows a short message instead of a broken page.
