// Packages:
import useNYTArticles from './hooks/useNYTArticles';

// Components:
import Details from './components/Details';
import List from './components/List';

// Functions:
const App = () => {
  // Constants:
  const { isFetchingArticles } = useNYTArticles();

  // Return:
  return (
    <>
      <div
        className={`flex flex-row w-screen h-screen bg-white ${ isFetchingArticles ? 'select-none brightness-75' : 'select-auto brightness-100' } transition-all`}
      >
        <div className='w-[25vw] h-full'>
          <List />
        </div>
        <div className='w-[75vw] h-full'>
          <Details />
        </div>
      </div>
    </>
  );
};

// Exports:
export default App;
