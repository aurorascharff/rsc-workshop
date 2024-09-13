# React Server Components and React 19 in the Next.js App Router

## DAY 1

## Slides: Introduksjon til Rendering on the Web and Next.js App Router

### Intro: Create a Next.js app

- Create a new Next.js app with `npx create-next-app@latest`
- Go through Next.js 14 boilerplate file structure and basics
- Rootlayout, children prop page, Image

### Show: Setup the repository

- Github: Fork / copy files for starter project, code-workspace
- README.md show commands and run together npm install, npm run dev, verify running
- Talk about eslint and prettier, show setup and rules, check code-workspace, verify its working
- Talk about Prisma and the database, show schema
- README.md prisma seed together

### Show: Go through the repository

- CRUD app for managing contacts: quick demo
- Vise next.js server side rendering console, turn off js
- Introduce the structure and the components
- Nested layouts: state in the url, users will awlays see the same thing. Benefits?
- We are using tailwind, easy to make the app mobile friendly, show the tailwind.config.js and breakpoints, show mobile logo dissapearing. Hvem har brukt tailwind før?
- Introduce the cva() library
- Vi skal bli bedre kjent med dette over workshoppen, poenget er at vi skal lage noe som fungerer uten å bruke for mye tid på css og html
- PAUSE?

### Intro: What are server components?

- Excalidraw: Server components are a new feature in React 19, that allows you to run React components on the server. Differ from SSR because they never re-render, only run once on the server to generate UI. Js never shipped to client, never hydrated.
- Excalidraw: "the server" fullstack framework, rendered in build or request time
- Excalidraw: never hydrated, partially hydrated, exclude js from the client
- Next.js is a React metaframework that includes server components, server component by default.
- Console.log page.tsx
- No js in the browser for page.tsx
- Make (intro)/client-server/page.tsx
- Link to client-server in page.tsx
- Make ServerComponent inside client-server/_components and give it styles, add to page.tsx
- ServerComponent console log
- Anything you do here won't add to the bundle size
- Async and fetch data prisma or fetch api, data[0]
- Limitations onclick button, we need client for interactivity or browser stuff or js on the client

## Intro: What are client components?

- Make ClientComponent inside client-server/_components and give it styles, add to page.tsx
- Normal react components are marked with "use client"
- They are rendered on the server and then hydrated on the client like with normal SSR
- onClick alert, onclick state change
- Console log client
- Page.js has js in the browser
- Excalidraw: show tree server and client and discuss hydration
- Basically, try to put client code in the leaves to optimize performance, but dont worry too much about it
- Next.js [docs](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) client/server components

## Intro: Client/server composition

- Now we need to compose them: split view
- Client in server: all good
- Server in client: any imported to client, like server, becomes client, fails
- Donut pattern: children and content, works because it´s a reference
- Excalidraw: donut pattern and fetch data again, use cases collapsible sidebar or autoscrolling-chat

### Intro: Benefits and drawbacks

- Excalidraw: benefits and drawbacks
- Benefits: data fetching, access to backend, caching, bundle size, streaming, DX
- Drawbacks: needs framework like nextjs, complexity, learning curve
- How do they work (ikogito console): SSR html, js-bundles for hydration, and rsc payload is the server component in seralizable form, generated in build or on server for dynamic data. Payload is used to create the client tree, and can be refreshed without destroying client state. If they pass props to client that have updated, client updates. Ikke workshoppens focus.

### App: code all data fetching

- Fetch data in contactList: first inside the component, then getContacts inside data/services med sortering
- Nevne setup her, kan ha 1 fil for hver “feature” osv, smak og behag
- Nevne server-only
- Fetch data in contact page: getContact inside data/services
- Add contactId/not-found.tsx og throw fra contactId, contactId/edit/page.
- Add not-found.tsx global
- Fetch data in edit contact page
- Discuss composability and compare with React Query
- Show excalidraw
- Excalidraw tree so far
- Alt er på server, ikke noe JS på client ennå

### App: code client component logic

