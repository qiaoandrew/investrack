interface CarouselProps {
  title: string;
  curDropdownValue: string;
  setDropdownValue: (value: string) => void;
  dropdownOptions: string[];
  margin: string;
  children: React.ReactNode;
}

export default function Carousel({
  title,
  curDropdownValue,
  setDropdownValue,
  dropdownOptions,
  margin,
  children,
}: CarouselProps) {
  return (
    <>
      <div className='mx-dashboard flex items-center justify-between'></div>
    </>
  );
}
