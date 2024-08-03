import Link from 'next/link';

export default function RootPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>React Server Components and React 19 i Next.js App Router</h1>
      <Link href="/intro">Intro</Link>
    </div>
  );
}
