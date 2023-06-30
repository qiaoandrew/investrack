import axios from 'axios';
import { useEffect, useState } from 'react';
import Carousel from '@/components/UI/Carousel';
import NewsCard, { type Article } from '@/components/cards/NewsCards';

export default function MarketNews() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketNews = async () => {
      const { data } = await axios.get('/api/stocks/market-news');
      setNews(data);
      setLoading(false);
    };

    fetchMarketNews();
  }, []);

  return (
    <Carousel title='Market News' loading={loading}>
      {news.map((article) => (
        <NewsCard
          id={article.id}
          headline={article.headline}
          summary={article.summary}
          image={article.image}
          url={article.url}
          key={article.id}
        />
      ))}
    </Carousel>
  );
}
