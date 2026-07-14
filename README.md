# Sajan Portfolio Setup Notes

Portfolio URL: [https://sajanportfolio.pages.dev/](https://sajanportfolio.pages.dev/)


## Deployment Flow
Current deployment flow:
1. Write or update code locally.
2. Push changes to the GitHub repository.
3. Cloudflare Pages watches the connected branch.
4. When code is pushed to `main`, Cloudflare automatically deploys the updated site.

So the website can be updated just by pushing code to GitHub.


## Contact Form Decision
A static portfolio can include a contact form UI using HTML/CSS/JS.

But email sending does not happen from frontend code alone.

To receive visitor details by email, one of these options will be needed later:
- Form backend service such as Formspree or similar
- Cloudflare Worker / Pages Function with an email sending service

That means:
- the form can be designed now
- real submission/email logic can be added later


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


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
