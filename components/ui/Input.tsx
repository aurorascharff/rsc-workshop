import React from 'react';

type Props = {
  error?: string[] | undefined;
  name: string;
};

export default function Input({ error, ...otherProps }: Props & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <input aria-describedby="error" {...otherProps} />
      {error && <span className="text-destroy">{error}</span>}
    </div>
  );
}
