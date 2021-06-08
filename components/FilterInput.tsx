import { ChangeEvent } from 'react';

type Props = {
  type?: 'text';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  className?: string;
};

export default function FilterInput({ type = 'text', value = '', placeholder = '', onChange, className = '' }: Props) {
  return (
    <>
      <div className={className}>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      </div>
      <style jsx>{`
        input {
          width: 100%;
          padding: 6px 12px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
