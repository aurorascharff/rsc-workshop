import React from 'react';

type Props = {
  error?: string[] | undefined;
  name: string;
};

export default function TextArea({ error, ...otherProps }: Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <textarea aria-describedby="error" {...otherProps} />
      {error && <span className="text-destroy">{error}</span>}
    </div>
  );
}
