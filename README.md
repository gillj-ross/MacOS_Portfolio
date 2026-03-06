# macOS Portfolio

A fully interactive, macOS-inspired portfolio website built with React and Vite. Instead of a traditional scroll-based layout, this portfolio puts you inside a simulated macOS desktop — complete with a draggable Dock, resizable windows, a Finder file explorer, a Terminal, and more. Every "app" on the desktop is a real portfolio section: projects, resume, contact info, a photo gallery, and a blog reader.

---

## Overview

I built this because I was tired of the same old portfolio templates. As a senior in software engineering, I wanted something that actually showed how I think and build — not just a list of bullet points. The macOS desktop metaphor gave me a natural way to organize everything (projects are "files", skills are in the "Terminal", photos in "Photos") while letting me flex some serious frontend muscle along the way.

The whole thing is a single-page React app that simulates a windowed desktop environment. Windows open, close, and can be dragged around. There's a dock at the bottom that animates like the real macOS dock. The Finder lets you browse my projects like you'd browse files on your Mac.

---

## Live Demo

> Coming soon — will be deployed to Vercel.

---

## Features

### Desktop Environment
- **Draggable, layered windows** — every app window can be freely dragged around the screen and stacked like real OS windows, with z-index management so the focused window always stays on top
- **macOS-style window controls** — close button on every window
- **Window open/close animations** — windows scale in and fade out using GSAP for a smooth, native-feeling experience

### Dock
- **Elastic hover effect** — icons scale up and neighboring icons get pulled along, mimicking the physics of the real macOS Dock using GSAP and exponential distance calculations
- **Tooltips** on each icon so you always know what you're clicking
- **Quick-launch** for Finder, Terminal, Safari, Photos, Contact, and Resume

### Navbar
- **macOS-style menu bar** at the top with the current time (updated live with `dayjs`)
- Quick navigation links to Projects, Contact, and Resume

### Finder Window
- **File explorer** with a sidebar of favorites (Work, About Me, Resume, Trash)
- Projects displayed as files and folders with custom desktop positions
- Click a `.txt` file to open a project description in a Text viewer
- Click an image file to open it in an Image viewer
- Click a URL file to open the live project link

### Terminal Window
- **Tech stack display** styled like real terminal output
- Organized by category: Frontend, Styling, Backend, Database, Dev Tools
- Each entry shows with a checkmark and proficiency indicator

### Safari Window
- **Blog post reader** that displays articles in a grid with thumbnails
- Links out to the full posts

### Photos Window
- **Photo gallery** with a sidebar for categories (Library, Memories, Places, People, Favorites)
- CSS Grid layout with varying tile sizes for a masonry-like feel
- Click any image to open it in a full Image Viewer window

### Resume Window
- **In-app PDF viewer** powered by `react-pdf` — no downloading required just to peek
- Download button for the full resume PDF

### Contact Window
- Email link, GitHub, LinkedIn, and Twitter/X
- Profile picture displayed inline

### Welcome Screen
- Animated hero text with a **letter-by-letter font weight effect** based on mouse proximity — the closer your cursor, the bolder the letters get

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2.0 | Core UI library — component tree, hooks, JSX rendering |
| **Vite** | 7.2.4 | Build tool with instant HMR for a fast dev experience |
| **GSAP** | 3.14.2 | All animations: window entrance, dock hover physics, welcome text effect, draggable windows |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS for layout, spacing, color, and responsive design |

---

## Project Structure

