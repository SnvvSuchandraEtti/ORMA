# ORMA — The Ultimate Peer-to-Peer Rental Marketplace
## Comprehensive Project Information & Architecture Document

> **Platform:** Web Application (Next.js)
> **Live URL:** [https://orma10.vercel.app](https://orma10.vercel.app)
> **Repository:** `SnvvSuchandraEtti/ORMA` 
> **Version:** 0.1.0 
> **Status:** 🟡 Active Development

---

## 📖 TABLE OF CONTENTS
1. [The Vision: What is ORMA?](#1-the-vision-what-is-orma)
2. [The Core Philosophy](#2-the-core-philosophy)
3. [How ORMA Works: The User Experience](#3-how-orma-works-the-user-experience)
4. [Target Market & Use Cases](#4-target-market--use-cases)
5. [Deep Dive: Technology Stack](#5-deep-dive-technology-stack)
6. [Design System & Apple-Inspired Aesthetics](#6-design-system--apple-inspired-aesthetics)
7. [Comprehensive Feature Breakdown](#7-comprehensive-feature-breakdown)
8. [Database Architecture & Schema Details](#8-database-architecture--schema-details)
9. [Component Architecture & Folder Structure](#9-component-architecture--folder-structure)
10. [State Management & Data Flow](#10-state-management--data-flow)
11. [Security, Performance & SEO](#11-security-performance--seo)
12. [Current Progress: What has been built?](#12-current-progress-what-has-been-built)
13. [The Future Roadmap: What's next?](#13-the-future-roadmap-whats-next)
14. [Local Development Guide](#14-local-development-guide)

---

## 1. THE VISION: WHAT IS ORMA?

ORMA is a next-generation **peer-to-peer (P2P) rental marketplace**. You can think of it as the **"Airbnb for everything"**. 

In our modern world, we often to buy expensive items that we only use once or twice. A high-end DSLR camera for a weekend trip. A specialized power drill for a quick home repair. A PS5 to play a specific game. A projector for a movie night. Most of the time, these items sit idle in cupboards, garages, and closets, collecting dust and depreciating in value.

**ORMA exists to solve this exact problem.**

ORMA provides a beautifully designed, trustworthy, and incredibly fast digital platform that connects people who *have* things with people who *need* things temporarily. 

Instead of buying a $1000 camera for a 3-day trip, a user can rent it locally on ORMA for $30/day. The renter saves $910, and the owner makes $90 from an item that was otherwise doing nothing. It is a win-win scenario that promotes the sharing economy, reduces environmental waste, and helps people monetize their idle assets.

---

## 2. THE CORE PHILOSOPHY

The development and design of ORMA are guided by a few core principles:

1. **Hyper-Local Focus:** Rentals require physical handover of items. Therefore, ORMA prioritizes location. The platform uses geolocation to automatically show items near the user, making discovery highly relevant.
2. **Beautiful, Frictionless UX:** Taking inspiration from Apple's design language, ORMA feels premium. From the blur-effect (glassmorphism) navigation bars to the meticulously smooth Framer Motion animations, renting a power washer should feel as premium as buying a new iPhone.
3. **Trust & Verification:** Renting out personal items requires immense trust. ORMA builds this through user verification badges, public profiles, comprehensive two-way rating systems, and transparent communication histories.
4. **Instant Communication:** Speed kills deals. That's why ORMA features a built-in real-time WebSocket messaging system, allowing owners and renters to negotiate and finalize details instantly without leaving the platform.
5. **Accessibility:** Whether on a large desktop monitor or a small mobile screen over 3G, ORMA adapts flawlessly. It features an iOS-style bottom navigation bar for mobile users and uses skeleton loaders to ensure a perceived fast load time.

---

## 3. HOW ORMA WORKS: THE USER EXPERIENCE

To truly understand ORMA, let's walk through the exact journeys of the two main types of users on the platform: **The Renter** and **The Owner**.

### The Journey of a Renter (Borrowing an Item)
1. **Discovery:** Sarah wants to go camping this weekend but doesn't own a tent. She visits ORMA. The website immediately detects she is in "Hyderabad" and shows her local items. 
2. **Searching & Filtering:** She types "camping tent" into the beautifully animated, expanded search bar. She filters by her budget and selects items available "this weekend".
3. **Evaluation:** She finds a 4-person Coleman tent. She clicks the listing, viewing a full-screen image gallery with swipe gestures. She sees the owner, "Rahul," has a 4.9-star rating and a "Verified" badge. She reads previous reviews praising the tent's condition.
4. **Action:** She saves it to her Wishlist by tapping the Heart icon, then decides to proceed. 
5. **Communication:** She clicks "Contact Owner". A modal pops up. She can choose to call, WhatsApp, or natively message Rahul. She chooses native messaging. A real-time chat thread opens, and she asks if she can pick it up Friday evening.
6. **Fulfillment:** Rahul agrees, they meet, the item is rented, and afterward, they leave reviews for each other, building the platform's trust ecosystem.

### The Journey of an Owner (Listing an Item)
1. **The Choice to Earn:** David has a DJI Drone he hasn't flown in months. He decides to list it on ORMA to make some passive income.
2. **The 7-Step Listing Wizard:** He clicks "List Your Item" and enters a magical, gamified 7-step wizard:
   - **Step 1 (Category):** He selects "Cameras & Gear".
   - **Step 2 (Photos):** He drags and drops 4 photos of his drone. Supabase instantly uploads them.
   - **Step 3 (Details):** He types the title "DJI Mini 3 Pro", writes a description, points out a small scratch (setting condition to "Good"), and specifies the brand.
   - **Step 4 (Pricing):** He sets the price: ₹1000/day, ₹5000/week, with a ₹10000 security deposit.
   - **Step 5 (Location):** He inputs his city and pincode.
   - **Step 6 (Contact):** He chooses "WhatsApp" as his preferred method of communication.
   - **Step 7 (Review):** He reviews the summarized card, clicks Publish, and confetti animations congratulate him.
3. **Dashboard Management:** His listing is immediately live. He can visit his Owner Dashboard, which shows a beautiful chart tracking his views, inquiries, and estimated revenue. 
4. **Notifications:** Two days later, he gets a real-time notification bell alert: "New inquiry for DJI Mini 3 Pro".

---

## 4. TARGET MARKET & USE CASES

ORMA is designed with the Indian market in mind (defaulting to INR currency and Indian cities like Hyderabad, Bangalore, Mumbai), though its architecture supports global scaling.

**Primary Audiences:**
- **College Students:** Always on a budget. Renting laptops for assignments, cameras for festivals, or bikes for weekend trips.
- **Freelancers & Creatives:** Photographers renting extra lenses or lighting gear for a specific shoot without committing to a $2000 purchase.
- **Event Organizers:** Renting extra chairs, speakers, or party lights.
- **Tech Enthusiasts:** Renting out their latest gadgets (like VR headsets) to others who want to "try before they buy."
- **Travelers:** Renting camping gear, roof racks, or backpacks.

**The 16 Core Categories on ORMA:**
Cars, Bikes, Cameras, Laptops, Smartphones, Furniture, Appliances, Gaming, Tools, Sports, Musical Instruments, Events, Books, Travel, Clothing, Others.

---

## 5. DEEP DIVE: TECHNOLOGY STACK

ORMA is built using the most modern, edge-ready technologies available in 2026. It relies on a "Backend-as-a-Service" model to achieve rapid development without sacrificing scalability.

### The Frontend Stack
- **Next.js 16.2 (App Router):** The backbone of the application. Next.js provides Server-Side Rendering (SSR) for blazing-fast initial page loads, excellent SEO for listings, and seamless API route integration.
- **React 19.2:** The component library. ORMA heavily utilizes React hooks, Context API, and Suspense for smooth loading states.
- **TypeScript (v5):** Every piece of data—from database queries to component props—is strictly typed. This prevents runtime errors and acts as in-code documentation.
- **Tailwind CSS v4:** A utility-first CSS framework that allows ORMA to build highly custom designs without leaving the HTML. It powers the dark mode, responsive breakpoints, and complex layouts.
- **Framer Motion:** This is what gives ORMA its "Apple-like" feel. Framer Motion drives the page transitions, the stagger-fade-ins of listing cards, and the snappy modal pop-ups.

### The Backend & Database Stack (Supabase)
ORMA does not have a traditional Node.js/Express backend server. Instead, it runs directly on **Supabase** (an open-source Firebase alternative powered by PostgreSQL).
- **PostgreSQL Database:** A highly relational, robust database storing all users, listings, messages, and reviews.
- **Supabase Auth:** Handles user authentication (Email/Password + Google OAuth secure flow). It automatically syncs users with the `public.profiles` database table via SQL Triggers.
- **Supabase Storage:** An AWS S3-backed file storage system used to host user-uploaded images for their rental items.
- **Supabase Realtime:** Uses WebSockets to stream database changes instantly to clients. This is what makes the chat system and notifications update instantly without refreshing the page.

### Ancillary Libraries
- **Zustand:** Used for global state management where React Context is overkill (specifically used for the Messaging state and the 7-step Listing Creation Wizard state).
- **Lucide React:** A beautiful, consistent icon set providing over 100 icons used throughout the platform.
- **Leaflet & React-Leaflet:** Powers the interactive map view, allowing users to see exactly where items are located before renting.
- **DOMPurify:** Protects the platform from Cross-Site Scripting (XSS) attacks by sanitizing any user-generated text inputs.

---

## 6. DESIGN SYSTEM & APPLE-INSPIRED AESTHETICS

A massive part of ORMA's value proposition is its visual appeal. If a user is going to rent an expensive item from a stranger, the website must look highly trustworthy, premium, and polished. 

**Apple-Inspired Aesthetics:**
- **Color Palette:** The UI relies heavily on deep whites (`#ffffff`), true blacks (`#000000`), a signature vibrant blue (`#0071E3`), and soft grays (`#86868B`). 
- **Typography:** It uses the 'Inter' font from Google Fonts, which heavily mimics Apple's 'San Francisco' font, providing clean, highly legible text at all sizes.
- **Rounded Corners:** Buttons, modals, and images feature aggressive, pill-shaped border radii (e.g., `16px` for cards, `980px` for fully rounded buttons), a staple of modern iOS design.
- **Glassmorphism:** The Navbar, mobile navigation tabs, and modal backdrops utilize `backdrop-filter: blur(20px)` and transparent backgrounds to create a frosted glass effect over content scrolling underneath.
- **Dark Mode:** A meticulously crafted dark mode (`#121212` backgrounds) that respects the user's system preferences, swapping the harsh whites for deep grays while maintaining legibility and contrast.

**Responsiveness & Mobile-First:**
ORMA recognizes that most users will browse on their phones.
- On desktop, it features a wide, grid-based layout with a persistent top navigation bar.
- On mobile, the top navbar shrinks, and a fixed, iOS-style tab bar appears at the bottom of the screen (Explore, Wishlist, List, Profile), providing thumb-friendly navigation. Let alone a full-screen drawer for menus.

---

## 7. COMPREHENSIVE FEATURE BREAKDOWN

Let's dissect the features that have been built into the ORMA codebase.

### A. The Discovery Engine (Search & Filtering)
- **Automatic Geolocation:** Using `useUserLocation.ts`, the app requests browser location, reverse-geocodes via OpenStreetMap/Nominatim, and sets the user's city automatically.
- **Infinite Scrolling:** Listings don't paginate with numbers. As the user scrolls down, `react-intersection-observer` triggers a request for the next 20 items, creating an endless feed.
- **Advanced Filtering:** Users can filter by Category (via a horizontal scrollable icon bar), Price Range, Condition (Excellent/Good/Fair), and specific features ("Delivery Available", "Verified Owners Only").
- **Local-First Sorting:** The custom `useInfiniteListings` hook pulls data from Supabase and automatically ranks listings in the user's immediate city higher than distant ones.

### B. The Listing Display (ListingCard & Details Page)
- **Swipeable Image Carousels:** On mobile, users can swipe left/right on a listing card to view all photos without clicking into it.
- **Heart Wishlisting:** Optimistic UI updates. When a user clicks the heart, it immediately turns red visually, *then* updates the database in the background. If the user isn't logged in, it saves the action to LocalStorage and prompts them to log in, completing the save afterward automatically!
- **Dynamic SEO Metadata:** The `page.tsx` for listings generates OpenGraph tags on the server, meaning if you paste an ORMA listing link in WhatsApp or Twitter, a beautiful preview card with the item's title, price, and image appears.

### C. The Messaging Platform
- **Global Message Store:** `messageStore.ts` handles the WebSocket connection. It manages conversations, tracking unread counts globally so the red badge on the navigation bar is always accurate.
- **Real-Time Delivery:** Sending a message instantly inserts it into the database, triggering a broadcast event that the recipient's browser catches and displays in milliseconds.

### D. The Owner Dashboard
- **Analytics Visualization:** A visual space for an owner to see how their items are performing. (Note: The current chart implementation uses a mock data generation algorithm to demonstrate UI, pending actual historical analytics setup).
- **Inventory Management:** Owners can quickly activate, deactivate, or jump to edit their listings from a centralized table.

### E. Notifications System
- Database triggers automatically create Notification records when certain milestones occur (e.g., a listing hits 500 views, an owner receives a review, or a new user signs up).
- A dropdown bell interface lets users read and dismiss these alerts.

---

## 8. DATABASE ARCHITECTURE & SCHEMA DETAILS

The data model is the heart of ORMA. Located in `complete_schema.sql`, the PostgreSQL database comprises several interconnected tables, protected fiercely by Row Level Security (RLS).

### Core Tables
1. **`profiles`**: Tied 1-to-1 with Supabase Auth users. Stores `full_name`, `avatar_url`, `city`, and aggregated metrics like `total_listings` and `average_rating`.
2. **`categories`**: A lookup table of the 16 fixed categories, their icons, and slugs.
3. **`listings`**: The biggest table. Stores title, description, pricing (`price_per_day`, `security_deposit`), location data, availability rules, and an array of image URLs. It links to `profiles` as the `owner_id`.
4. **`reviews`**: Stores 1-5 star ratings and text comments left by users on interactions.
5. **`wishlists`**: A simple junction table connecting a `user_id` to a `listing_id`.
6. **`conversations` & `messages`**: Structure for the chat system. Conversations track the participants and the "last message text" for easy list rendering. Messages store individual chat bubbles.
7. **`notifications`**: System alerts for users.
8. **`reports`**: Allows users to flag inappropriate listings for moderation.

### Security: Row Level Security (RLS)
Supabase provides direct database access to the frontend. To prevent malicious users from deleting everyone's data, ORMA uses RLS. For example, the policy on listings:
- *Anyone* can SELECT (read) active listings.
- Only the user whose `auth.uid()` matches the listing's `owner_id` can UPDATE or DELETE the listing.
This means the database enforces security at the lowest level, impossible to bypass via the frontend.

### Automations via Triggers & Functions
Instead of writing complex API endpoints to update counts, ORMA utilizes the power of PostgreSQL.
- **Trigger `on_review_change`**: Whenever a review is inserted, the database automatically runs a function that recalculates the `average_rating` and `total_reviews` for that specific listing. Fast, atomic, and reliable.
- **Trigger `on_auth_user_created`**: When a user signs up via Google, Supabase Auth creates their secure credentials, and this trigger automatically inserts a mirrored record into the `profiles` table.

---

## 9. COMPONENT ARCHITECTURE & FOLDER STRUCTURE

The project is structured under the Next.js `src` directory, adhering strictly to the App Router configuration.

```text
e:\ORMA\
├── .env.local                      # Secret keys (DO NOT COMMIT)
├── next.config.ts                  # Next.js security headers & image domains
├── package.json                    # Project dependencies
├── complete_schema.sql             # THE ENTIRE DATABASE DEFINITION
│
└── src/
    ├── app/                        # 1. ROUTING & PAGES (Next.js App Router)
    │   ├── layout.tsx              # The root wrapper (contains Providers)
    │   ├── page.tsx                # Homepage (Map, search, grid)
    │   ├── globals.css             # Tailwind config, Apple-theme CSS variables
    │   ├── sitemap.ts              # Automatically builds SEO sitemaps
    │   ├── listing/[id]/page.tsx   # Dynamic route for viewing a single listing
    │   ├── search/, about/, ...    # Static and dynamic pages
    │
    ├── components/                 # 2. REUSABLE UI ELEMENTS
    │   ├── ListingCard.tsx         # The complex, swipeable card for items
    │   ├── AuthModal.tsx           # Pop-up for Login/Register
    │   ├── Navbar.tsx, Footer.tsx  # Layout components
    │   ├── home-sections/          # Sub-components exclusively for the homepage
    │   ├── ui/                     # Basic UI elements (buttons, inputs)
    │
    ├── hooks/                      # 3. CUSTOM REACT LOGIC
    │   ├── useInfiniteListings.ts  # Handles the complicated pagination/filtering
    │   ├── useUserLocation.ts      # Geolocation API wrapper
    │   ├── useAuth.ts              # Easy access to current user state
    │
    ├── lib/                        # 4. UTILITIES & CONFIG
    │   ├── utils.ts                # Price formatters, string manipulators
    │   ├── sanitize.ts             # DOMPurify XSS cleaning run
    │   ├── supabase/               # Client and Server instances of Supabase
    │
    ├── providers/                  # 5. GLOBAL CONTEXTS
    │   ├── AuthProvider.tsx        # Manages global session state
    │   ├── ThemeProvider.tsx       # Manages Dark/Light mode preferences
    │
    ├── store/                      # 6. ZUSTAND STATE MANAGERS
    │   ├── messageStore.ts         # Real-time WebSocket handlers
    │   ├── listingFormStore.ts     # Holds data across the 7-step creation wizard
    │
    └── types/                      # 7. TYPESCRIPT DEFINITIONS
        └── index.ts                # Interfaces for Listing, Profile, Message, etc.
```

---

## 10. STATE MANAGEMENT & DATA FLOW

ORMA uses a hybrid approach to state management to maximize efficiency: it uses the right tool for the specific job.

1. **React Context (`AuthProvider`, `ThemeProvider`):** 
   - Used for data that rarely changes but needs to be accessed *everywhere*. 
   - The user's logged-in status wraps the whole app, deciding if they can access `/dashboard` or if they see "Login" in the navbar.
2. **Local Component State (`useState`):**
   - Used for UI toggles, like whether a drop-down menu is open, or which photo in a carousel is currently visible.
3. **Zustand (`messageStore.ts`, `listingFormStore.ts`):**
   - Used for complex, frequently updating global state. 
   - Zustand acts outside the React render cycle, allowing the WebSocket listener to quietly update the `unreadCount` without causing the entire application tree to re-render.
4. **URL Parameters (`useSearchParams`):**
   - The ultimate source of truth for **Search & Filtering**. If a user filters for "Cameras" in "Mumbai", the URL changes to `?category=cameras&city=Mumbai`. 
   - Why? Because this allows users to copy/paste links and share exact search results with friends.
5. **Local Storage:**
   - Used to remember temporary states like User Location Preferences (`orma_city`), Theme override (`orma-theme`), and Pending Actions (if a user tries to wishlist an item before logging in, it saves the intention here).

---

## 11. SECURITY, PERFORMANCE & SEO

ORMA is built to be a production-grade application, preventing common web vulnerabilities and ensuring fast load times.

### Security Measures
- **Content Security Policy (CSP):** Defined inside `next.config.ts`, this strict policy prevents the browser from loading malicious scripts from unauthorized domains, effectively neutralizing third-party tracking or injected scripts.
- **XSS Sanitization:** User-submitted descriptions and reviews are passed through `DOMPurify` (in `lib/sanitize.ts`) to strip any `<script>` tags or malicious HTML before rendering.
- **Authentication:** Supabase handles hashing and salting passwords securely. Google OAuth ensures we rely on Google's world-class security for login validation.

### Loading Performance
- **Image Optimization:** All user-uploaded images are processed via Next.js `<Image />` component. They include `blurDataURL` placeholders (so a blurry gray box loads instantly before the real image), are lazy-loaded, and automatically resized for mobile devices.
- **Bundle Splitting:** Next.js automatically chunks JavaScript. If a user is on the homepage, they do not download the JS required for the rich text editor or the 7-step listing wizard.
- **Code Optimization:** Heavy components, like `ListingCard`, are wrapped in React's `memo()` to prevent unnecessary re-rendering during rapid scrolling.

### Search Engine Optimization (SEO)
- **Dynamic Sitemap:** `sitemap.ts` dynamically polls the database and generates an XML file required by Googlebot, listing every single active rental item with its last-modified date.
- **JSON-LD Schema Integration:** Listing pages inject hidden JSON-LD structured data. This tells Google exactly what the item is, its price, its rating, and currency. This allows ORMA listings to appear dynamically as "Product Cards" directly in Google Search results.
- **Metadata Generation:** Listings dynamically generate their `<title>` and OpenGraph tags on the server side prior to sending down to the client.

---

## 12. CURRENT PROGRESS: WHAT HAS BEEN BUILT?

ORMA is roughly **80% complete** regarding a fully functional marketplace minimum viable product. 

**✅ COMPLETED SYSTEMS:**
- **Full UI/UX Overhaul:** The shift to an Apple-inspired aesthetics (White/Black/Blue) is globally implemented, completely removing legacy coral iterations.
- **User Authentication:** Email and Google OAuth flows work perfectly. Profile auto-creation works.
- **Listing Discovery & Browse Workflow:** Homepage layout, infinite scroll, robust filtering, location prioritization, and dynamic mapping are all active.
- **The 7-Step Listing Engine:** The extensive wizard to create a listing, including drag-and-drop image uploading to Supabase Storage, works perfectly.
- **Real-Time Engine:** Subscriptions work. Users can open chats, send messages, get unread badges, and auto-scroll threads seamlessly.
- **Reviews & Ratings:** The entire ecosystem of rating an item securely, and the database automatically aggregating average scores, is fully functional.
- **Wishlist Flow:** Optimistic UI bookmarking performs magically.

**🔴 STILL MOCKED / INCOMPLETE:**
- **Dashboard Data:** The owner dashboard charts and percentage increase numbers are currently displaying randomized math. They need to be hooked up to a real historical views table.
- **PWA Service Worker:** A service worker exists (`sw.js`), but it is currently set to network-only. Genuine offline caching is not configured.
- **User Identity Verification:** The UI for verification exists, but there is no actual KYC (Know Your Customer) flow built (e.g., uploading an ID card to a third party).

---

## 13. THE FUTURE ROADMAP: WHAT'S NEXT?

To transition ORMA from a functional "classifieds/messaging" board to a true "Transactional Marketplace", the following critical infrastructure needs to be built:

### Phase 1: The Transaction Engine (High Priority)
- **Payment Gateway Integration:** Integration with Stripe or Razorpay. Currently, users can *talk* to owners, but they cannot inherently "pay" them. We need to handle holding security deposits and transferring rental fees.
- **Booking / Calendar System:** A true reservation engine. A database table is needed to block out dates (e.g., "This tent is rented from Oct 12 to Oct 15"). The `BookingWidget` UI exists but needs backend logic.

### Phase 2: Platform Trust & Moderation (Medium Priority)
- **Admin Dashboard:** A separate interface to view flagged user reports, ban malicious users, and delete fraudulent listings.
- **Automated Image Moderation:** Using an API (like Google Cloud Vision) to ensure users aren't uploading inappropriate images when creating listings.
- **Transactional Emails:** Integrating Resend or Sengrid to send emails: "Your item was booked!", "Please review your rental", "Welcome to ORMA".

### Phase 3: Expansion & Polish (Low Priority)
- **Multi-language Support:** While the interface looks ready for it, actual `i18n` translation files are required.
- **Delivery Tracking:** A system to handle the logistics if an owner selects "Delivery Available".
- **Comprehensive E2E Testing:** Installing Playwright or Cypress to automate click-tests to ensure new deployments don't break the auth or listing flows.

---

## 14. LOCAL DEVELOPMENT GUIDE

If you are a developer looking to run ORMA on your own machine, follow these steps exactly.

### Prerequisites
- Node.js version 20+ installed
- NPM or Yarn installed
- A free Supabase account
- Git installed

### Step 1: Clone & Install Dependencies
Open your terminal and clone the repository.
```bash
git clone https://github.com/SnvvSuchandraEtti/ORMA.git
cd ORMA
npm install
```

### Step 2: Establish the Supabase Backend
ORMA requires a Supabase backend to function.
1. Go to [Supabase.com](https://supabase.com) and create a new project.
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open the `complete_schema.sql` file from the ORMA repository root. Copy all the contents and paste them into the SQL Editor. Click **RUN**. This will instantly build the entire database, all tables, RLS policies, and triggers.
4. Open the `seed-data.sql` (or `seed-data-v2.sql`) file, paste it into the SQL Editor, and run it. This will populate your database with dummy users, listings, and reviews so you aren't starting with a blank screen.
5. Open the `storage-policies.sql` file and run it to configure your image bucket.

### Step 3: Configure Environment Variables
In the root directory of your project, create a file named `.env.local`.

Go to your Supabase Dashboard -> **Project Settings** -> **API**. Copy your URL and Anon Key.

Paste them into `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_ROLE_KEY]
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Run the Application
Start the Next.js development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`. You should now have a fully functioning version of ORMA running locally, hooked up to your very own cloud database!

> **Having Issues?**
> - If images aren't loading, check that you ran the `storage-policies.sql` properly inside Supabase.
> - If login fails, ensure your Supabase Auth settings have "Email providers" enabled.
> - If you make UI changes, remember that Tailwind v4 processes changes on the fly. 

***

*End of ORMA Infrastructure Document. Authored by the ORMA Dev Team.*



# ORMA — Complete Project Information Report

> **Generated:** April 12, 2026  
> **Live URL:** [https://orma10.vercel.app](https://orma10.vercel.app)  
> **Repository:** `SnvvSuchandraEtti/ORMA`  
> **Version:** 0.1.0  
> **Status:** 🟡 Active Development — ~80% Complete

---

## 1. PROJECT OVERVIEW

**ORMA** is a **peer-to-peer rental marketplace** platform that allows users to list and rent items from each other. Think of it as "Airbnb for everything" — users can rent out anything from cameras, laptops, and cars to furniture, gaming consoles, and event equipment.

### Core Value Proposition
- **Renters:** Find and rent items nearby at affordable daily/weekly/monthly rates
- **Owners:** Monetize idle items by listing them for rent
- **Platform:** Facilitates discovery, messaging, reviews, and trust through verification

### Target Market
- **Geography:** India (INR currency, Indian cities like Hyderabad, Bangalore, Mumbai, Chennai, etc.)
- **Users:** College students, young professionals, event organizers, travelers

---

## 2. TECHNOLOGY STACK

### Frontend / Core Framework
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.1 | React meta-framework (App Router) |
| **React** | 19.2.4 | UI component library |
| **TypeScript** | ^5 | Type-safe development |
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **Framer Motion** | ^12.38.0 | Animations & transitions |

### Backend / Database
| Technology | Version | Purpose |
|---|---|---|
| **Supabase** | ^2.99.3 | Backend-as-a-Service (PostgreSQL, Auth, Storage, Realtime) |
| **@supabase/ssr** | ^0.9.0 | Server-side rendering support for Supabase |
| **Supabase Auth** | Built-in | Email/password + Google OAuth authentication |
| **Supabase Realtime** | Built-in | Real-time messaging via WebSocket subscriptions |
| **Supabase Storage** | Built-in | Image uploads for listing photos |

### State Management
| Technology | Purpose |
|---|---|
| **Zustand** (^5.0.12) | Global state management (messages, listing form) |
| **React Context** | Auth state, Theme state |

### UI & Library Dependencies
| Library | Purpose |
|---|---|
| **Lucide React** (^0.577.0) | Icon system (100+ icons used) |
| **Leaflet** + **React Leaflet** | Interactive map for geolocation |
| **react-hot-toast** | Toast notification system |
| **react-dropzone** | Drag-and-drop image upload |
| **react-day-picker** | Date picker for rental period selection |
| **react-intersection-observer** | Infinite scroll trigger |
| **date-fns** | Date formatting & manipulation |
| **DOMPurify** | XSS protection / HTML sanitization |
| **clsx** + **tailwind-merge** | Dynamic class name utilities |

### Hosting & Deployment
| Service | Purpose |
|---|---|
| **Vercel** | Next.js hosting & deployment |
| **Supabase Cloud** | Database, Auth, Storage, Realtime |

### Development Tools
| Tool | Purpose |
|---|---|
| **ESLint** (v9) | Code linting |
| **PostCSS** | CSS processing pipeline |
| **TypeScript Compiler** | Type checking (`strict: true`) |

---

## 3. PROJECT STRUCTURE

```
e:\ORMA\
├── .env.local                      # Environment variables (Supabase keys)
├── next.config.ts                  # Next.js configuration  
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies & scripts
├── postcss.config.mjs              # PostCSS config (Tailwind)
├── eslint.config.mjs               # ESLint config
│
├── complete_schema.sql             # Full Supabase database schema (556 lines)
├── schema.sql                      # Core schema
├── seed-data.sql                   # Initial seed data
├── seed-data-v2.sql                # Extended seed data (98KB)
├── storage-policies.sql            # Supabase storage bucket policies
├── supabase_messaging.sql          # Messaging schema
├── supabase_notifications.sql      # Notifications schema
├── supabase_reports.sql            # Reports schema
│
├── public/
│   ├── manifest.json               # PWA manifest
│   ├── sw.js                       # Service worker
│   ├── icon.svg, file.svg, etc.    # Static SVG assets
│
├── scripts/
│   ├── apply-dark-mode.js          # Dark mode application script
│   └── apply-dark-mode-form.js     # Dark mode form script
│
└── src/
    ├── app/                        # Next.js App Router pages (18 routes)
    ├── components/                 # React components (38 + 3 subdirs)
    ├── hooks/                      # Custom React hooks (7 hooks)
    ├── lib/                        # Utilities & Supabase clients
    ├── providers/                  # Context providers (Auth, Theme)
    ├── store/                      # Zustand stores (message, listing form)
    ├── types/                      # TypeScript type definitions
    └── proxy.ts                    # Proxy configuration
```

### Source Code Statistics
- **Total source files:** 110 files
- **Total source code size:** ~0.6 MB
- **Total commits:** 10
- **Lines of CSS:** 280 (globals.css)
- **Lines of SQL schema:** 556 (complete_schema.sql)
- **TypeScript type definitions:** 267 lines (16 types/interfaces)

---

## 4. DATABASE SCHEMA

The database is hosted on **Supabase** (PostgreSQL) and contains **9 tables** with full **Row-Level Security (RLS)** policies.

### Tables

| Table | Rows | Purpose | RLS |
|---|---|---|---|
| **profiles** | Auto-created | User profiles (name, avatar, city, bio, verification status, stats) | ✅ Public read, owner write |
| **categories** | 16 seeded | Rental categories (Cars, Bikes, Cameras, Laptops, etc.) | ✅ Public read |
| **listings** | Seed data | Rental listings with pricing, location, images, contact, terms | ✅ Public read, owner CRUD |
| **reviews** | Seed data | Rating & review system (1-5 stars, unique per user per listing) | ✅ Public read, auth insert |
| **wishlists** | User data | Saved/favorited listings | ✅ Private to user |
| **inquiries** | User data | Direct listing inquiries (legacy) | ✅ Sender/owner access |
| **conversations** | User data | Messaging threads between users | ✅ Participant access |
| **messages** | User data | Individual messages within conversations | ✅ Participant access |
| **notifications** | User data | System notifications (welcome, review, milestone, inquiry) | ✅ User-only access |
| **reports** | User data | Listing abuse/violation reports | ✅ Auth insert, reporter view |

### Database Functions & Triggers
| Function | Trigger | Purpose |
|---|---|---|
| `handle_new_user()` | `on_auth_user_created` | Auto-create profile on signup |
| `increment_views()` | Manual call | Track listing page views |
| `increment_inquiries()` | Manual call | Track inquiry count |
| `update_listing_rating()` | `on_review_change` | Recalculate avg rating on review insert/delete |
| `update_profile_listing_count()` | `on_listing_change` | Update profile listing count |
| `notify_owner_on_review()` | `trg_notify_owner_on_review` | Send notification when listing receives a review |
| `notify_owner_on_view_milestone()` | `trg_notify_owner_on_view_milestone` | Notify at 100, 500, 1000 views |
| `notify_user_on_profile_created()` | `trg_notify_user_on_profile_created` | Welcome notification for new users |

### Full-Text Search
- `search_vector` column using `TSVECTOR` on listings (title + description + brand + city)
- GIN index for fast full-text queries

### Database Indexes
- `idx_listings_owner_id`, `idx_listings_category_id`, `idx_listings_city`
- `idx_listings_status`, `idx_listings_price_per_day`
- `idx_listings_search` (GIN full-text)
- `idx_conversations_participants`, `idx_messages_conversation`
- `idx_notifications_user_id`, `idx_notifications_is_read`

### 16 Rental Categories (Seeded)
1. Cars, 2. Bikes, 3. Cameras, 4. Laptops, 5. Smartphones, 6. Furniture, 7. Appliances, 8. Gaming, 9. Tools, 10. Sports, 11. Musical Instruments, 12. Events, 13. Books, 14. Travel, 15. Clothing, 16. Others

---

## 5. AUTHENTICATION SYSTEM

### Supported Auth Methods
1. **Email/Password** — Sign up with full name + email + password
2. **Google OAuth** — One-click Google sign-in via Supabase OAuth

### Auth Flow
- `AuthProvider` wraps the entire app via React Context
- Session management via `supabase.auth.onAuthStateChange()`
- Post-login redirect stored in `localStorage`
- Pending actions (e.g., wishlist before login) stored in `localStorage` and completed after auth
- Profile auto-created via database trigger on signup
- Greeting changes by time of day (morning/afternoon/evening/night)

### Protected Routes
- `/profile`, `/dashboard`, `/list-your-item`, `/messages`, `/my-listings`, `/wishlist`, `/verification`
- Protected via `<ProtectedRoute>` wrapper that redirects unauthenticated users

---

## 6. PAGES & ROUTES (18 Routes)

### Public Pages

| Route | File | Type | Status | Description |
|---|---|---|---|---|
| `/` | `app/page.tsx` | Client | ✅ Complete | Homepage — listing grid, location detection, engagement banner, category grid, how-it-works, stats, CTA |
| `/search` | `app/search/page.tsx` | Client | ✅ Complete | Full search with filters, sort, infinite scroll, autocomplete |
| `/listing/[id]` | `app/listing/[id]/page.tsx` | Server + Client | ✅ Complete | Listing detail with SSR metadata, JSON-LD, image gallery, reviews, booking widget, contact modal |
| `/about` | `app/about/page.tsx` | Static | ✅ Complete | About page |
| `/how-it-works` | `app/how-it-works/` | Static | ✅ Complete | How It Works guide |
| `/faq` | `app/faq/` | Static | ✅ Complete | FAQ page |
| `/contact` | `app/contact/` | Static | ✅ Complete | Contact form page |
| `/terms` | `app/terms/` | Static | ✅ Complete | Terms of service |
| `/privacy` | `app/privacy/` | Static | ✅ Complete | Privacy policy |
| `/user/[id]` | `app/user/[id]/` | Dynamic | ✅ Complete | Public user profile page |
| `/auth/callback` | `app/auth/callback/route.ts` | API Route | ✅ Complete | OAuth callback handler |

### Authenticated Pages

| Route | File | Type | Status | Description |
|---|---|---|---|---|
| `/dashboard` | `app/dashboard/page.tsx` | Client | ✅ Complete | Owner dashboard with stats, chart, listing management, inquiries |
| `/profile` | `app/profile/page.tsx` | Client | ✅ Complete | Edit profile (name, phone, city, bio) |
| `/list-your-item` | `app/list-your-item/page.tsx` | Client | ✅ Complete | 7-step listing creation wizard |
| `/edit-listing/[id]` | `app/edit-listing/[id]/` | Client | ✅ Complete | Edit existing listing |
| `/my-listings` | `app/my-listings/page.tsx` | Client | ✅ Complete | View/manage own listings |
| `/wishlist` | `app/wishlist/page.tsx` | Client | ✅ Complete | Saved listings (favorites) |
| `/messages` | `app/messages/page.tsx` | Client | ✅ Complete | Real-time messaging interface |
| `/verification` | `app/verification/page.tsx` | Client | ✅ Complete | User verification page |

### SEO Routes
| Route | Purpose |
|---|---|
| `/sitemap.xml` | Dynamic sitemap (static pages + all active listings + user profiles) |
| `/robots.txt` | Allows all, disallows private routes |
| `opengraph-image.tsx` | Dynamic OG image generation |
| `apple-icon.tsx` | Dynamic Apple touch icon |

---

## 7. COMPONENTS (41 Components)

### Layout Components
| Component | File | Purpose |
|---|---|---|
| `ClientLayout` | ClientLayout.tsx | Main layout wrapper (navbar, category bar, footer, auth modal, mobile nav) |
| `Navbar` | Navbar.tsx (293 lines) | Top navigation with logo, search pill, user menu, theme toggle, notifications |
| `CategoryBar` | CategoryBar.tsx | Horizontal scrollable category filter bar (16 categories with icons) |
| `Footer` | Footer.tsx (252 lines) | 4-column footer with inspiration section, social links, language/currency |
| `MobileBottomNav` | MobileBottomNav.tsx | iOS-style bottom tab bar (Explore, Wishlist, List, Profile, Menu) |
| `MobileMenuDrawer` | MobileMenuDrawer.tsx | Full-screen mobile menu drawer |
| `SkipToContent` | SkipToContent.tsx | Accessibility skip link |

### Core Feature Components
| Component | File | Lines | Purpose |
|---|---|---|---|
| `ListingCard` | ListingCard.tsx | 374 | Listing card with image carousel, swipe gestures, wishlist toggle, badges, owner activity |
| `SearchBar` | SearchBar.tsx | 386 | Full search with autocomplete, recent searches, trending, category suggestions |
| `ExpandedSearchBar` | ExpandedSearchBar.tsx | ~250 | Airbnb-style expanded search with where/when/guests fields |
| `FilterPanel` | FilterPanel.tsx | ~250 | Side panel with price histogram, condition, city, delivery, verification filters |
| `AuthModal` | AuthModal.tsx | 451 | Login/signup modal with email + Google auth, animated tab switching |
| `ImageGallery` | ImageGallery.tsx | ~300 | Full-screen image gallery with lightbox, keyboard navigation |
| `BookingWidget` | BookingWidget.tsx | ~200 | Date picker + booking summary sidebar |
| `ContactModal` | ContactModal.tsx | ~300 | Contact owner via phone/WhatsApp/email with real-time conversation creation |
| `ShareModal` | ShareModal.tsx | ~170 | Share listing via link copy, WhatsApp, Twitter, Email, Facebook |
| `ReviewModal` | ReviewModal.tsx | ~230 | Submit review (1-5 stars + title + comment) |
| `ReportModal` | ReportModal.tsx | ~200 | Report listing for violations |
| `MapModal` | MapModal.tsx | ~180 | Full-screen Leaflet map showing listing location |
| `NotificationBell` | NotificationBell.tsx | ~170 | Notification dropdown with unread badge, mark-as-read |

### Messaging Components
| Component | File | Purpose |
|---|---|---|
| `ConversationList` | ConversationList.tsx | Left sidebar conversation list with avatars, timestamps, unread indicators |
| `MessageThread` | MessageThread.tsx | Chat thread with auto-scroll, message bubbles, input field, real-time updates |

### Home Page Sections
| Component | File | Purpose |
|---|---|---|
| `RecentlyViewedSection` | home-sections/RecentlyViewedSection.tsx | Shows recently viewed listings from localStorage |
| `PopularSection` | home-sections/PopularSection.tsx | Shows top-rated and most-viewed listings |
| `CategoryGridSection` | home-sections/CategoryGridSection.tsx | Visual category grid with icons |
| `HowItWorksSection` | home-sections/HowItWorksSection.tsx | 3-step how-it-works guide |
| `CtaBannerSection` | home-sections/CtaBannerSection.tsx | Call-to-action banner to list items |
| `StatsCounterSection` | home-sections/StatsCounterSection.tsx | Animated stat counters (listings, users, cities, reviews) |

### Listing Creation Steps (7-Step Wizard)
| Step | Component | Purpose |
|---|---|---|
| 1 | `StepCategory` | Select listing category |
| 2 | `StepPhotos` | Upload photos (drag-and-drop with react-dropzone) |
| 3 | `StepDetails` | Title, description, brand, model, condition |
| 4 | `StepPricing` | Hourly/daily/weekly/monthly pricing + security deposit |
| 5 | `StepLocation` | City, area, state, pincode |
| 6 | `StepContact` | Phone, WhatsApp, email, preferred contact method |
| 7 | `StepReview` | Final review & publish |

### Utility Components
| Component | Purpose |
|---|---|
| `BackToTopButton` | Floating scroll-to-top button |
| `FloatingMapButton` | Floating map view toggle button |
| `InfiniteScrollTrigger` | Intersection observer for infinite scrolling |
| `TopLoadingBar` | Page transition loading bar |
| `FullPageLoader` | Full-screen spinner |
| `OfflineBanner` | Offline status indicator |
| `WelcomeModal` | First-time user welcome modal |
| `ThemeToggle` | Light/dark mode toggle button |
| `TrustScore` | Trust score visualization |
| `LiveViewerCount` | Real-time viewer count indicator |
| `DetailPageSkeleton` | Loading skeleton for listing detail |
| `ListingCardSkeleton` | Loading skeleton grid for listing cards |
| `Breadcrumb` | Page breadcrumb navigation |
| `ErrorBoundary` | React error boundary wrapper |
| `ProtectedRoute` | Auth-guarded route wrapper |
| `CustomToast` | Styled toast notifications |
| `EngagementBanner` | Promotional engagement banner |

---

## 8. CUSTOM HOOKS (7 Hooks)

| Hook | File | Purpose |
|---|---|---|
| `useAuth()` | hooks/useAuth.ts | Re-exports `useAuthContext` from AuthProvider |
| `useInfiniteListings()` | hooks/useInfiniteListings.ts | Paginated listing fetching with filters, sorting, infinite scroll |
| `useUserLocation()` | hooks/useUserLocation.ts | Geolocation detection via browser API + Nominatim reverse geocode |
| `useRecentlyViewed()` | hooks/useRecentlyViewed.ts | Tracks recently viewed listings in localStorage |
| `useFocusTrap()` | hooks/useFocusTrap.ts | Traps keyboard focus within modals (accessibility) |
| `useOnlineStatus()` | hooks/useOnlineStatus.ts | Detects online/offline status |
| `useReducedMotion()` | hooks/useReducedMotion.ts | Respects `prefers-reduced-motion` media query |

---

## 9. STATE MANAGEMENT

### Zustand Stores (2 Stores)

#### `messageStore.ts` — Global Messaging State
- **State:** conversations list, unread count, current user ID
- **Actions:** initialize, fetchConversations, markConversationAsRead, sendMessage
- **Real-time:** Subscribes to `postgres_changes` on `messages` and `conversations` tables
- **Features:** Optimistic message updates, automatic unread count tracking

#### `listingFormStore.ts` — Listing Creation Wizard State
- **State:** current step (1-7), full form data
- **Actions:** setStep, nextStep, prevStep, updateFormData, resetForm
- **Persistence:** In-memory only (lost on page refresh)

### React Context Providers (2 Providers)

#### `AuthProvider` — Authentication State
- User object, profile data, loading state, auth methods
- Handles sign-in (email + Google), sign-up, sign-out, profile updates
- Auto-creates profile via database trigger
- Completes pending actions after login (e.g., wishlist saves)

#### `ThemeProvider` — Theme State
- Light/Dark mode toggle
- Persists preference in `localStorage` as `orma-theme`
- Respects `prefers-color-scheme` system setting
- Prevents hydration flash via visibility hiding during mount

---

## 10. DESIGN SYSTEM & UI

### Design Language
The UI follows an **Apple-inspired minimalist aesthetic** with the following characteristics:

- **Color Palette:** White (#FFFFFF), Black (#1D1D1F), Blue (#0071E3), Gray (#86868B)
- **Dark Mode:** Full dark theme with #121212/#1C1C1E backgrounds
- **Typography:** Inter font (Google Fonts) with -apple-system fallback
- **Border Radius:** Large rounded corners (16px cards, 980px pills/buttons)
- **Shadows:** Subtle, multi-layered shadows mimicking Apple's depth system
- **Glassmorphism:** `backdrop-filter: blur(20px)` on navbar, mobile nav
- **Animations:** Framer Motion for page transitions, staggered card reveals, modal animations

### CSS Architecture
- **Framework:** Tailwind CSS v4 with `@theme` directive for design tokens
- **Custom CSS:** Custom utilities (glass, shimmer, line-clamp, apple-link, apple-divider)
- **Animations:** shimmer, fadeIn, slideUp, slideDown keyframes
- **Accessibility:** Focus-visible indicators, reduced-motion support, skip-to-content link
- **Scrollbar:** Custom webkit scrollbar styling

### Responsive Breakpoints
| Breakpoint | Usage |
|---|---|
| `xs` (480px) | Custom breakpoint |
| `sm` (640px) | Mobile landscape |
| `md` (768px) | Tablet / mobile-to-desktop transition |
| `lg` (1024px) | Desktop |
| `xl` (1280px) | Large desktop |
| Max container: 1760px | Content width cap |

---

## 11. SECURITY FEATURES

| Feature | Implementation |
|---|---|
| **Row-Level Security (RLS)** | All tables have RLS policies — users can only read/write their own data |
| **Content Security Policy** | Strict CSP headers in next.config.ts |
| **X-Frame-Options** | DENY (prevents clickjacking) |
| **X-Content-Type-Options** | nosniff |
| **X-XSS-Protection** | 1; mode=block |
| **Referrer-Policy** | origin-when-cross-origin |
| **XSS Prevention** | DOMPurify for HTML sanitization |
| **Input Sanitization** | `lib/sanitize.ts` for user-generated content |
| **Error Handling** | `lib/handleError.ts` for Supabase error handling |
| **Auth Guards** | `<ProtectedRoute>` component for authenticated routes |

---

## 12. SEO & PERFORMANCE

### SEO Implementation
| Feature | Status |
|---|---|
| Dynamic `<title>` tags | ✅ Per-page with template `%s | ORMA` |
| Meta descriptions | ✅ Per-page |
| Open Graph tags | ✅ Dynamic per listing |
| Twitter Cards | ✅ `summary_large_image` |
| Dynamic Sitemap | ✅ Static pages + all listings + user profiles |
| robots.txt | ✅ Allows crawling, disallows private routes |
| JSON-LD Schema | ✅ Product schema on listing pages with AggregateRating |
| Dynamic OG Image | ✅ `opengraph-image.tsx` |
| Canonical URLs | ✅ Set in metadata |

### Performance Optimizations
| Feature | Status |
|---|---|
| Next.js Image optimization | ✅ With blur placeholder, lazy loading, responsive sizes |
| Infinite scroll pagination | ✅ 20 items per page with IntersectionObserver |
| Component-level code splitting | ✅ Dynamic imports for AuthModal |
| Suspense boundaries | ✅ On all client pages |
| Image preloading | ✅ Preloads next/prev images in carousel |
| Memoized components | ✅ `ListingCard` wrapped in `memo()` |
| Debounced search | ✅ 300ms debounce on autocomplete queries |
| Font optimization | ✅ `next/font/google` with `display: swap` |

### PWA Support
| Feature | Status |
|---|---|
| manifest.json | ✅ Defined (name, icons, theme) |
| Service Worker | ✅ Registered (`sw.js`) — currently network-only (no caching) |
| Offline Banner | ✅ Shows offline indicator |

---

## 13. FEATURES — WHAT IS BUILT (COMPLETED ✅)

### Core Marketplace Features
- [x] **Browse Listings** — Grid view with staggered animations, responsive layout
- [x] **Search** — Full-text search with autocomplete, recent searches, trending suggestions
- [x] **Category Filtering** — 16 categories with icon bar, URL-based filtering
- [x] **Advanced Filters** — Price range, condition, city, delivery, verified owners, availability
- [x] **Sorting** — Recommended, Newest, Price (low/high), Top Rated, Popular
- [x] **Infinite Scroll** — Automatic pagination with loading indicators
- [x] **Location-based Listings** — Geolocation detection + manual city selection
- [x] **Listing Card** — Image carousel with swipe, wishlist heart, NEW/POPULAR badges, owner activity status

### Listing Details
- [x] **Image Gallery** — Full-screen lightbox with keyboard navigation
- [x] **Pricing Display** — Hourly/daily/weekly/monthly with security deposit
- [x] **Owner Info** — Avatar, name, verification badge, join date, reply rate
- [x] **Reviews & Ratings** — Star ratings, written reviews, verified rental tag
- [x] **Map View** — Leaflet map showing listing location
- [x] **Contact Owner** — Phone, WhatsApp, Email, In-app messaging
- [x] **Share Listing** — Copy link, WhatsApp, Twitter, Email, Facebook
- [x] **Report Listing** — Report for violations/spam
- [x] **Similar Listings** — Related listings suggestions
- [x] **Live Viewer Count** — Shows how many people are viewing
- [x] **Breadcrumb Navigation** — Page location breadcrumbs

### User Account
- [x] **Email/Password Auth** — Sign up, login, password visibility toggle
- [x] **Google OAuth** — One-click Google sign-in
- [x] **Profile Management** — Edit name, phone, city, bio
- [x] **Avatar Display** — Google avatar or initials
- [x] **Verification Page** — User verification status

### Listing Management
- [x] **7-Step Listing Wizard** — Category → Photos → Details → Pricing → Location → Contact → Review
- [x] **Photo Upload** — Drag-and-drop with react-dropzone, Supabase Storage
- [x] **Edit Listing** — Modify existing listing details
- [x] **My Listings Page** — View/manage all own listings
- [x] **Activate/Deactivate** — Toggle listing availability from dashboard

### Dashboard
- [x] **Stats Cards** — Total views, inquiries, avg rating, estimated revenue
- [x] **Performance Chart** — 7-day bar chart with tooltips
- [x] **Inventory Status** — Active/Rented/Inactive counts
- [x] **Recent Inquiries** — Latest messages from interested renters
- [x] **Manage Listings Table** — Edit/activate/deactivate from one view

### Messaging
- [x] **Real-time Chat** — WebSocket-based instant messaging via Supabase Realtime
- [x] **Conversation List** — Sorted by latest message, unread indicators
- [x] **Message Thread** — Auto-scrolling chat bubbles, timestamps
- [x] **Unread Counter** — Global badge on navbar and mobile nav
- [x] **Auto-create Conversation** — Creates conversation when contacting an owner

### Wishlist / Favorites
- [x] **Save to Wishlist** — Heart button on listing cards and detail page
- [x] **Optimistic Updates** — Instant UI response before server confirmation
- [x] **Wishlist Page** — View all saved listings
- [x] **Pending Wishlist** — Saves wishlist action before auth, completes after login

### Notifications
- [x] **Notification Bell** — Dropdown with all notifications
- [x] **Notification Types** — Welcome, review received, view milestones, system
- [x] **Mark as Read** — Individual and batch
- [x] **Auto-generated** — Triggered by database events (reviews, milestones, signup)

### UI/UX Features
- [x] **Dark Mode** — Full dark theme with smooth transitions
- [x] **Mobile-First** — Responsive design with mobile bottom nav
- [x] **Loading Skeletons** — Shimmer placeholders during data loading
- [x] **Toast Notifications** — Success/error toasts with custom styling
- [x] **Back-to-Top Button** — Floating scroll button
- [x] **Welcome Modal** — First-time user onboarding
- [x] **Error Boundary** — Graceful error handling with recovery
- [x] **Accessibility** — Focus trapping, ARIA labels, skip-to-content, reduced motion
- [x] **Mobile Menu Drawer** — Full-screen mobile navigation
- [x] **Time-based Greetings** — Morning/afternoon/evening/night personalized greetings

---

## 14. FEATURES — WHAT STILL NEEDS WORK (REMAINING 🔴)

### High Priority — Missing Core Features
- [ ] **Payment Integration** — No payment gateway (Razorpay/Stripe) for deposits or rental fees
- [ ] **Booking/Reservation System** — No actual booking flow — users can only inquire, not book dates
- [ ] **Forgot Password Flow** — Button exists in AuthModal but no actual reset email implementation
- [ ] **Email Notifications** — No email sending (verification, booking confirmation, etc.)
- [ ] **Admin Panel** — No admin dashboard for content moderation, user management, analytics
- [ ] **Image Moderation** — No automated content moderation for uploaded photos
- [ ] **Listing Approval Queue** — Listings go live immediately with no review process

### Medium Priority — Feature Gaps
- [ ] **User Verification System** — Verification page exists but no actual verification flow (ID proof upload, phone verification)
- [ ] **Rental History** — No record of past rentals/transactions
- [ ] **Booking Calendar** — `BookingWidget` exists but doesn't persist bookings
- [ ] **Push Notifications** — No browser push notifications (service worker present but not configured)
- [ ] **Rating System for Renters** — Only listing owners get rated, not renters
- [ ] **Dispute Resolution** — No system for handling disputes between owners and renters
- [ ] **Insurance Integration** — Referenced in footer but not implemented
- [ ] **Delivery Tracking** — "Delivery available" flag exists but no tracking system
- [ ] **Multi-language Support** — Only English, despite "English (IN)" toggle in footer
- [ ] **Currency Conversion** — Only INR, despite currency toggle in footer
- [ ] **Blog System** — Footer links to `/about#blog` but no blog exists
- [ ] **Careers Page** — Footer links to `/about#team` but no careers section
- [ ] **Password Change** — No way to change password from profile
- [ ] **Account Deletion** — No account deletion flow
- [ ] **Search Suggestions API** — Client-side suggestions only, no server-side search index

### Low Priority — Polish & Optimization
- [ ] **PWA Caching** — Service worker currently bypasses cache entirely (network-only)
- [ ] **Server-Side Search** — `useInfiniteListings` does client-side city prioritization, not server-side
- [ ] **Social Media Links** — Footer social links all point to `#`
- [ ] **PWA Icons** — manifest.json references `/icon-192.png` and `/icon-512.png` which may not exist
- [ ] **Automated Testing** — No test files (unit, integration, or E2E)
- [ ] **Error Monitoring** — No Sentry or similar error tracking
- [ ] **Analytics** — No Google Analytics, Mixpanel, or PostHog
- [ ] **Rate Limiting** — No API rate limiting on search/autocomplete queries
- [ ] **Image Optimization** — Images stored as-is in Supabase, no server-side compression
- [ ] **Accessibility Audit** — Basic a11y implemented but no WCAG compliance testing
- [ ] **Performance Testing** — No Lighthouse CI or Web Vitals monitoring
- [ ] **manifest.json theme_color** — Still set to `#FF385C` (old coral) instead of `#0071E3` (new blue)

### Known Bugs / Technical Debt
- [ ] **Dashboard chart data is mock** — 7-day chart distributes total views randomly, not from real historical data
- [ ] **Dashboard percentage changes are random** — `Math.floor(Math.random() * 20) + 1` generates fake growth percentages
- [ ] **Location prompt uses `window.confirm()`** — Should use a proper modal instead of browser dialog
- [ ] **Supabase client recreated on every render** — `createClient()` called inside components without memoization
- [ ] **`eslint` dependencies in `@types`** — `@types/dompurify` and `@types/leaflet` are in `dependencies` instead of `devDependencies`
- [ ] **No database migrations** — Schema uses raw SQL files, not a migration system
- [ ] **Copyright year** — Footer shows "© 2025 ORMA, Inc." — should be dynamic

---

## 15. DEPLOYMENT STATUS

| Environment | URL | Status |
|---|---|---|
| **Production** | [https://orma10.vercel.app](https://orma10.vercel.app) | ✅ Live & Operational |
| **Local Dev** | http://localhost:3000 | ✅ Works with `npm run dev` |
| **Database** | Supabase Cloud (`loltimoiqkwgeftrslpb.supabase.co`) | ✅ Connected |

### Live Site Verification
- ✅ Homepage loads with correct title "ORMA - Rent anything from anyone anywhere"
- ✅ OG description: "Find and list anything for rent on ORMA — the one-place rental marketplace."
- ✅ Dark mode works
- ✅ Category bar renders
- ✅ Listing cards display
- ✅ Auth modal functions (Login/Signup)
- ✅ Search page functions

---

## 16. ENVIRONMENT CONFIGURATION

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://loltimoiqkwgeftrslpb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_04k8_...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_04k8_...

# App Configuration
NEXT_PUBLIC_APP_NAME=ORMA
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 17. GIT HISTORY

| Commit | Message |
|---|---|
| `5a9e1e7` | ORMA complete with seed data |
| `b898ae1` | first commit |
| `6f250ee` | initial commit |
| `dcf0a4f` | Update README.md |
| `b4ee4cb` | Fix formatting of ORMA link in README |
| `35eb1ab` | Rename project link from ORMA to PROJECT_ORMA |
| `454d868` | Update README.md |
| `798e1e3` | Final Polish Pass: Performance, Security, SEO and Bug Fixes |
| `a7965ba` | Final production polish and bug fixes |
| `01d1c75` | cm8 |

**Total Commits:** 10

---

## 18. LOCAL DEVELOPMENT COMMANDS

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 19. OVERALL ASSESSMENT

### Strengths 💪
1. **Premium UI/UX** — Apple-inspired design is clean, polished, and professional
2. **Feature-rich** — Covers listing, search, messaging, reviews, dashboard, wishlists
3. **Real-time messaging** — Supabase Realtime gives instant chat experience
4. **Full dark mode** — Comprehensive light/dark theme implementation
5. **Mobile-first** — Excellent responsive design with bottom nav and mobile menu
6. **SEO optimized** — Dynamic sitemap, OG tags, JSON-LD, SSR metadata
7. **Security** — RLS policies, CSP headers, XSS protection, input sanitization
8. **Accessibility** — Focus trapping, ARIA labels, reduced motion, skip links
9. **Type safety** — Full TypeScript with strict mode and comprehensive type definitions
10. **Modern stack** — Latest Next.js 16, React 19, Tailwind v4

### Weaknesses 🔧
1. **No payment system** — Cannot complete actual rental transactions
2. **No booking flow** — Users can inquire but not reserve dates
3. **Mock dashboard data** — Chart and percentages use random numbers
4. **No automated tests** — Zero test files in the project
5. **No admin panel** — No way to moderate content or manage users
6. **No email system** — No transactional emails for any flow
7. **Service worker is a no-op** — PWA manifest exists but no actual offline support
8. **No analytics/monitoring** — No tracking, error monitoring, or performance metrics

### Development Completion Estimate

| Module | Completion |
|---|---|
| **UI/UX Design** | 95% ✅ |
| **Frontend Components** | 90% ✅ |
| **Authentication** | 85% 🟡 |
| **Search & Discovery** | 90% ✅ |
| **Listing CRUD** | 85% ✅ |
| **Messaging System** | 80% ✅ |
| **Dashboard & Analytics** | 65% 🟡 |
| **Payment & Booking** | 0% 🔴 |
| **Admin & Moderation** | 0% 🔴 |
| **Email Notifications** | 0% 🔴 |
| **Testing** | 0% 🔴 |
| **Monitoring & Analytics** | 0% 🔴 |
| **Overall** | **~60-65%** |

---

> **Summary:** ORMA is a well-architected, visually polished rental marketplace with strong frontend implementation and core marketplace features. The major gaps are backend business logic around payments, bookings, email notifications, and admin tooling. The frontend and database design provide a solid foundation for building out the remaining features.
