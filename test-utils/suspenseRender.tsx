import { render } from '@testing-library/react';
import { Suspense } from 'react';

export function suspenseRender(children: React.ReactNode) {
  return render(<Suspense>{children}</Suspense>);
}
