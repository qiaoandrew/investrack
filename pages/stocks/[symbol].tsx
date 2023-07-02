import axios from 'axios';
import { type GetServerSideProps } from 'next';
import { NewsArticle, StockPrice, TableItem } from '@/interfaces/interfaces';
import Header from '@/components/sections/stock/Header';
import Chart from '@/components/sections/stock/Chart';
import MobileButtons from '@/components/sections/stock/MobileButtons';
import Summary from '@/components/sections/stock/Summary';
import Financials from '@/components/sections/stock/Financials';
import Profile from '@/components/sections/stock/Profile';
import Description from '@/components/sections/stock/Description';
import News from '@/components/sections/stock/News';

interface StockProps {
  price: StockPrice;
  summary: TableItem[];
  profile: TableItem[];
  description: string;
  news: NewsArticle[];
}

export default function Stock({
  price,
  summary,
  profile,
  description,
  news,
}: StockProps) {
  return (
    <>
      <Header
        name={price.name}
        symbol={price.symbol}
        exchange={price.exchange}
      />
      <Chart
        price={price.price}
        change={price.change}
        changePercent={price.changePercent}
      />
      <MobileButtons />
      <Summary summary={summary} />
      <Financials />
      <Profile profile={profile} />
      <Description description={description} />
      <News news={news} />
    </>
  );
}

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { symbol } = query;

  const { data: price } = await axios.get(
    `${FRONTEND_BASE_URL}/api/stocks/price`,
    { params: { symbol } }
  );
  const { data: summary } = await axios.get(
    `${FRONTEND_BASE_URL}/api/stocks/summary`,
    { params: { symbol } }
  );
  const {
    data: { profile, description },
  } = await axios.get(`${FRONTEND_BASE_URL}/api/stocks/profile`, {
    params: { symbol },
  });
  const { data: news } = await axios.get(
    `${FRONTEND_BASE_URL}/api/stocks/news`,
    { params: { symbol } }
  );

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return { props: { price, summary, profile, description, news } };
};
