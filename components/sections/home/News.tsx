import Carousel from '@/components/UI/Carousel';
import NewsCard from '@/components/cards/NewsCards';
import newsPicture from '@/public/img/dummy/news.png';

const NEWS = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget aliquam quam. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl.',
    picture: newsPicture,
    link: 'https://www.google.com',
  },
  {
    id: '2',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget aliquam quam. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl.',
    picture: newsPicture,
    link: 'https://www.google.com',
  },
  {
    id: '3',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget aliquam quam. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl.',
    picture: newsPicture,
    link: 'https://www.google.com',
  },
  {
    id: '4',
    title:
      'Lorem ipsum dafdfdsfdsfdsfsdolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget aliquam quam. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl.',
    picture: newsPicture,
    link: 'https://www.google.com',
  },
  {
    id: '5',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget aliquam quam. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl.',
    picture: newsPicture,
    link: 'https://www.google.com',
  },
  {
    id: '6',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget aliquam quam. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl. Donec eget nisl euismod, aliquet nisl quis, aliquam nisl.',
    picture: newsPicture,
    link: 'https://www.google.com',
  },
];

export default function News() {
  return (
    <Carousel title='News'>
      {NEWS.map((news) => (
        <NewsCard
          key={news.id}
          title={news.title}
          description={news.description}
          picture={news.picture}
          link={news.link}
        />
      ))}
    </Carousel>
  );
}
