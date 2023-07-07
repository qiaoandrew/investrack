import axios from 'axios';
import { useEffect, useState } from 'react';
import { type GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Header from '@/components/sections/stock/Header';
import Chart from '@/components/sections/stock/Chart';
import MobileButtons from '@/components/sections/stock/MobileButtons';
import Summary from '@/components/sections/stock/Summary';
import Financials from '@/components/sections/stock/Financials';
import Profile from '@/components/sections/stock/Profile';
import Description from '@/components/sections/stock/Description';
import News from '@/components/sections/stock/News';

import { NewsArticle, StockPrice, TableItem } from '@/types/types';

type StockProps = {
  price: StockPrice;
};

export default function Stock({ price }: StockProps) {
  const [summary, setSummary] = useState<TableItem[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState(false);

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);

  const [profile, setProfile] = useState<TableItem[]>([]);
  const [description, setDescription] = useState<string>('');
  const [profileDescriptionLoading, setProfileDescriptionLoading] =
    useState(true);
  const [profileDescriptionError, setProfileDescriptionError] = useState(false);

  const router = useRouter();
  const { symbol } = router.query;

  useEffect(() => {
    const fetchSummary = async () => {
      setSummaryLoading(true);
      setSummaryError(false);
      if (!symbol) return;
      try {
        const { data } = await axios.get('/api/stocks/summary', {
          params: { symbol },
        });
        setSummary(data);
      } catch (error) {
        console.error(error);
        setSummaryError(true);
      } finally {
        setSummaryLoading(false);
      }
    };

    const fetchNews = async () => {
      setNewsLoading(true);
      setNewsError(false);
      if (!symbol) return;
      try {
        const { data } = await axios.get('/api/stocks/news', {
          params: { symbol },
        });
        setNews(data);
      } catch (error) {
        console.error(error);
        setNewsError(true);
      } finally {
        setNewsLoading(false);
      }
    };

    const fetchProfileAndDescription = async () => {
      setProfileDescriptionLoading(true);
      setProfileDescriptionError(false);
      if (!symbol) return;
      try {
        const {
          data: { profile, description },
        } = await axios.get('/api/stocks/profile', {
          params: { symbol },
        });
        setProfile(profile);
        setDescription(description);
      } catch (error) {
        console.error(error);
        setProfileDescriptionError(true);
      } finally {
        setProfileDescriptionLoading(false);
      }
    };

    fetchSummary();
    fetchNews();
    fetchProfileAndDescription();
  }, [symbol]);

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
      <Summary
        summary={summary}
        loading={summaryLoading}
        error={summaryError}
      />
      <Financials />
      <Profile
        profile={profile}
        loading={profileDescriptionLoading}
        error={profileDescriptionError}
      />
      <Description
        description={description}
        loading={profileDescriptionLoading}
        error={profileDescriptionError}
      />
      <News news={news} loading={newsLoading} error={newsError} />
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

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return { props: { price } };
};
