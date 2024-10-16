# React Server Components, Server act

## Slides: Introduksjon til Rendering on the Web

## Show: Setup the repository

- Github: Fork / copy files for starter project, code-workspace and install extensions
- README.md show commands and run together npm install, npm run dev, verify running
- Talk about eslint and prettier, show setup and rules, check code-workspace, verify its working
- Talk about Prisma and the database, show schema
- README.md prisma seed together

## Show: Go through the repository

- CRUD app for managing contacts: quick demo
- We have no JS here in this app. Turn off js. Show SSR in console.
- Introduce the structure and the components: remember dynamic route
- Nested layouts: state in the url, users will awlays see the same thing. Benefits?
- We are using tailwind, easy to make the app mobile friendly, show the tailwind.config.js and breakpoints, show mobile logo dissapearing. Hvem har brukt tailwind før?
- Introduce the cva() library
- Vi skal bli bedre kjent med dette over workshoppen, poenget er at vi skal lage noe som fungerer uten å bruke for mye tid på css og html

## Intro: What are server components?

- Excalidraw: Server components are a new feature in React 19, that allows you to run React components on the server. Differ from SSR because they never re-render, only run once on the server to generate UI. Js never shipped to client, never hydrated.
- Excalidraw: "the server" fullstack framework, rendered in build or request time
- Excalidraw: never hydrated, partially hydrated, exclude js from the client
- Next.js is a React metaframework that includes server components, server component by default.
- Console.log page.tsx
- Make (intro)/client-server/page.tsx
- What are these synaxes? Route group, could be used for authenticated routes for example.
- Link to client-server in page.tsx
- Make ServerComponent inside client-server/_components and give it styles, add to page.tsx
- ServerComponent console log
- No js in the browser for page.tsx
- Anything you do here won't add to the bundle size
- Async and fetch data prisma, data[0]
- Mention that you can use fetch api
- Limitations onclick button, we need client for interactivity or browser stuff or js on the client

## Intro: What are client components?

- Make ClientComponent inside client-server/_components and give it styles, add to page.tsx
- Normal react components are marked with "use client", "a react 19 directive"
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

## Intro: Benefits and drawbacks

- Excalidraw: benefits and drawbacks
- Benefits: data fetching, access to backend, caching, bundle size, streaming, DX
- Drawbacks: needs framework like nextjs, complexity, learning curve
- How do they work (ikogito console): SSR html, js-bundles for hydration, and rsc payload is the server component in seralizable form, generated in build or on server for dynamic data. Payload is used to create the client tree, and can be refreshed without destroying client state. If they pass props to client that have updated, client updates. Ikke workshoppens focus.

## App: Code all data fetching

- Fetch data in contactList: first inside the component, then getContacts inside data/services med sortering
- Nevne setup her, kan ha 1 fil for hver “feature” osv, smak og behag
- Nevne server-only
- Fetch data in contact page: getContact inside data/services, then page.tsx. Mention next-safe-navigation and show schema. Could be just href. Next.js does not have type safe routes like i.e tanstack router. Make the props unknown.
- Throw fra contactId and a contactId/not-found.tsx.
- Add not-found.tsx global
- Fetch data in ContactForm
- Discuss composability and compare with React Query
- Excalidraw tree so far
- Alt er på server, ikke noe JS på client ennå

## App: Code client component logic

