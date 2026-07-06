# Sajan Portfolio Setup Notes

Portfolio URL: [https://sajanportfolio.pages.dev/](https://sajanportfolio.pages.dev/)

## Purpose
This portfolio is being built as a simple static website so it can be deployed quickly, updated easily, and expanded later without changing the initial setup too much.

The current goal is to keep the project minimal:
- Show profile/basic identity
- Show design or project work
- Let visitors connect through the site
- Keep deployment simple and free for now

## Current Tech Choice
Current stack:
- HTML
- CSS
- JavaScript

Current file structure:
```txt
portfolio/
  index.html
  style.css
  script.js
  assets/
    images/
```

This structure is enough for a basic Cloudflare Pages deployment because it is a static site with `index.html` at the root.

## Current Cloudflare Pages Setup
Use these settings for the current version:
- Project name: `sajanportfolio`
- Production branch: `main`
- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`
- Root directory: leave blank
- Environment variables: none for now

This works because the project is plain static HTML/CSS/JS.

## Deployment Flow
Current deployment flow:
1. Write or update code locally.
2. Push changes to the GitHub repository.
3. Cloudflare Pages watches the connected branch.
4. When code is pushed to `main`, Cloudflare automatically deploys the updated site.

So the website can be updated just by pushing code to GitHub.

## Important Understanding
Cloudflare Pages does not magically understand every project structure.

For the current static site, it works easily because there is no build step.

If the project is changed later to React, Angular, or another framework, the Cloudflare build settings can also be changed later. Nothing is permanently locked right now.

## Future Upgrade Path
Possible future upgrade options:
- Keep using plain HTML/CSS/JS
- Move to React
- Move to Angular

If upgraded later:
- build settings will need to be updated
- output folder may change
- framework preset may change

So the correct move for now is: deploy the simple version first, then upgrade later only if needed.

## Contact Form Decision
A static portfolio can include a contact form UI using HTML/CSS/JS.

But email sending does not happen from frontend code alone.

To receive visitor details by email, one of these options will be needed later:
- Form backend service such as Formspree or similar
- Cloudflare Worker / Pages Function with an email sending service

That means:
- the form can be designed now
- real submission/email logic can be added later

## What Was Decided
The practical decision so far:
- Do not overcomplicate the first version
- Do not buy paid hosting just for a basic portfolio
- Do not buy a custom domain right now unless branding is needed
- Use Cloudflare Pages free hosting first
- Use GitHub for source control and deployment trigger
- Build a simple static version first

## Minimal First Version
The first version should focus on:
- Name
- Short intro
- Skills
- Projects or design samples
- Contact section

The first version does **not** need:
- backend
- database
- paid hosting
- custom domain
- framework migration

## Reminder for Later
When the portfolio becomes stable, future improvements can include:
- better UI
- project cards
- resume download
- design gallery
- proper contact form submission
- custom domain
- migration to React or Angular if actually needed

## Current Status
Current status:
- Local project structure is ready
- Basic static deployment setup is understood
- Cloudflare Pages setup is identified
- GitHub auto-deploy flow is understood
- Next step is to keep building the portfolio content
