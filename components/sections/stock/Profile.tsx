import Table from '@/components/UI/Table';

import { TableItem } from '@/interfaces/interfaces';

type ProfileProps = {
  profile: TableItem[];
};

export default function Profile({ profile }: ProfileProps) {
  return (
    <section className='mx-dashboard mb-20 2xl:mb-24'>
      <h2 className='mb-6 text-2xl font-semibold text-white md:mb-8 2xl:text-3xl'>
        Profile
      </h2>
      <Table items={profile} />
    </section>
  );
}
