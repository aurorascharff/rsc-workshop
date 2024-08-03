import ClientComponent from '@/components/intro/ClientComponent';
import ServerComponent from '@/components/intro/ServerComponent';

export default function RootPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>React Server Components and React 19 i Next.js App Router</h1>
      <ClientComponent content={<ServerComponent />}>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