```
macos-portfolio/
├── public/                    # Static assets (resume PDF, images)
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Root component — mounts all windows and desktop
│   ├── index.css              # Global styles: Tailwind directives + custom utilities
│   │
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Top macOS-style menu bar with live clock
│   │   ├── Dock.jsx           # Bottom dock with GSAP hover animation
│   │   ├── Home.jsx           # Desktop background with draggable folder icons
│   │   ├── Welcome.jsx        # Animated hero/landing text
│   │   ├── WindowControls.jsx # Close/minimize/maximize button cluster
│   │   └── index.js           # Barrel export
│   │
│   ├── windows/               # Individual "app" window components
│   │   ├── Finder.jsx         # File explorer / project browser
│   │   ├── Safari.jsx         # Blog post grid viewer
│   │   ├── Terminal.jsx       # Tech stack display
│   │   ├── Contact.jsx        # Contact info and social links
│   │   ├── Resume.jsx         # PDF resume viewer
│   │   ├── Text.jsx           # Project description text viewer
│   │   ├── Image.jsx          # Full image viewer
│   │   ├── Photos.jsx         # Photo gallery
│   │   └── index.js           # Barrel export
│   │
│   ├── hoc/
│   │   └── WindowWrapper.jsx  # HOC that adds drag, animation, and focus to any window
│   │
│   ├── store/
│   │   ├── window.js          # Zustand store: which windows are open, z-index order
│   │   └── location.js        # Zustand store: current Finder directory
│   │
│   └── constants/
│       └── index.js           # All app data: projects, tech stack, blog posts, gallery, socials
│
├── jsconfig.json              # Path aliases (#components, #windows, #store, etc.)
├── vite.config.js             # Vite config with Tailwind and React plugins
├── package.json
└── README.md
```

---

## Key Technical Details

### Window Management with a HOC
Every app window is wrapped in `WindowWrapper.jsx`, a Higher-Order Component that injects drag functionality, open/close GSAP animations, and focus management. This kept the individual window components clean and focused on their own content — no drag or animation logic leaking into `Finder.jsx` or `Terminal.jsx`.

### Zustand for Global Window State
I used Zustand with the Immer middleware to manage which windows are open, which one is focused (and therefore on top), and what data to pass into windows that need it (like which project to show in the Text viewer). Zustand was the right call here — Redux would have been massive overkill for this, and plain `useState` in the root component would have been a prop-drilling nightmare.

### GSAP for Everything Animated
GSAP handles three distinct animation systems:

1. **Dock hover** — When you hover over a dock icon, a `mousemove` listener calculates the distance from your cursor to every icon and applies an exponential scale and Y-offset. The closer the icon, the larger it gets. Neighbors get pulled along with a falloff curve.

2. **Welcome text** — Each letter in the hero text independently tracks your mouse proximity and ramps its font weight up (using the variable `Georama` font) as your cursor approaches.

3. **Window entrance** — When a window opens, GSAP scales it from 0.8 to 1 and fades it in from 0 opacity. When it closes, it reverses. `GSAP Draggable` is layered on top to make the windows freely movable.

### Path Aliases
Import paths use a `#` prefix convention (e.g., `import { Finder } from '#windows'`) configured via `jsconfig.json` and Vite's `resolve.alias`. This keeps imports clean no matter how nested the component is.

### Custom Fonts
- **Georama** (variable weight) — Used for the interactive welcome text effect. The variable weight axis allows smooth font-weight transitions per letter without swapping font files.
- **Roboto Mono** — Used in the Terminal window for that authentic monospace terminal aesthetic.

---

## Projects Showcased Inside the App

### Reverse Engineering Tool
A Java-based tool that reverse engineers compiled `.class` files and generates UML class diagrams. Built as a team project for software engineering coursework. Demonstrates parsing bytecode, understanding class relationships, and outputting structured diagrams.

### AI Resume Analyzer
A full-stack web app built with **Next.js** and **Tailwind CSS** that uses AI to analyze a resume and give feedback. Upload a PDF resume and receive scored feedback on format, content, and relevance to a job description.

### Wordle Clone
A multiplayer **JavaFX** desktop implementation of the popular Wordle word game. Supports real-time multiplayer via sockets, custom word lists, and a full GUI built entirely in Java.

---

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/gillj-ross/macos-portfolio.git
cd macos-portfolio
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

---

## Author

**Jude Gill**
Senior, Software Engineering — Milwaukee School of Engineering

- GitHub: [@gillj-ross](https://github.com/gillj-ross)
- LinkedIn: [jude-gill](https://www.linkedin.com/in/jude-gill/)
- Twitter/X: [@JudeRossGill](https://x.com/JudeRossGill)
- Email: judergill@gmail.com

---

## Acknowledgements

- Inspired by the creativity of macOS-themed web portfolios and the desire to build something that actually stands out in a sea of identical Tailwind portfolio templates.
- GSAP docs and community examples were invaluable for getting the dock animation to feel right.
- Lucide for the best free icon library in the React ecosystem.
