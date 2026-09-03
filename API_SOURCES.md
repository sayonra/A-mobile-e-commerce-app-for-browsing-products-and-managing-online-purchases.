# API Sources & Data Notes

This project uses **[FakeStoreAPI](https://fakestoreapi.com)** — a free, public REST API
built for prototyping and testing e-commerce apps. No API key or account is required.

Docs: https://fakestoreapi.com/docs
Base URL: `https://fakestoreapi.com`

## Endpoints used in this app

| Feature | Method | Endpoint | Notes |
|---|---|---|---|
| Product list | GET | `/products` | All products, used for Browse + client-side search/filter |
| Categories | GET | `/products/categories` | Powers the category filter chips |
| Product detail | GET | `/products/{id}` | Fallback fetch if a product isn't already cached |
| Register | POST | `/users` | Creates a "user" object (see limitation below) |
| Login | POST | `/auth/login` | Returns a JWT-like token |
| User lookup | GET | `/users` | Used after login to enrich the profile (email, id) |

## ⚠️ Known limitation: Auth is a test/mock API

FakeStoreAPI is explicitly a **fake** backend meant for practicing HTTP requests. Two
things follow from that, and this app is built to work around them honestly rather than
pretend they don't exist:

1. **`POST /users` does not actually persist a new account.** The API returns a
   realistic-looking response (with an `id`), but that user cannot later be used to log
   in via `/auth/login` — only FakeStoreAPI's own seeded demo users work there.
2. **`POST /auth/login` only accepts FakeStoreAPI's pre-seeded users.**

### How this app handles it
- **Login** calls the real `/auth/login` endpoint. Use one of FakeStoreAPI's public demo
  accounts to test it end-to-end, e.g.:
  - username: `mor_2314`
  - password: `83r5^_`
  (The Login screen has a "Use demo account" shortcut button that fills this in.)
- **Register** calls the real `POST /users` endpoint (so you can see a genuine API
  request/response in the network tab), but since the API can't actually let that user
  log in afterwards, the app then starts a **local mock session** on the device
  (`isMockSession: true` on the user object) so the registration flow is still fully
  usable end-to-end for a demo/portfolio app. This is clearly noted in the UI (Register
  screen note + Profile screen badge).

## Cart & Orders are local-only by design

FakeStoreAPI does have `/carts` endpoints, but they don't reliably reflect real product
data for a given user session and aren't needed to demonstrate the required features. To
keep the app predictable for testing, **Cart and Order History are managed entirely on
the client** with Redux Toolkit and persisted to the device with AsyncStorage. This is an
intentional design choice for a "mini" demo app, not a missing feature.

## Images
Product images are the ones returned directly by FakeStoreAPI's product objects
(`product.image`), hosted by FakeStoreAPI itself.
