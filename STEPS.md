# React Server Components and React 19 in the Next.js App Router

## DAY 1

## Slides: Introduksjon til Rendering on the Web and Next.js App Router

### Intro: Create a Next.js app

- Create a new Next.js app with `npx create-next-app@latest`
- Go through Next.js 14 boilerplate file structure and basics

### Show: Go through the repository

- Fork / copy files for starter project
- CRUD app for managing contacts
- Talk about eslint and prettier, show setup and rules
- Talk about Prisma and the database, show schema, README.md show commands and run together so verify everything is working
- Introduce the structure and the components
- Nested layouts: state in the url, users will awlays see the same thing
- Introduce the cva() library, show on npm

### Intro: What are server components?

- Server components are a new feature in React 19, that allows you to run React components on the server. Differ from SSR because they never re-render, only run once on the server to generate UI. Js never shipped to client, never hydrated.
- Excalidraw: "the server" fullstack framework, rendered in build or request time
- Excalidraw: never hydrated, partially hydrated, exclude js from the client
- Kommentere kode
- Next.js is a React metaframework that includes server components, server component by default.
- Make servercomponents inside /components/intro and give it styles
- ServerComponent console log
- No js in the browser for page.js
- Async and fetch data prisma or fetch api, data[0]
- Anything you do here won't add to the bundle size
- Limitations onclick button, we need client for interactivity or browser stuff
- How do they work (ikogito console): SSR html, js-bundles for hydration, and rsc payload is the server component in seralizable form, generated in build or on server for dynamic data. Payload is used to create the client tree, and can be refreshed without destroying client state. If they pass props to client that have updated, client updates. Ikke workshoppens focus.

## Intro: What are client components?

- Normal react components are marked with "use client"
- They are rendered on the server and then hydrated on the client like with normal SSR
- Kommentere kode
- onClick alert, onclick state change
- Console log client
- Page.js has js in the browser
- Excalidraw: show tree server and client and discuss hydration
- Basically, try to put client code in the leaves to optimize performance, but dont worry too much about it
- Next.js [docs](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) client/server components

## Intro: Client/server composition

- Now we need to compose them
- Client in server: all good
- Server in client: server becomes client, fails and console.log
- Excalidraw: donut pattern and fetch data again, use cases collapsible sidebar or autoscrolling-chat

### Intro: Benefits and drawbacks

- Excalidraw: benefits and drawbacks
- Benefits: data fetching, access to backend, caching, bundle size, streaming, DX
- Drawbacks: needs framework like nextjs, complexity, learning curve

### App: code all data fetching

- Fetch data in contactList: getContacts inside lib/services
- Nevne setup her, kan ha 1 fil for hver “feature” osv, smak og behag
- Nevne server-only
- Fetch data in contact page: getContact inside lib/services
- Fetch data in edit contact page
- Discuss composability and compare with React Query
- Show excalidraw, cache functions
- Add slow functions
- Show suspense and streaming, nextjs caching happening
- Excalidraw tree so far

### App: code client component logic

- Search component: mention web standard way to search and progressive enhancement already working.
- Kode contact list: extract to property and move await
- Kode contact button: dont need to mark as use client
- Kode search component: default full page reload, could be a plain filter but we want to use the url, defaultvalue. Concurrent features. Prog-enh works.
- Excalidraw tree

### BREAK 1

## Intro: Statiske og dynamiske sider

