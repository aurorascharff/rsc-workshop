import React from 'react';

type Props = {
  error?: string;
  name: string;
};

export default function Input({ error, ...otherProps }: Props & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full">
      <input className={error ? 'outline outline-2 outline-destroy' : ''} aria-describedby="error" {...otherProps} />
      {error && <span className="text-destroy">{error}</span>}
    </div>
  );
}
