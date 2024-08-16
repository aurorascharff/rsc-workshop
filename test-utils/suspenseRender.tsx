import { render } from '@testing-library/react';
import { Suspense } from 'react';

export function suspenseRender(children: JSX.Element) {
  return render(<Suspense>{children}</Suspense>);
}
