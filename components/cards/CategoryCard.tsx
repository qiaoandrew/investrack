import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  label: string;
  graphic: StaticImageData;
  route: string;
  bg: string;
}

export default function CategoryCard({
  label,
  graphic,
  route,
  bg,
}: CategoryCardProps) {
  return (
    <Link
      href={route}
      className='group relative flex h-40 w-60 flex-col justify-between overflow-hidden rounded-lg border border-grey2 pb-5 pl-5 pr-4 pt-4'
    >
      <div
        className={`transition-300 absolute inset-0 opacity-60 group-hover:opacity-100 ${bg}`}
      />
      <Image
        src={graphic}
        alt={label}
        className='transition-300 mb-3.5 w-20 self-end opacity-50 group-hover:opacity-100'
      />
      <p className='text-lg font-medium text-white md:text-xl'>{label}</p>
    </Link>
  );
}
