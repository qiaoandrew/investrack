import Image from 'next/image';

export interface NewsCardProps {
  title: string;
  description?: string;
  image: string;
  url: string;
}

export default function NewsCard({
  title,
  description,
  image,
  url,
}: NewsCardProps) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='transition-300 w-80 overflow-hidden rounded-xl border border-grey2 hover:bg-grey3 hover:bg-opacity-60'
    >
      <Image
        src={image}
        alt={title}
        width={320}
        height={160}
        className='h-40 w-80 object-cover'
      />
      <div className='whitespace-normal px-5 pb-7 pt-4'>
        <p
          className={`line-clamp-2 font-medium text-white 2xl:text-lg ${
            description ? 'mb-2' : ''
          }`}
        >
          {title}
        </p>
        {description && (
          <p className='line-clamp-3 text-sm text-grey1 2xl:text-md'>
            {description}
          </p>
        )}
      </div>
    </a>
  );
}
