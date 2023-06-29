import Image, { type StaticImageData } from 'next/image';

interface NewsCardProps {
  title: string;
  description: string;
  picture: StaticImageData;
  link: string;
}

export default function NewsCard({
  title,
  description,
  picture,
  link,
}: NewsCardProps) {
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      className='transition-300 w-[320px] overflow-hidden rounded-xl border border-grey2 hover:bg-grey3 hover:bg-opacity-60'
    >
      <Image
        src={picture}
        alt={title}
        className='aspect-[320/150] object-cover'
      />
      <div className='whitespace-normal px-5 pb-7 pt-4'>
        <p className='mb-2 line-clamp-2 font-medium text-white 2xl:text-lg'>
          {title}
        </p>
        <p className='line-clamp-3 text-sm text-grey1 2xl:text-md'>
          {description}
        </p>
      </div>
    </a>
  );
}
