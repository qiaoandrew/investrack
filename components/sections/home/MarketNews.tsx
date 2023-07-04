import Carousel from '@/components/UI/Carousel';
import NewsCard from '@/components/cards/NewsCard';

import { NewsArticle } from '@/interfaces/interfaces';

export default function MarketNews({ news }: { news: NewsArticle[] }) {
  return (
    <Carousel title='Market News'>
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
