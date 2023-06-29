import { useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { COLORS } from '@/constants/colors';

interface DropdownProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  dropdownOptions: string[];
  labelSize: string;
}

export default function Dropdown({
  selectedOption,
  setSelectedOption,
  dropdownOptions,
  labelSize,
}: DropdownProps) {
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
        <p className={`text-blue1 ${labelSize}`}>{selectedOption}</p>
        <ChevronDown size={20} color={COLORS.blue1} />
      </div>
      <div
        className={`transition-300 no-scrollbar absolute right-0 top-[calc(100%+12px)] grid max-h-40 w-44 gap-1 overflow-y-scroll rounded-sm border border-grey2 bg-black p-1 ${
          dropdownOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        {dropdownOptions.map((option) => (
          <div
            key={option}
            className={`transition-300 flex cursor-pointer items-center gap-2 rounded-xs p-2 ${
              selectedOption === option
                ? 'bg-grey3'
                : 'hover:bg-grey3 hover:bg-opacity-60'
            }`}
            onClick={() => {
              setSelectedOption(option);
              setDropdownOpen(false);
            }}
          >
            <p className='text-blue1'>{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