- Search component: Does anybody know whats happening here? Comment out piece by piece, Discuss web standard way to search already working. Show that it works and works without js. Preventdefault. [source](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- Kode search component: default full page reload, could be a plain filter but we want to use the url, defaultvalue. Vi skal fikse det litt senere.
- Kode contact list: extract to property and move await, filter, could do this on the server
- Kode contact button: dont need to mark as use client. Why? Reload hvis det feiler. Legg til likevel.
- Excalidraw tree, minimalt med JS på client. Etterhvert som vi skalerer blir dette viktigere.

### LUNCH DAY 1

### Slides: Core web vitals and performance

- Demo lighthouse in application

### Intro: Statiske og dynamiske sider

- Statiske sider: bygget en gang, serveret til alle, ingen data fetching. Eksempel: Inmeta.no. Nevne ISR.
- Dynamiske sider: data fetching, serveret til brukeren, data kan endres. Eksempel: Avfallsdeklarering. Vis avfallsdek prod arbeidsflate. Skal bruke denne til eksempel idag.
- Docs [nextjs](https://nextjs.org/docs/app/building-your-application/rendering/server-components#server-rendering-strategies)
- Vise build output: statisk og dynamisk. Default database og route: dynamisk. Dynamisk fordi paramter, kan bruke generateStaticParams. Cookies() vil også gjøre det dynamisk. Resten statisk.
- Nevne [PPR](https://www.partialprerendering.com/)
- Loading states are hard

### Intro: What are transitions?

- Create a layout for (intro) and add a Link to the transitions page, create page.tsx
- Transitions mark a state update as non urgent and allow the app to handle other actions while it´s happening. Concurrent feature in React 18.
- Create the demo
- Show unresponsive app
- Add transition: responsive app
- UseTransition: pending state
- All state updates are executes once they are all done, show example with setCount, click multiple on slow batches
- Explain next.js navigations are transitions, can always be cancelled

### App: Add transition and ContactButton sidebar

- Transitions can be added to navigations explicitly to track the state of it. The destination has an "await" which the app is transitioning to.
- Awaiting a contact db call. Need to show this somehow or the app will not feel good. Awaiting the server on the page we´re navigating to.
- Make it slow to see the freeze
- Since this is dynamic, we are running the await on the server. With static content, it has already run in the build and we don´t have to worry about loading states.
- Add transition to ContactButton, isPending

### App: Add transition to Search

- Nå har søket vårt blitt tregt, destination has again a slow await
- Full page reload, no client side nav. View request in server log.
- Add transition for spinner to the search. Batching, we dont need to debounce fordi transitions gjør alt etter alt er ferdig. Kun ett søk i historikken.
- PAUSE?

### Intro: What is suspense?

- Add a Link to the suspense page and create suspense/page.tsx
- Hva forbinder dere med suspense?
- Suspense allows you to handle loading states in a declarative way. Concurrent feature in React 18. [Source](https://react.dev/reference/react/Suspense)
- Used for lazy loading, code splitting, data fetching. Typically lazy loading in a React SPA.
- Also used for progressive hydration, meaning priorotizing what to hydrate first.
- In our case: mark content as non-urgent, show fallback, refer back whenever app is not busy.
- Create the example: first loading.tsx, then extra Suspense
- Unblocke hver del
- The content is streaming in to the client, show in network tab.
- You need to decide where to wait: in the source or in the destination.
- Explain when to pick what: Is there something to show in the source? Use transitions. Is there something to show in the destination? Use suspense.
- Avfallsdek: suspenses arbeidsflate og maler.
- Have to think about avoiding cumulative layout shift.

### App: Add suspense to ContactPage

- Comment out transition in ContactButton
- Add suspense loading.tsx to ContactPage (skeleton ligger i contact layout.tsx)
- Create skeleton by copy-pasting the top (image) of the component cleaning it up
- Hva foretrekker dere her? Suspense eller transition? Hvorfor?
- Disse tingene er litt vanskelig og tok meg tid å forstå.
- PAUSE?

### Intro: Introduce Server Actions

- Som dere sikkert merket er det mange av knappene som ikke funker, vi er kommet til datamutasjoner
- Hva vil man gjør en mutering? Sende noe fra client til server.
- Excalidraw: Server actions are a new feature in React 19, that allows you to create server code that can be called from the client
- We cant pass functions over the network, serializable
- Har noen brukt pages router?
- Pages router: you created API endpoints and used for example trpc
- Type safety and creates a hidden api-endpoint
- Excalidraw: "use server" mutateData.ts, back to the server
- Show in code mutdateData getcontact[0].id, use in ClientComponent alert, show error then no error
- Not recommended for data fetching unless specific use cases such as infinite scroll

### App: Write and use all server actions, make CRUD work, pending-states

- La oss fullføre CRUD her
- Data access layer actions, prefer extracting the actions
- Create: createEmptyContact.ts, view, make slow and add transition for loading state, "creating" + disabled
- Update: ContactForm "use client" move data fetch, onSubmit, updateContactSimple slow (kopier create)
- Delete: deleteContact (kopier create), DeleteContactButton "use client" onClick modal
- Vi skal rydde litt i dette imorgen med React 19, nå er det litt mange filer
- PAUSE?

### Slides: TASK 1

## Utføre TASK 1 Selv

### Show: TASK 1 Solution

- Show the loading states in update and delete
- Show edit loading.tsx, mention that you can also use a transition
- Show the favourite code and example
- Fremdeles ikke helt topp
- We will improve the favourite tomorrow med React 19

## Slides: Plan for dag 2

## DAY 2

### Slides: Dag 1 plan, hva lærte dere?

### Slides: Introduksjon til React 19 og React Compiler

## Enable React Compiler and look in devtools

- Show package.json plugin and eslint-plugin
- Show eslint config
- Add to next.config.js
- See devtools, remember to install [React DevTools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- Generate error with useEffect and console log ref.current, får dere error?
- Når man bruker dette vil man kunne få skrudd på Compiler og optimalisert alt uten å fikse masse ting

### App: Update CRUD with React 19 form actions and .bind

- Create: form and action-prop, mention onClick and hydration and web standards. Show works without js. No more loading feedback, fix later.
- Since we're using a metaframework with SSR, it's extra good to use as many native elements as possible, everything works without js, not button onclick router.push if we dont have to. Good for a11y as well. Progressive enhancement.
- This is an implicit action = async transition, automatisk "post"
- Mention again progressive enhancement
- Move it back into the layout, delete component
- Update: form and action-prop, hidden inputs or .bind to ensure prog.enh, remove "use client". No more feedback.
- Delete: form and action-prop, .bind. OnSubmit is prog enh fallback.
- Show fast 3g network prog enh search in ikognito waterfall, show modal shows up afterwards
- Favorite: form and action-prop with .bind or hidden input
- PAUSE?

### App: Add back interactivity with SubmitButton

- Analyze SubmitButton
- Use SubmitButton with loading boolean for delete button transition
- The other buttons are not client components
- Add useFormStatus isSubmitting
- Use it in new contact
- Power of rsc, composability of client/server while mainaining interactivity
- Add component to update contact
- Replace component to delete contact
- Show example from pages router [forms](https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations)
- Delete suspense boundaries and show it works without JS
- Avfallsdek: submitbutton slett mal.

### App: Use useActionState for form validation

- Whats missing? Validation. We allow empty data but maybe you don't want that. Show invalid image url.
- Don´t trust client input
- Add validation to the form in updateContact.ts, throw error, then with useActionState and Zod, use result.data
- Add ErrorBoundary, contactId/edit/error.tsx
- Per-field errors coming back
- Move await to page.tsx
- Use errors, then test, then set defaultValue
- By the way, we could use the isPending from useActionState for the loading state
- Mention ways to use useActionState, toast on error or success
- Mention React hook form and other libraries to come building ontop of this, react query because of hooks
- Delete suspense boundaries and show it works without JS

### App: Use useOptimistic on favorite button

- Show slow favorite button
- Add hook useOptimistic, explain and show different use cases
- Add onSubmit, mention you could use action directly, action is now a fallback
- Show it works without JS
- Show server delay
- UseOptimistic kan legges i provider for å bruke i flere komponenter, jeg har et eksempel på dette på github

### Show: Final application

- Excalidraw: final trees
- Performant, interactive, applications with good developer experience, even be prog.enh
- React 19 hooks ties it together, and there is alot more to come from these. They will be primitives for libraries simpliying things for developers, focus on building apps.
- After break: improving it with data fetching patterns, global state, typed params, testing, deployment

### LUNCH DAY 2

### Slides: CSS in Server Components & Deployment

### Intro: Introduce data fetching patterns

- Fetch in an efficient way
- Data fetching page
- Sequential, parallel, suspenses receiving data
- Suspense strategy: wait for all or stream independently
- use() hook: unblock a by making suspenses around client components because we cant await inside them
- Use hook can resolve any promise but this is not recommended inside client components because they are recreated on every render
- Avfallsdek: use() eksempel i statustabs

### App: Use the use() hook in contacts

- Instead of loading.tsx lets try to use the use() hook
- Dont await getContact, just pass as promise
- Use() hook in contactForm
- Move skeleton to contactForm skeleton component
- Explicit suspense
- Delete loading.tsx

### App: Use Fetch API and /api-routes

- Inside getContacts, use fetch instead of prisma. Could talk to any external API like BFF pattern.
- Explain fetch API and build-in dedupe, we dont have this with prisma by the way.
- Create new GET api endpoint /contacts/route.ts, we are writing our own api route here to display the use.
- Call the fetch API inside getContacts, no type safety anymore. Next tags.
- Create revalidationkeys and attach to getContacts
- Use revalidationKeys in updateContact instead of revalidatePath("/)
- Use fetch directly in client component with useEffect, but we need the API
- Docs [nextjs](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)
- PAUSE?

### App: Add caching and Next.js improvements

- Show metadata root page
- Add metadata to contactId page
- Add cache() to getContact since it´s a dynamic page with metadata, log the result and show it´s only once per render
- Add staleTimes 30 to cache routes
- Mention unstable cache and show example fixing the search: we are refetching the contact because this page is dynamic, lets cache this. Show unstable-cache and mention revalidation, show that we dont need to see any edit/loading.tsx. Update mutations.

### Intro: Implement global error state with Zustand and React Context

- You might want to use this to share state accross the component tree. Common for React apps. Error store, theme store.
- Create new page gobal-state
- Show the context and the provider
- Context works because it has children, doesn't convert to a client component, has more uses
- Use the provider and create Error.tsx component, implement with store and provider

### App: Add typed params with next-safe-navigation

- Show library on [npm](https://www.npmjs.com/package/next-safe-navigation)
- Next.js doesnt have type safety for params, show example with wrong param
- Show config file
- Add routes to a a few application pages href and router.push
- Add useSafeSearchParams to contactButton and Search
- Add parseParams to all pageProps
- Use in redirect and revalidatePath
- Mention server/client hook and functions
- Bruker i avfallsdek
- PAUSE?

### App: Unit and Component tests with Vitest

- Show vitest setup and package.json commands
- Run example test and other commands
- Test Favorite button
- Test DeleteContactButton
- Test ContactPage, show that it fails without suspense
- Create suspenseRender helper

### Show: End-to-end tests with Playwright

- Show playwright setup and package.json commands
- Show example test
- Mention to `npx playwright install`
- Run example test and other commands
- Talk about the benefits of e2e tests and why I´m not spending more time on it
- PAUSE?

### Show: React Hook Form

- Checkout new branch i completed repo
- Show implementation
- Client-side things are fine, whatever you need for you app. UseActionState has benefits like prog.enh and less js.
- Formik works as well
- Avfallsdek: vi bruker Formik fordi md-components ikke funker bra med react-hook. Formik funker kjempebra med RSC og og kan wrappe server components. Vise app i produsent arbeidsflate -> deklarasjon.

### Show: React Query

- Checkout new branch i completed repo
- Show implementation of React Query with hydration boundary
- Show all api routes and fetch calls
- If you have an external API its faster of course
- But if youre using prisma you need to define your own api routes because you shouldnt use server actions because are queued
- Use case: polling, if you prefer it. You can still use React query, do things the "old way". Not learning this today because we are focusing on React 19.

### Show: Other libraries

- [Conform](https://conform.guide/)
- [next-safe-action](https://next-safe-action.dev/)
- [Tanstack Form](https://tanstack.com/form/latest)

### Show: Search Param filtering

- [BuildUI](https://buildui.com/posts/instant-search-params-with-react-server-components)
- Avfallsdek: filter-komponent
- [Lee Robinson Vercel](https://github.com/vercel-labs/book-inventory)

### Slides: TASK 2

- Vise egen sneak peak, så vise schema som er klart til å bruke

### Show: TASK 2 Solution

- Vise egen: auto scroll og all datahenting er med await, blanding av server og client, fake bruker vise
- Component composition, data fetching
- Loading state with submitbutton
- Suspense boundary around messages
- Error boundary on the input
- Key takeways: the component is fully composable. It handles it's own data and mutations. It works without javascript, and will be prog enhanced. It reduces the amount of js on the client using specific client components with automatic scroller, message input and submitButton, utilizing the details pane.
- I could make this with plain react but I could also make it like this
- Vise optimistic senere: use hook
- [Details component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)

### Slides: Ressurser og avslutning
