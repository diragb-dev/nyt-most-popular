// Packages:
import React from 'react';
import useNYTArticles from '../hooks/useNYTArticles';

// Typescript:
import { NYTArticleListItem } from '../types';

// Functions:
const ListItem = ({
  article
}: {
  article: NYTArticleListItem
}) => {
  // Constants:
  const { focusedArticleID, setFocusedArticleID } = useNYTArticles();

  // Return:
  return (
    <div
      data-testid='article-item'
      className={`flex flex-row gap-4 w-full min-h-36 mb-4 border-2 p-4 rounded-md ${ focusedArticleID === article.id ? 'bg-zinc-300 hover:bg-zinc-300' : 'bg-white hover:bg-zinc-200' } cursor-pointer transition-all`}
      onClick={() => focusedArticleID === article.id ? setFocusedArticleID(undefined) : setFocusedArticleID(article.id)}
    >
      <div
        role='img'
        className='w-[40%] aspect-[3/2] bg-center bg-cover bg-no-repeat rounded-md'
        style={{
          backgroundImage: `url(${ article.media[0]?.['media-metadata'][1]?.url })`
        }}
      />
      <div className='flex justify-center flex-col gap-1 w-[60%]'>
        <div className='font-bold text-base'>{ article.title }</div>
        <p className='font-medium text-xs'>{ article.abstract }</p>
      </div>
    </div>
  );
};

// Exports:
export default ListItem;
