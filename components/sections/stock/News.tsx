import Carousel from '@/components/UI/Carousel';
import NewsCard from '@/components/cards/NewsCard';

import { NewsArticle } from '@/interfaces/interfaces';

type NewsProps = { news: NewsArticle[] };

export default function News({ news }: NewsProps) {
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
