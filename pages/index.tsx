import axios from 'axios';
import { GetStaticProps } from 'next';

import Search from '@/components/sections/home/Search';
import Trending from '@/components/sections/home/Trending';
import Categories from '@/components/sections/home/Categories';
import Markets from '@/components/sections/home/Markets';
import MarketNews from '@/components/sections/home/MarketNews';

import { NewsArticle, TrendingStock } from '@/interfaces/interfaces';

interface HomeProps {
  trending: TrendingStock[];
  news: NewsArticle[];
}

export default function Home({ trending, news }: HomeProps) {
  return (
    <>
      <Search />
      <Trending trending={trending} />
      <Categories />
      <Markets />
      <MarketNews news={news} />
    </>
  );
}

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

export const getStaticProps: GetStaticProps = async () => {
  const { data: trending } = await axios.get(
    `${FRONTEND_BASE_URL}/api/stocks/trending`
  );
  const { data: news } = await axios.get(
    `${FRONTEND_BASE_URL}/api/stocks/market-news`
  );

  return {
    props: { trending, news },
    revalidate: 60,
  };
};
