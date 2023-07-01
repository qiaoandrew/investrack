import axios from 'axios';
import { useEffect, useState } from 'react';
import { NewsArticle } from '@/interfaces/interfaces';
import Carousel from '@/components/UI/Carousel';
import NewsCard from '@/components/cards/NewsCards';

export default function MarketNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketNews = async () => {
      const { data } = await axios.get('/api/stocks/market-news');
      setNews(data as NewsArticle[]);
      setLoading(false);
    };

    fetchMarketNews();
  }, []);

  return (
    <Carousel title='Market News' loading={loading}>
      {news.map((article) => (
        <NewsCard
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
