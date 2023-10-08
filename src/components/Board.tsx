export const Board = ({
  words,
  classAccepted,
  hasAccepted,
  setCurrent,
}: any) => {
  return (
    <div className='grid grid-cols-4 gap-2 md:gap-4 mb-8'>
      {words.map((word: any) => (
        <div
          key={word}
          className={`md:w-[150px] md:h-[100px] ${classAccepted(
            word
          )} rounded-md p-2 flex justify-center items-center font-medium text-sm border-2 border-white border-opacity-10 cursor-pointer`}
          onClick={() => {
            if (!hasAccepted(word)) {
              setCurrent((prev: any) => [
                ...prev.filter((item: any) => item !== word),
                word,
              ]);
            }
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
};