- Search component: Does anybody know whats happening here? Comment out piece by piece, Discuss web standard way to search already working. Show that it works and works without js. Preventdefault. [source](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- Kode search component: default full page reload, could be a plain filter but we want to use the url, defaultvalue. Vi skal fikse det litt senere.
- Kode contact list: extract to property and move await, filter, could do this on the server
- Kode contact button: dont need to mark as use client. Why? Reload hvis det feiler. Legg til likevel. Husk å fikse href med q.
- Excalidraw tree, minimalt med JS på client. Etterhvert som vi skalerer blir dette viktigere.

## App: Add transition and ContactButton sidebar

- Make getContact slow
- Have you ever used a transition?
- Transitions mark a state update as non urgent and allow the app to handle other actions while it´s happening. Concurrent feature in React 18.
- Explain next.js navigations are transitions, can always be cancelled
- All state updates are executes once they are all done
- Transitions can be added to navigations explicitly to track the state of it. The destination has an "await" which the app is transitioning to.
- Awaiting a contact db call. Need to show this somehow or the app will not feel good. Awaiting the server on the page we´re navigating to.
- Make it slow to see the freeze
- Since this is dynamic, we are running the await on the server. With static content, it has already run in the build and we don´t have to worry about loading states.
- Add transition to ContactButton, isPending, preventdefault link behavior and run our own

## App: Add transition to Search

- Nå har søket vårt blitt tregt, destination has again a slow await
- Full page reload, no client side nav. View request in server log.
- Add transition for spinner to the search. Batching, we dont need to debounce fordi transitions gjør alt etter alt er ferdig. Kun ett søk i historikken.

## App: Add suspense to ContactPage

- What is your experience with suspense?
- Suspense allows you to handle loading states in a declarative way. Concurrent feature in React 18. [Source](https://react.dev/reference/react/Suspense)
- Used for lazy loading, code splitting, data fetching. Typically lazy loading in a React SPA.
- Have to think about avoiding cumulative layout shift.
- We can use this to handle the frozen app in a different way
- Comment out transition in ContactButton
- Add suspense loading.tsx to ContactPage (skeleton ligger i contact layout.tsx)
- Create skeleton by copy-pasting the top (image) of the component cleaning it up
- We can add another one inside /edit if we want
- You need to decide where to wait: in the source or in the destination.
- Explain when to pick what: Is there something to show before navigating? Use transitions. Is there something to show after navigating? Use suspense.
- Turn on staletimes 30 to avoid dynamic fetching every time

## Slides: Introduksjon til React 19

## Intro: Introduce Server Functions

- Som dere sikkert merket er det mange av knappene som ikke funker, vi er kommet til datamutasjoner
- Hva vil man gjør en mutering? Sende noe fra client til server.
- Excalidraw: Server Functions are a new feature in React 19, that allows you to create server code that can be called from the client
- We cant pass functions over the network, serializable
- Har noen brukt pages router?
- Pages router: you created API endpoints and used for example trpc
- Type safety and creates a hidden api-endpoint
- Excalidraw: "use server", a react 19 directive, mutateData.ts, back to the server
- Show in code mutdateData getcontact[0].id, use in ClientComponent alert, show error then no error
- Show type safety RPC
- Not recommended for data fetching unless specific use cases such as infinite scroll

## App: Finish CRUD with React 19 form actions and .bind

- La oss fullføre CRUD her
- Data access layer actions, prefer extracting the actions
- You could also make a contact.ts service/action file when you get alot, for this is easier to work with now in the workshop
- Create: createEmptyContact.ts. How can we use this in the layout?
- Form and action-prop layout.tsx, mention onClick and hydration and web standards. Don't need to extract to "use client". Would have needed a new component. Uten revalidate, så med revalidate.
- Noen som er kjent med form actions? Hva skjer, hvordan brukes de? Method post og action med route. Nå kan de bindes til funksjoner.
- Hvis direkte Server Function: show works without js.
- This is an implicit action = async transition, automatisk "post"
- Since we're using a metaframework with SSR, it's extra good to use as many native elements as possible, everything works without js, not button onclick router.push if we dont have to. Good for a11y as well.
- Update: ContactForm form and action-prop, could use function but we can also use hidden inputs or .bind to ensure prog.en and dont need client-comp, updateContactSimple.
- Forklare formdata
- Delete: deleteContact.ts, then form and action-prop, .bind, then DeleteContactButton for modal,. OnSubmit is fallback wiouth js. Could also use hidden input.
- Dette er altså et progressive enhancement.
- Show fast 3g network prog enh search in ikognito waterfall, show modal shows up afterwards.

## App: Add interactivity with SubmitButton

- Make all mutations slow. Lets make this realistic.
- Analyze SubmitButton. Har dere brukt denne synaksen før? Hva gjør den? Rest operator, spread på button. Videreført buttonprops.
- Use SubmitButton with loading boolean for delete button transition
- Hva skal vi gjøre i submitButton? Kan jeg bruke en react 19 hook?
- Add useFormStatus isSubmitting. Bruker parent form som kontekst.
- Delete loading and disabled boolean from deletebutton
- Use SubmitButton in new contact
- Hva er fordelene med dette?
- Power of rsc, composability of client/server while mainaining interactivity.
- Add component to update contact
- Show example from pages router [forms](https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations)
- Alt funker før JS, litt vanskelig å se med suspense. Veldig fint når vi har bittelitt js.

## App: Use useActionState for form validation

- Whats missing? Validation. We allow empty data but maybe you don't want that. Show invalid image url. We're doomed.
- Vi er fullstackutviklere, don't trust client input, vi har ansvaret for dette nå istedenfor å yolo sende til backenden vår.
- Add validation to the form in updateContact.ts, throw error
- Add ErrorBoundary, contactId/edit/error.tsx
- Return in updateContact, then useActionState, "use client" and Zod
- Move data fetching one level up
- Per-field errors coming back, result.data
- Use errors, then test and show losing data, then set return data and set defaultValue, mister ikke data jeg skrev inn
- Used to react hook form and formik?
- By the way, we could use the isPending from useActionState for the loading state
- Mention ways to use useActionState, toast on error or success
- Mention React hook form and other libraries to come building ontop of this, react query because of hooks

## Show: Final application

- Excalidraw: final trees
- Performant, interactive, applications with good developer experience, even be prog.enh
- React 19 hooks ties it together, and there is alot more to come from these. They will be primitives for libraries simpliying things for developers, focus on building apps.
- Theres alot more we could do here with the App Router but our topic is quite specific today.
- Wide range problems to wide range solutions, need SSR, increase seo and performance, dont need in enterprise, extra code for extra benefits, case-to-case, study your users [source](https://x.com/requestmethod/status/1775948860415734128)

## TASK: Implement favorite, make it prog enh and optimistic

## TASK (bonus): Message box

## Slides: Ressurser og avslutning
