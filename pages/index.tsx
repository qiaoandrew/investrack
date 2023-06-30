import axios from 'axios';
import { type GetStaticProps } from 'next';
import { type Asset } from '@/components/cards/AssetCard';
import Search from '@/components/sections/home/Search';
import Markets from '@/components/sections/home/Markets';
import Categories from '@/components/sections/home/Categories';
import Trending from '@/components/sections/home/Trending';
import News from '@/components/sections/home/News';

interface HomeProps {
  trending: Asset[];
}

export default function Home({ trending }: HomeProps) {
  return (
    <>
      <Search />
      <Markets />
      <Categories />
      <Trending trending={trending} />
      <News />
    </>
  );
}

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(`${FRONTEND_BASE_URL}/api/stocks/trending`);

  return {
    props: { trending: data },
    revalidate: 60,
  };
};
