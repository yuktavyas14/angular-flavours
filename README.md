# Shop Platform – multi-client (flavour) Angular e-commerce

One repo, one code base, many clients. The shared e-commerce code lives in a
library. Each client has its own folder. A client build is an Angular build
**configuration** ("flavour") that swaps base files for client files with
`fileReplacements`.

```
shop-platform/
├─ libs/shop-core/            ← BASE code (library): models, services, layout, pages, routes
│  └─ src/lib/
│     ├─ config/client-config.ts      ClientConfig interface + CLIENT_CONFIG token
│     ├─ services/                    ProductService, CartService
│     ├─ layout/header|footer|shell/
│     ├─ ui/product-card/
│     ├─ pages/home|product-list|product-detail|cart/
│     └─ shop.routes.ts
├─ apps/storefront/           ← the single host app (bootstraps the library)
│  └─ src/client/client.config.ts     default config, replaced per client
└─ clients/
   ├─ amazon/
   │  ├─ client.config.ts             name, API url, feature flags
   │  ├─ theme.scss                   CSS variables (colours, radius…)
   │  ├─ public/                      client logos/favicons (merged into assets)
   │  └─ pages/home/home.page.ts      ← different home page structure
   └─ flipkart/
      ├─ client.config.ts
      ├─ theme.scss
      ├─ public/
      └─ layout/header/header.component.ts   ← different header structure
```

## Run / build

| Command                  | What it does                          |
| ------------------------ | ------------------------------------- |
| `npm start`              | base flavour, dev server              |
| `npm run start:amazon`   | Amazon flavour, dev server            |
| `npm run start:flipkart` | Flipkart flavour, dev server          |
| `npm run build:amazon`   | production build → `dist/amazon`      |
| `npm run build:flipkart` | production build → `dist/flipkart`    |
| `npm run build:all`      | both clients                          |

## Three levels of customisation (use the lightest one that works)

1. **Config / feature flags**: `clients/<c>/client.config.ts`. Inject `CLIENT_CONFIG`
   anywhere and use `@if (config.features.x)`. No new files needed.
2. **Theme**: `clients/<c>/theme.scss` overrides the CSS variables defined in
   `apps/storefront/src/styles.scss`. Base components only use `var(--brand-…)`.
3. **File replacement**: when a client needs a *different structure* for a page or
   component, copy the base `.ts` file into the client folder and change it. Then
   register it in `angular.json`:

   ```json
   "amazon": {
     "fileReplacements": [
       { "replace": "libs/shop-core/src/lib/pages/home/home.page.ts",
         "with":    "clients/amazon/pages/home/home.page.ts" }
     ]
   }
   ```

### Rules for a replacement file
- Export the **same class name** (and keep the same selector) as the base file.
- Replace the **`.ts` file**. Its `templateUrl` / `styleUrl` point to the client's own
  `.html` / `.scss`, which sit next to it. (The esbuild builder supports replacing
  TypeScript files, so don't list `.html` or `.scss` files in `fileReplacements`.)
- Import shared things from `'shop-core'`, not with relative paths into the library.
- `shop-core` is mapped to the library **source** in `tsconfig.json` (`paths`). That is
  what lets the app build replace library files. Don't point it at `dist/`.

## Feature flags (turn a base feature ON/OFF per client)

Flags are listed in `FeatureKey` in `libs/shop-core/src/lib/config/client-config.ts`
and set to true/false in each `client.config.ts`. If a client config is missing
a flag, the build fails, so you can't forget one.

| Where             | How                                                                 |
| ----------------- | ------------------------------------------------------------------- |
| Template          | `<button *coreIfFeature="'wishlist'">♡ Wishlist</button>`           |
| Route (whole page)| `{ path: 'deals', canMatch: [featureGuard('deals')], loadComponent… }` |
| TypeScript        | `inject(FeatureService).isEnabled('ratings')`                       |

Adding a new feature: add the key to `FeatureKey`, set it in every client config,
then wrap the UI with `*coreIfFeature` or guard the route with `featureGuard`.

## Adding a new client (e.g. `myntra`)
1. `clients/myntra/client.config.ts`, `theme.scss`, `public/`
2. In `angular.json` copy the `amazon` blocks under `build.configurations` and
   `serve.configurations`, then rename them to `myntra`.
3. Add `start:myntra` / `build:myntra` scripts to `package.json`.

## Note for Windows
Keep the repo at a short path (e.g. `C:\code\shop-platform`). Very long paths break
the native Sass compiler with `OS error 122`.
