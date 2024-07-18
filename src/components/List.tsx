// Packages:
import useNYTArticles from '../hooks/useNYTArticles';
import ListItem from './ListItem';

// Functions:
const List = () => {
  // Constants:
  const { articles } = useNYTArticles();

  // Return:
  return (
    <div className='w-full h-full border-r-2 overflow-hidden'>
      <div className='flex justify-center items-center flex-col gap-1 w-full h-[10%] bg-zinc-800 text-white'>
        <div className='font-semibold'>NYT Most Popular</div>
        <div className='text-sm'>Find the most popular articles on New York Times</div>
      </div>
      <div data-testid='article-list' className='w-full h-[90%] overflow-y-scroll p-4'>
        {
          articles.map(article => (
            <ListItem
              key={article.id}
              article={article}
            />
          ))
        }
      </div>
    </div>
  );
};

// Exports:
export default List;
