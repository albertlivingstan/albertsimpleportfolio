# Portfolio upgrade

React + Vite portfolio based on albertlivingstan/albert.com.

## Run locally

Use Node 22.12+ (or a compatible supported Vite runtime).

```sh
npm ci
npm run dev
npm run build
```

`dist/` is the production output. Existing Vercel configuration is retained. Hosting must fall back to index.html for /certificates.

## Design and motion

- Charcoal, warm ivory, and muted sage palette; responsive editorial layout.
- Aceternity UI Spotlight is adapted from its public registry, with JSX/CSS instead of Tailwind. Source: https://ui.aceternity.com/components/spotlight and https://ui.aceternity.com/registry/spotlight.json
- Animmaster (https://animmasterlib.dev) informed restrained scroll-reveal and hover motion. Its paid source was not accessed or copied; these effects are independently implemented using Framer Motion/CSS.
- Reduced-motion preferences, native cursor, visible focus, skip link, native modal focus handling and Escape support.
- Optimized WebP previews; full-resolution original certificates remain accessible. Videos load on request. Certificate route and assistant are lazy-loaded.

## Features

Project category filters; project screenshot galleries and videos; source and live-demo links; certificate search/category filters and lightbox; résumé download; copy email; mobile navigation; portfolio assistant; contact form with delivery feedback.

Recommendations now open a prefilled email for review instead of displaying unverified anonymous praise. Contact submission checks FormSubmit's response and shows an error if delivery is not confirmed. FormSubmit must be activated by the account owner for the recipient email; no test message was sent.

Firebase is optional. Set the original VITE_FIREBASE_* variables to retain contact/chat logging. Without these variables the interface and assistant work without Firestore. Do not put private service credentials in VITE_* variables.

## Verification

Production build and asset reference checks pass. Browser QA was unavailable in this session. External video playback and real contact delivery were not tested. No GitHub push is implied by the separate private preview deployment.
