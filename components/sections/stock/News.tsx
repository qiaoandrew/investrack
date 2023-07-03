import Carousel from '@/components/UI/Carousel';
import NewsCard from '@/components/cards/NewsCard';

import { NewsArticle } from '@/interfaces/interfaces';

export default function News({ news }: { news: NewsArticle[] }) {
  return (
    <section>
      <Carousel title='News'>
        {news.map((article) => (
          <NewsCard
            title={article.title}
            image={article.image}
            url={article.url}
            key={article.id}
          />
        ))}
      </Carousel>
    </section>
  );
}
