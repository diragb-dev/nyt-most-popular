// Packages:
import useNYTArticles from '../hooks/useNYTArticles';

// Functions:
const Details = () => {
  // Constants:
  const { focusedArticle } = useNYTArticles();

  // Return:
  return (
    <div className='flex justify-center items-center w-full h-full'>
      {
        !focusedArticle ? (
          <div className='text-sm text-zinc-500'>Please select an article to view its details</div>
        ) : (
          <div data-testid='article-details' className='flex flex-col w-full h-full p-6'>
            <div
              role='img'
              className='w-full aspect-[4/2] mb-6 bg-center bg-cover bg-no-repeat rounded-md'
              style={{
                backgroundImage: `url(${ focusedArticle.media[0]?.['media-metadata'][2]?.url })`
              }}
            />
            <div data-testid='article-title' className='text-4xl font-bold mb-2'>{ focusedArticle.title }</div>
            <div className='text-base font-medium text-zinc-700'>{ focusedArticle.byline }</div>
            <div className='text-xl mt-6'>
              { focusedArticle.abstract }{' '}
              <a target='_blank' rel='noreferrer' href={focusedArticle.url}>Read more.</a>
            </div>
          </div>
        )
      }
    </div>
  );
};

// Exports:
export default Details;
