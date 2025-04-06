
# Hydrogen Fresh Setup Guide (TypeScript + Tailwind)

This guide outlines the clean steps taken to initialize a fresh Hydrogen project with TypeScript, Tailwind CSS, and scaffolded routes/markets.

---

## ✅ Prerequisites

Make sure you have the following installed:

- Node.js (v18+ recommended)
- NPM (v9+)
- Git (optional but helpful)
- Shopify CLI (`npm install -g @shopify/cli @shopify/cli-hydrogen`)

---

## 🧼 Clean Setup Instructions

```bash
# 1. Navigate to your projects folder
cd ~/Projects

# 2. (Optional) Delete any broken previous attempts
rm -rf hydrogen-fresh

# 3. Initialize new Hydrogen project
npm create @shopify/hydrogen@latest
```

### Prompts & Answers During Init

- **Link Shopify account** → Yes
- **Select a store** → Your connected store (e.g., `31zh0s-4t`)
- **Hydrogen storefront** → Create a new storefront
- **Storefront name** → `hydrogen-nudun-ts`
- **Language** → `TypeScript`
- **Styling** → `Tailwind v4`
- **Install deps with NPM** → Yes
- **Scaffold routes and core functionality?** → Yes
- **Markets URL structure** → `Subfolders (example.com/fr-ca/...)`

---

## 🚀 Run the Dev Server

```bash
cd hydrogen-nudun-ts
npm run dev
```

> Visit: `http://localhost:3000`

---

## 🛡️ Best Practices

- ✅ **Zip your project** immediately after setup.
- ✅ **Push to GitHub** (`git init`, `git remote add origin`, etc.).
- ✅ **Use VS Code with `.vscode/settings.json`** for auto-formatting & linting.
- ✅ Add `.devcontainer` if Docker support is needed later.

---

## 🧠 Notes

- You can switch to TypeScript even after choosing JS, but starting with TS avoids rebuilds.
- Always choose **scaffolded routes** unless building 100% custom from scratch.

---

## 🧰 Next Up (Optional)

- Add automatic zipping of project on dev start
- Set up GitHub auto-commits or branch backups
- Enable .devcontainer support for Docker

---

_“Plan like Trügüd. Build like Nuwud.”_
