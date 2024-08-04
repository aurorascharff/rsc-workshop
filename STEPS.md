# React Server Components and React 19 i Next.js App Router

## DAY 1

### Create a Next.js app

- Create a new Next.js app with `npx create-next-app@latest`
- Go through Next.js 14 boilerplate file structure and basics

### Introduce the repository

- Fork / copy files for starter project
- CRUD app for managing contacts
- Talk about eslint and prettier, show setup and rules
- Talk about Prisma and the database, show schema, README.md show commands and run together so verify everything is working
- Introduce the structure and the components
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

## Intro: What are client components?

- Normal react components are marked with "use client"
- They are rendered on the server and then hydrated on the client like with normal SSR
- Kommentere kode
- onClick alert, onclick state change
- Console log client
- Page.js has js in the browser
- Excalidraw: show tree server and client and discuss hydration
- Basically, try to put client code in the leaves to optimize performance
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

### Code all data fetching

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

### Code client component logic

- Search component: mention web standard way to search and progressive enhancement already working.
- Kode contact list: extract to property and move await
- Kode contact button: dont need to mark as use client
- Kode search component: default full page reload, could be a plain filter but we want to use the url, defaultvalue. Concurrent features. Prog-enh works.
- Cache contact: We are refetching the contact because this page is dynamic, lets cache this. Show unstable-cache and mention revalidation.
- Excalidraw tree

### BREAK 1

### Intro: What are transitions?

- Create a slow page and LinkButton to it, how the loading app
- Transitions mark a state update as non urgent and allow the app to handle other actions while it´s happening
- Create TransitionButton, display the loading state
- Create a "Home" button and show the app is still responsive, app handles urgent update
- Explain next.js navigations are already transitions
- All state updates are executes once they are all done, show example with setCount

### Add transition to ContactButton sidebar

- Awaiting the server on the page we´re navigating to. Need to show this somehow or the app will not feel good.
- Talk about dynamic content. Since this is dynamic, we are running the await on the server. With static content., it has already run in the build and we don´t have to worry about loading states.
- Add transition to ContactButton as new button ContactButtonTransition

### Intro: What is suspense?

### Add suspense to ContactPage

### Intro: Introduce Server Actions

- Server actions are a new feature in React 19, that allows you to create server code that can be called from the client
- We cant pass functions over the network, serializable
- Pages router: you created API endpoints and used for example trpc
- Type safety and creates a hidden api-endpoint
- Excalidraw: "use server" mutateData.ts, back to the server
- Kommentere kode
- Show in code mutdateData getcontact[0].id, use in ClientComponent alert, show error then no error
- Not recommended for data fetching unless specific use cases such as infinite scroll

### Write and use all server actions, make CRUD work

- Create: onClick, revalidate etter visning
- Update: onClick, add all props prisma
- Delete: onClick modal

### Slides: TASK 1

### TASK 1 Solution

- Show the favourite code and example edit loading.tsx
- Go through the files and solutions
- Decide what level of polish you want
- We will improve the favourite tomorrow med React 19

## DAY 2

### Add the React Compiler

- Add the React Compiler to the project
- Install the React Compiler plugin for Next.js
- Install the eslint plugin for the React Compiler
- Enable it in next.config.js
- Look at devtools
- Make slow component and show result

### Update CRUD with React 19 form actions and .bind

- Create: form and action-prop, mention onClick and hydration and web standards
- This is an implicit action = async transition
- Mention again progressive enhancement
- Update: form and action-prop, hidden inputs or .bind to ensure prog.enh
- Delete: form and action-prop, .bind, then modal. Prog enh fallback.
- Show fast 3g network prog enh search in ikognito waterfall, show modal shows up afterwards
- Favorite: form and action-prop with .bind or hidden input

### Add interactivity with transitions and SubmitButton

- Make all functions slow
- Use loading boolean for delete button transition
- The other buttons are not client components
- Add useFormStatus isSubmitting
- Use it in new contact
- Power of rsc, composability of client/server while mainaining interactivity
- Add component to update contact
- Delete suspense boundaries and show it works without JS

### Use useActionState for form validation

- Whats missing? Validation. We allow empty data but maybe you don't want that. Show invalid image url.
- Don´t trust client input
- Add validation to the form in updateContact.ts, throw error, then with useActionState and Zod, use result.data
- Per-field errors coming back
- Move await to page.tsx
- Use errors, then test, then set defaultValue
- By the way, we could use the isPending from useActionState for the loading state
- Mention ways to use useActionState, toast on error
- Mention React hook form and other libraries to come building ontop of this, react query because of hooks
- Delete suspense boundaries and show it works without JS

### Use useOptimistic on favorite button

- Show slow favorite button
- Add hook useOptimistic, explain and show different use cases
- Add onSubmit, mention you could use action directly, action is now a fallback
- Show it works without JS

### BREAK 2

### Into: Introduce data fetching patterns

### Use Fetch API and /api-routes

### Add caching and Next.js improvements

### Intro: Introduce the use() hook

### Use the use() hook in contacts

### Intro: Introduce React Query

### TODO

### Unit and Component tests with Vitest

- Show vitest setup and package.json commands
- Run example test and other commands
- Test Favorite button
- Test DeleteContactButton
- Test ContactPage, show that it fails without suspense

### End-to-end tests with Playwright

- Show playwright setup and package.json commands
- Show example test
- Run example test and other commands
- Talk about the benefits of e2e tests and why I´m not spending more time on it

### Slides: TASK 2

### TASK 2 Solution

- Go through the files and solutions

### Final note

- Excalidraw: final trees
- Performant, interactive, applications with good developer experience, even be prog.enh
- Spas are still okay for certain uses cases! But now we solve certain problems.
- There´s a lot I didn't cover today
- React 19 hooks ties it together, and there is alot more to come from these. They will be primitives for libraries simpliying things for developers, focus on building apps.
