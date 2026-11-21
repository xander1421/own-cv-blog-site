# alexpruteanu.cloud :~$ - DevOps CV & Blog

A modern, cyberpunk-styled personal website showcasing my DevOps experience, skills, and blog posts. Built with Astro for blazing-fast performance.

## 🚀 About

This is my personal CV website and blog where I share insights about:
- Cloud Infrastructure (AWS, Kubernetes, Terraform)
- DevOps Best Practices
- CI/CD Automation
- Real-world DevOps challenges and solutions

## 🎨 Features

- **Modern Cyberpunk Design**: Glitch effects, neural network backgrounds, and terminal-style UI
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Blog System**: Write blog posts in Markdown with frontmatter metadata
- **CV/About Page**: Detailed professional experience and skills


## 📂 Project Structure

```text
/
├── public/              # Static assets
├── src/
│   ├── content/
│   │   └── blog/       # Blog posts in Markdown
│   ├── layouts/
│   │   └── BaseLayout.astro  # Main layout with global styles
│   └── pages/
│       ├── index.astro       # Homepage
│       ├── about.astro       # CV/About page
│       ├── blog.astro        # Blog listing
│       ├── blog/
│       |   └── [slug].astro  # Dynamic blog post pages
│       └── neural-link.astro

└── package.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bunx astro check`        | Runs typecheck                                   |

## ✍️ Adding Blog Posts

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: "2025-01-22"
description: "Brief description of your post"
tags: ["DevOps", "AWS", "Kubernetes"]
---

# Your content here...
```

3. Build and deploy - the blog page will automatically list your new post!

## 🌐 Deployment

This site is configured for deployment on Vercel:

```bash
npm run build
```

The static output will be in `./dist/` and ready to deploy.

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) 5.14.6
- **Styling**: Custom CSS with CSS Variables
- **Typography**: Orbitron & Share Tech Mono (Google Fonts)
- **Markdown**: marked library for blog posts
- **Deployment**: Vercel

## 📬 Connect

- **GitHub**: [xander1421](https://github.com/xander1421)
- **LinkedIn**: [alexandru-prt](https://linkedin.com/in/alexandru-prt)

---

Built with ❤️ and ☕

## Chatter product and team-pilot pages

- `/chatter-waitlist/` keeps the general product overview and real-device demos.
- `/chatter-teams/` explains the supported team pilot and its hosting/support terms.
- `/chatter-teams/deployment/` is the deployment and handover brief for a technical lead.
- `outreach/chatter-pitch.md` contains audience-specific wording and verified claim boundaries.

The inquiry form builds an email draft locally or copies the request for webmail.
It does not submit to a backend, store entries or report that a request was sent.
The recipient and subject are fixed in `src/data/chatterPilot.ts`. Build/SEO and
form checks before release:

```bash
npm run build
npm run astro -- check
npm run seo
npm run check:pilot
```

The existing GitHub `main` branch is connected to Vercel production. Verify the
public page and inquiry links after a site release, then update any outreach
system's destination URL. Never point an active campaign at an unpublished page.
