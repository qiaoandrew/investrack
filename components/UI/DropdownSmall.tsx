import { useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';

import { COLORS } from '@/constants/colors';

type DropdownSmallProps = {
  selectedOption: { label: string; value: any };
  setSelectedOption: (value: { label: string; value: any }) => void;
  dropdownOptions: { label: string; value: any }[];
  labelSize: string;
};

export default function DropdownSmall({
  selectedOption,
  setSelectedOption,
  dropdownOptions,
  labelSize,
}: DropdownSmallProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownOpen && !event.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className='dropdown relative z-10'>
      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className='flex cursor-pointer items-center gap-2'
      >
        <p className={`text-blue1 ${labelSize}`}>{selectedOption.label}</p>
        <ChevronDown
          size={20}
          color={COLORS.blue1}
          className={`transition-300 ${dropdownOpen ? 'rotate-180' : ''}`}
        />
      </div>
      <div
        className={`transition-300 absolute right-0 top-[calc(100%+12px)] flex max-h-40 w-44 overflow-hidden rounded-sm border border-grey2 bg-black ${
          dropdownOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className='no-scrollbar grid flex-grow gap-1 overflow-y-scroll p-1'>
          {dropdownOptions.map((option) => (
            <div
              className={`transition-300 flex cursor-pointer items-center gap-2 rounded-xs p-2 ${
                selectedOption === option
                  ? 'bg-grey3'
                  : 'hover:bg-grey3 hover:bg-opacity-60'
              }`}
              onClick={() => {
                setSelectedOption(option);
                setDropdownOpen(false);
              }}
              key={option.value}
            >
              <p className='text-blue1'>{option.label}</p>
            </div>
          ))}
        </div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black to-transparent' />
      </div>
    </div>
  );
}
