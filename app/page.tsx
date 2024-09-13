import LinkButton from '@/components/ui/LinkButton';

export default function RootPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>React Server Components and React 19 in the Next.js App Router</h1>
      <div className="flex w-fit flex-col gap-4">
        <LinkButton theme="secondary" href="/client-server">
          Client and Server Components
        </LinkButton>
        <LinkButton theme="secondary" href="/transitions">
          Transitions
        </LinkButton>
        <LinkButton theme="secondary" href="/suspense">
          Suspense
        </LinkButton>
        <LinkButton theme="secondary" href="/data-fetching">
          Data Fetching
        </LinkButton>
        <LinkButton theme="secondary" href="/global-state">
          Global State
        </LinkButton>
      </div>
    </div>
  );
}
