import React from 'react';

type Props = {
  error?: string;
  name: string;
};

export default function TextArea({ error, ...otherProps }: Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <textarea className={error ? 'outline outline-2 outline-destroy' : ''} aria-describedby="error" {...otherProps} />
      {error && <span className="font- text-destroy">{error}</span>}
    </div>
  );
}
