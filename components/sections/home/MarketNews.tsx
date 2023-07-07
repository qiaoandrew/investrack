import axios from 'axios';
import { useState, useEffect } from 'react';

import Carousel from '@/components/UI/Carousel';
import NewsCard from '@/components/cards/NewsCard';

import { NewsArticle } from '@/types/types';

export default function MarketNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/stocks/market-news');
        setNews(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Carousel title='Market News' loading={loading} error={error}>
      {news.map((article) => (
        <NewsCard
          title={article.title}
          description={article.description}
          image={article.image}
          url={article.url}
          key={article.id}
        />
      ))}
    </Carousel>
  );
}
