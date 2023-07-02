interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <section className='mx-dashboard mb-20 2xl:mb-24'>
      <h2 className='mb-3 text-2xl font-semibold text-white 2xl:text-3xl'>
        Description
      </h2>
      <p className='leading-loose text-blue1'>{description}</p>
    </section>
  );
}
