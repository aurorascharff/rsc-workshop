import ClientComponent from '@/components/intro/ClientComponent';
import ServerComponent from '@/components/intro/ServerComponent';

export default function RootPage() {
  return (
    <div className="flex flex-col gap-4">
      React Server Components and React 19 i Next.js App Router
      <ClientComponent content={<ServerComponent />}>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
