import { useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';

import { COLORS } from '@/constants/colors';

type DropdownLargeProps = {
  selectedOption?: {
    label: string;
    value: any;
  } | null;
  setSelectedOption: (option: { label: string; value: any }) => void;
  options: {
    label: string;
    value: any;
  }[];
  placeholder: string;
  noOptionsMessage: string;
  classes?: string;
};

export default function DropdownLarge({
  selectedOption,
  setSelectedOption,
  options,
  placeholder,
  noOptionsMessage,
  classes,
}: DropdownLargeProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (showDropdown && !e.target.closest('.select')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <div className={`select relative z-10 ${classes}`}>
      <div
        onClick={() => setShowDropdown((prev) => !prev)}
        className={`transition-300 flex cursor-pointer justify-between rounded-sm border py-4 pl-5 pr-4 ${
          showDropdown ? 'border-grey1' : 'border-grey2'
        }`}
      >
        <p
          className={`flex-grow ${
            selectedOption ? 'text-white' : 'text-grey1'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </p>
        <ChevronDown
          size={24}
          color={COLORS.grey1}
          className={`transition-300 flex-shrink-0 ${
            showDropdown ? 'rotate-180' : ''
          }`}
        />
      </div>
      <div
        className={`transition-300 absolute inset-x-0 top-[calc(100%+20px)] overflow-hidden rounded-sm border border-grey1 bg-black ${
          showDropdown
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        {options.length > 0 ? (
          <>
            <div className='no-scrollbar grid max-h-56 gap-1 overflow-y-scroll bg-grey3 p-1'>
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setSelectedOption(option);
                    setShowDropdown(false);
                  }}
                  className={`transition-300 flex cursor-pointer items-center gap-2 rounded-xs px-3 py-4 ${
                    selectedOption?.value === option.value
                      ? 'bg-grey2 bg-opacity-50'
                      : 'hover:bg-grey2 hover:bg-opacity-30'
                  }`}
                >
                  <p
                    className={`${
                      selectedOption?.value === option.value
                        ? 'text-white'
                        : 'text-grey1'
                    }`}
                  >
                    {option.label}
                  </p>
                </div>
              ))}
            </div>
            {options.length > 3 && (
              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-grey3 to-transparent' />
            )}
          </>
        ) : (
          <p className='px-5 py-4 text-white'>{noOptionsMessage}</p>
        )}
      </div>
    </div>
  );
}
