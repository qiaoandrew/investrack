import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  label: string;
  image: StaticImageData;
  route: string;
  bg: string;
}

export default function CategoryCard({
  label,
  image,
  route,
  bg,
}: CategoryCardProps) {
  return (
    <Link
      href={route}
      className='group relative flex h-40 w-60 flex-col justify-between overflow-hidden rounded-lg border border-grey2 pb-5 pl-5 pr-4 pt-4 2xl:h-44 2xl:w-[260px] 2xl:rounded-xl'
    >
      <div
        className='transition-300 absolute inset-0 opacity-60 group-hover:opacity-100'
        style={{
          background: `linear-gradient(45deg, ${bg}4D 0%, rgba(0, 0, 0, 0) 100%)`,
        }}
      />
      <Image
        src={image}
        alt={label}
        className='transition-300 z-10 mb-3.5 w-20 self-end opacity-50 group-hover:opacity-100'
      />
      <p className='z-10 truncate text-lg font-medium text-white md:text-xl'>
        {label}
      </p>
    </Link>
  );
}