- Statiske sider: bygget en gang, serveret til alle, ingen data fetching. Eksempel: Elkjøp. Inmeta.no. Nevne ISR og generateStaticParams.
- Dynamiske sider: data fetching, serveret til brukeren, data kan endres. Eksempel: Avfallsdeklarering. Vis avfallsdek maler. Skal bruke denne til eksempel idag.
- Vise build output: statisk og dynamisk. Default database og route: dynamisk. Cookies() vil også gjøre det dynamisk. Resten statisk.
- Nevne [PPR](https://www.partialprerendering.com/)
- Loading states are hard

### Intro: What are transitions?

- Transitions mark a state update as non urgent and allow the app to handle other actions while it´s happening. Concurrent feature in React 18.
- Create a slow page and Tabs component
- Show unresponsive app
- Add transition: responsive app
- UseTransition: pending state
- All state updates are executes once they are all done, show example with setCount
- Explain next.js navigations are transitions, can always be cancelled

### App: Add transition to ContactButton sidebar

- Awaiting a contact db call. Need to show this somehow or the app will not feel good. Awaiting the server on the page we´re navigating to.
- Since this is dynamic, we are running the await on the server. With static content, it has already run in the build and we don´t have to worry about loading states.
- Add transition to ContactButton as new button ContactButtonTransition

### Intro: What is suspense?

- Suspense allows you to handle loading states in a declarative way. Concurrent feature in React 18.
- Used for lazy loading, code splitting, data fetching. Typically lazy loading in a React SPA.
- Also used for progressive hydration, meaning priorotizing what to hydrate first.
- In our case: mark content as non-urgent, show fallback, refer back whenever app is not busy.
- The content is streaming in to the client, show in network tab.
- You need to decide where to wait: in the source or in the destination.
- Avfallsdek: suspenses maler.
- Explain when to pick what: Is there something to show in the destination? Use suspense. Is there something to show in the source? Use transitions.

### App: Add suspense to ContactPage

- Undo usage of ContactButtonTransition
- Await slow i getContact
- Add suspense loading.tsx to ContactPage
- Create skeleton by copy-pasting the component and filling in the content

### Intro: Introduce Server Actions

- Server actions are a new feature in React 19, that allows you to create server code that can be called from the client
- We cant pass functions over the network, serializable
- Pages router: you created API endpoints and used for example trpc
- Type safety and creates a hidden api-endpoint
- Excalidraw: "use server" mutateData.ts, back to the server
- Kommentere kode
- Show in code mutdateData getcontact[0].id, use in ClientComponent alert, show error then no error
- Not recommended for data fetching unless specific use cases such as infinite scroll

### App: Write and use all server actions, make CRUD work

- Create: CreateContactButton "use client" onClick, revalidate etter visning
- Update: ContactForm "use client" onSubmit, updateContactSimple
- Delete: DeleteContactButton "use client" onClick modal
- Alt dette skal vi jobbe mer med imorgen

### Slides: TASK 1

### Show: TASK 1 Solution

- Show edit loading.tsx
- Show the favourite code and example
- We will improve the favourite tomorrow med React 19

### Slides: CSS in Server Components

## DAY 2

## Slides: Dag 1 plan, hva lærte dere?

## Slides: Introduksjon til React 19 og React Compiler

### App: Update CRUD with React 19 form actions and .bind

- Create: form and action-prop, mention onClick and hydration and web standards, move it back into the layout
- This is an implicit action = async transition
- Mention again progressive enhancement
- Update: form and action-prop, hidden inputs or .bind to ensure prog.enh, remove "use client"
- Delete: form and action-prop, .bind, then modal. Prog enh fallback.
- Show fast 3g network prog enh search in ikognito waterfall, show modal shows up afterwards
- Favorite: form and action-prop with .bind or hidden input

### App: Add interactivity with transitions and SubmitButton

- Make all functions slow
- Use loading boolean for delete button transition
- The other buttons are not client components
- Add useFormStatus isSubmitting
- Use it in new contact
- Power of rsc, composability of client/server while mainaining interactivity
- Add component to update contact
- Add component to delete contact
- Show example from pages router [forms](https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations)
- Delete suspense boundaries and show it works without JS
- Avfallsdek: submitbutton

### App: Use useActionState for form validation

- Whats missing? Validation. We allow empty data but maybe you don't want that. Show invalid image url.
- Don´t trust client input
- Add validation to the form in updateContact.ts, throw error, then with useActionState and Zod, use result.data
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

### BREAK 2

### Intro: Introduce data fetching patterns

- Fetch in an efficient way
- Data fetching page
- Sequential, parallel, suspenses receiving data
- Suspense strategy: wait for all or stream independently
- use() hook: unblock a by making suspenses around client components because we cant await inside them
- Use hook can resolve any promise but this is not recommended inside client components because they are recreated on every render
- Avfallsdek: use() eksempel i maler

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

### App: Add caching and Next.js improvements

- Show metadata root page
- Add metadata to contactId page
- Add cache() to getContact since it´s a dynamic page with metadata, log the result and show it´s only once per render
- Add staleTimes 30 to cache routes
- Mention unstable cache and show example fixing the search: we are refetching the contact because this page is dynamic, lets cache this. Show unstable-cache and mention revalidation, show that we dont need to see any edit/loading.tsx. Update mutations.
- Add not-found global, contactId/not-found.tsx og throw fra contactId, contactId/edit/page.ts ErrorBoundary, contactId/edit/error.tsx

### Intro: Implement global error state with Zustand and React Context

- You might want to use this to share state accross the component tree. Common for React apps. Error store, theme store.
- Create new page gobal-state
- Show the context and the provider
- Context works because it has children, doesn't convert to a client component, has more uses
- Use the provider and create Error.tsx component, implement with store and provider

### App: Add typed params with next-safe-navigation

- Show library on npm
- Next.js doesnt have type safety for params, show example with wrong param
- Show config file
- Add routes to a a few application pages href and router.push
- Add useSafeSearchParams to contactButton and Search
- Add parseParams to all pageProps
- Use in redirect and revalidatePath
- Mention server/client hook and functions
- Bruker i avfallsdek

### Show: React Query

- Checkout new branch i completed repo
- Show implementation of React Query with hydration boundary
- Show all api routes and fetch calls
- If you have an external API its faster of course
- But if youre using prisma you need to define your own api routes because you shouldnt use server actions because are queued
- Use case: polling, if you prefer it

### Show: React Hook Form

- Checkout new branch i completed repo
- Show implementation
- Client-side things are fine, whatever you need for you app. UseActionState has benefits like prog.enh and less js.
- Formik works as well
- Avfallsdek: vi bruker Formik fordi md-components ikke funker bra med react-hook. Formik funker kjempebra med RSC og og kan wrappe server components. Vise app i maler.

### Show: Other libraries

- [Conform](https://conform.guide/)
- [next-safe-action](https://next-safe-action.dev/)
- [Tanstack Form](https://tanstack.com/form/latest)

### Show: Search Param filtering

- [BuildUI](https://buildui.com/posts/instant-search-params-with-react-server-components)
- Avfallsdek: filter-komponent
- [Lee Robinson Vercel](https://next-books-search.vercel.app/)

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

### Slides: TASK 2

### Show: TASK 2 Solution

- Go through the files and solutions

### Slides: Deployment
