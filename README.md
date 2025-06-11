# React scrollspy with IntersectionObserver
![Vite](https://img.shields.io/badge/built%20with-vite-blueviolet?logo=vite)
![TypeScript](https://img.shields.io/badge/language-typescript-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/styling-tailwindcss-38bdf8?logo=tailwindcss)

This project demonstrates how to implement a **modern scrollspy system in React** using the native `IntersectionObserver` API.

It automatically highlights the active section in the navigation menu based on the visible portion of the page - perfect for landing pages, documentation sites, and single-page apps.

## Features
- Automatically detects the most visible section
- High performance (no polling or manual calculations)
- Dynamically observes section refs using `MutationObserver`
- Uses `requestAnimationFrame` to ensure stable layout before observing
- Optional fallback to handle static content on first render
- Reusable with any section structure

## Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/evenilson/react-intersection-scrollspy.git
cd react-intersection-scrollspy
npm install
npm run dev
```

This project uses:
- [React + TypeScript](https://react.dev/)
- [Vite](https://vite.dev/) 
- [Tailwind CSS](https://tailwindcss.com/) for styling (configured via tailwind.config.js)

## Folder Structure
```text
.
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Section.tsx
│   ├── hooks/
│   │   └── useActiveSection.ts
│   ├── App.tsx
│   ├── index.css
│   ├── index.ts
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── README.md

```

## How It Works
This project includes a custom React hook called `useActiveSection` that:
1. Accepts an object of `ref`s for each section;
2. Uses `IntersectionObserver` to detect which sections are visible;
3. Calculates the visible area of each section;
4. Updates the `activeSection` state based on the section with the largest visible area;
5. Uses `MutationObserver` and `requestAnimationFrame` to ensure reliable initialization, even in asynchronous or React 18 StrictMode environments.

## Usage Example
```tsx
// inside App.tsx
const homeRef = useRef<HTMLElement>(null!);
const aboutRef = useRef<HTMLElement>(null!);
const projectsRef = useRef<HTMLElement>(null!);
const contactRef = useRef<HTMLElement>(null!);

const sectionRefs = useMemo(() => ({
  home: homeRef,
  about: aboutRef,
  projects: projectsRef,
  contact: contactRef,
}), []);

const activeSection = useActiveSection(sectionRefs);
```
> `useMemo` is usde to ensure the sectionRefs object remains stable and does not cause the hook to render unnecessarily.

```tsx
// In your navigation (e.g., Header.tsx)
<a
 href="#home"
 className={activeSection === "home" ? "active" : ""}
>
   Início
</a>
```

## Compatibility
- React 16.8+
- Full support for React 18 StrictMode
- Ready for React 19+
- Works with both client-side and server-rendered content (with fallback)



## Conteúdos relacionados
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [React Refs - React Docs](https://legacy.reactjs.org/docs/refs-and-the-dom.html)
- [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

---
Made by [Evenilson Liandro](https://github.com/evenilson)