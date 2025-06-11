# React Native Take‑Home Assessment

Thank you for taking the time to complete this exercise. You’ll build a **small, offline‑first “Order Tracker” feature** that consumes the mock REST API included in this repo (`/mock-order-api`). The goal is to demonstrate how you approach architecture, performance, UX polish, and testing in a realistic slice of e‑commerce work.

---

## 1  Time‑box

- **Target effort:** ≈ 4 hours of focused coding + ≤ 1 hour for polish / docs.
- If you need more time for accessibility or tests, note it in your PR description.

---

## 2  Environment Setup (≤ 10 min)

```bash
# 1 Clone repo
git clone <repo-path>
cd react-native-take-home

# 2 Install app dependencies
yarn   # or npm install / pnpm i

# 3 Start the mock API (separate terminal)
cd mock-order-api
npm install
npm start        # → http://localhost:4000
```

*The mock service exposes **``**, **``**, and **``**. CORS is open; no auth.*

---

## 3  Build Tasks

|  #    |  Screen                                 |  Must Have                                                                                                                                                     |  Nice to Have                                                                 |
| ----- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **1** | **Order List** (`/orders`)              | \* Fetch `GET /orders?_sort=order_created_at&_order=desc`.  \* Show order #, date, cost, item‑count, status badge. \* Pull‑to‑refresh **and** infinite scroll. | \* Skeleton loader. \* Search by order #.                                     |
| **2** | **Order Details** (`/orders/:order_id`) | \* Fetch `GET /orders/:order_id`. \* Show summary header, status timeline, and each line‑item (image, title, size, price).                                     | \* Sticky bottom price breakdown. \* Modal sheet vs full screen—your choice.  |

> **Visual Style**  Feel free to mimic LAAM, Amazon, Shein, Temu—or roll your own as long as the design is clean and consistent.

---

## 4  Engineering Requirements

1. **Performance**
   - Virtualised lists (`FlatList`, `FlashList`, etc.).
   - Avoid unneeded re‑renders (memo, keyExtractor…).
2. **Offline Caching**
   - App opens with airplane mode (serve cached data).
   - Queue and later sync any status update (bonus).
   - Use React Query + Persist, RTK Query, Zustand + MMKV, WatermelonDB—explain your choice.
3. **State / Data Layer**
   - Type‑safe API adapter (`axios`, `ky`, native `fetch` wrapper).
   - Normalised cache or DB schema keeping list & detail in sync.
4. **Testing**
   - ≥ 1 unit test **and** ≥ 1 component test (React Native Testing Library or similar).

---

## 5  Tips

- Focus on an MVP first, polish later.
- Document assumptions & TODOs in the PR.
- You may use any open‑source libs you’d choose in production.
- Hard‑coding env vars or tokens is fine—this is a mock project.
- Communicate—questions & notes in the PR are encouraged.

## 6  Branch & PR Workflow

- Create a branch named **your email address** (e.g., `john.doe@example.com`) **before** you start.
- Push your initial commit to that branch and continue pushing incremental commits throughout the exercise—frequent commits are encouraged.
- Open a pull request from that branch to `main` when you’re ready for review.

