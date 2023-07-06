import { Search } from 'react-feather';

import { COLORS } from '@/constants/colors';

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
  margin?: string;
}

export default function SearchBar({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  margin,
}: SearchBarProps) {
  return (
    <div className={`relative ${margin}`}>
      <Search
        size={20}
        color={COLORS.grey1}
        className='absolute left-4 top-1/2 -translate-y-1/2'
      />
      <input
        type='text'
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className='transition-300 w-full rounded-full border border-grey2 bg-black py-3.5 pl-12 pr-5 text-white outline-none placeholder:text-grey1 focus:border-grey1'
      />
    </div>
  );
}
