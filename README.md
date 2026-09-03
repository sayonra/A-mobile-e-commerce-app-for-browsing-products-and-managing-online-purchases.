# Mini E-Commerce App

A small React Native (Expo) shopping app: browse, search, and filter products, view
details, manage a cart, check out, and see order history — built against a free public
REST API for testing. See **[API_SOURCES.md](./API_SOURCES.md)** for full details on the
API used and its limitations.

## Features

- Register / Login (REST-based auth against FakeStoreAPI, with a documented local
  fallback for newly registered accounts — see API_SOURCES.md)
- Browse products (grid view, pull-to-refresh)
- Search products (debounced, client-side)
- Filter by category (chips, from `/products/categories`)
- Product detail screen (rating, description, quantity picker)
- Add to cart / change quantity / remove item
- Checkout with shipping form + validation + mock payment method selector
- Order history + order detail screens
- Loading / error / empty states throughout
- Session, cart, and orders persisted locally (survive app restarts)

## Tech stack

| Concern | Library |
|---|---|
| App framework | Expo (React Native) |
| Navigation | React Navigation (native-stack + bottom-tabs) |
| State management | Redux Toolkit + React Redux |
| Local storage | `@react-native-async-storage/async-storage` |
| HTTP client | axios |
| Form validation | yup |
| Icons | `@expo/vector-icons` (Ionicons) |

## Color palette

| Role | Hex |
|---|---|
| Primary / accent | `#ff660e` |
| Text / dark surfaces | `#000000` |
| Background / light surfaces | `#ffffff` |

(A few neutral grays, derived as tints between black and white, are used for borders and
secondary text — see `src/theme/colors.js`.)

## Project structure

```
mini-ecommerce-app/
├── App.js                     # Root component, store provider, hydration
├── index.js                   # Expo entry point
├── API_SOURCES.md             # API documentation (read this!)
├── src/
│   ├── api/                   # axios client + endpoint functions
│   ├── store/                 # Redux Toolkit store + slices (auth, cart, orders, products)
│   ├── navigation/             # Auth stack, tab navigator, per-tab stacks
│   ├── screens/                # Auth, Products, Cart, Checkout, Orders, Profile
│   ├── components/             # Reusable UI (buttons, inputs, cards, states, etc.)
│   ├── theme/                  # Color palette
│   ├── utils/                  # Storage helpers, yup validation schemas, formatting
│   └── hooks/                  # useDebounce
```

## Getting started

**Prerequisites:** Node.js 18+, and the [Expo Go](https://expo.dev/go) app on your phone
(or an iOS/Android simulator).

```bash
# 1. Install dependencies
npm install

# 2. (Recommended) let Expo align native package versions with your SDK
npx expo install --check

# 3. Start the dev server
npx expo start
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `a` / `i`
in the terminal to open an Android/iOS simulator.

## Test credentials

Use FakeStoreAPI's public demo account to test a full login (or tap "Use demo account"
on the Login screen):

- **Username:** `mor_2314`
- **Password:** `83r5^_`

Or tap "Sign up" to register a new account — this starts a local session on your device
(see API_SOURCES.md for why).

## Notes / things you may want to extend

- Prices/currency are formatted as USD, matching FakeStoreAPI's data.
- Checkout is a mock flow — no real payment processor is integrated.
- This is a "managed" Expo project (no native `ios`/`android` folders); run
  `npx expo prebuild` if you need to eject to bare workflow.
# A-mobile-e-commerce-app-for-browsing-products-and-managing-online-purchases.
