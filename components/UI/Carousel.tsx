import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

import DropdownSmall from './DropdownSmall';
import LoadingSpinner from './LoadingSpinner';

import { COLORS } from '@/constants/colors';

type CarouselProps = {
  title: string;
  loading?: boolean;
  error?: boolean;
  selectedOption?: {
    label: string;
    value: any;
  };
  setSelectedOption?: (value: { label: string; value: any }) => void;
  dropdownOptions?: {
    label: string;
    value: any;
  }[];
  dropdownLabelSize?: string;
  classes?: string;
  children: React.ReactNode[];
};

export default function Carousel({
  title,
  loading,
  error,
  selectedOption,
  setSelectedOption,
  dropdownOptions,
  dropdownLabelSize,
  classes,
  children,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollOffset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <section className={classes}>
      <div className='mx-dashboard mb-4 flex items-center justify-between 2xl:mb-5'>
        <div className='flex flex-grow items-center justify-between md:flex-grow-0 md:justify-start md:gap-20'>
          <h2 className='text-2xl font-semibold text-white 2xl:text-3xl'>
            {title}
          </h2>
          {selectedOption &&
            setSelectedOption &&
            dropdownOptions &&
            dropdownLabelSize && (
              <DropdownSmall
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                dropdownOptions={dropdownOptions}
                labelSize={dropdownLabelSize}
              />
            )}
        </div>
        <div className='hidden gap-3 md:flex'>
          <div
            onClick={() => handleScroll(-300)}
            className='transition-300 cursor-pointer rounded-sm bg-grey3 p-1.5 opacity-70 hover:opacity-100 md:p-2'
          >
            <ChevronLeft color={COLORS.grey1} size={24} className='-ml-0.5' />
          </div>
          <div
            onClick={() => handleScroll(300)}
            className='transition-300 cursor-pointer rounded-sm bg-grey3 p-1.5 opacity-70 hover:opacity-100 md:p-2'
          >
            <ChevronRight color={COLORS.grey1} size={24} className='-mr-0.5' />
          </div>
        </div>
      </div>
      {loading && !error && <LoadingSpinner />}
      {!loading && error && (
        <p className='px-dashboard text-blue1'>
          An error occurred while fetching data. Please try again later.
        </p>
      )}
      {!loading &&
        !error &&
        (children.length > 0 ? (
          <div className='relative'>
            <div
              ref={carouselRef}
              className='px-dashboard no-scrollbar relative flex gap-6 overflow-x-scroll scroll-smooth whitespace-nowrap pr-[10%]'
            >
              {children.map((child, i) => (
                <div className='inline-flex self-stretch' key={`child-${i}`}>
                  {child}
                </div>
              ))}
            </div>
            <div className='pointer-events-none absolute inset-y-0 right-0 z-20 w-1/5 bg-gradient-to-l from-black to-transparent' />
          </div>
        ) : (
          <p className='px-dashboard text-blue1'>No data is available.</p>
        ))}
    </section>
  );
}
