/* eslint-disable react/no-unescaped-entities */
'use client';
import { Board } from '@/components/Board';
import { Footer } from '@/components/Footer';
import { Success } from '@/components/Success';
import { useEffect, useState } from 'react';

const correctlyWords = [
  ['CONSOLE', 'COMPUTADOR', 'CELULAR', 'MESA'],
  ['BLUETOOTH', 'WI-FI', 'INFRAVERMELHO', 'INTERNET'],
  ['QUARTO', 'BANHEIRO', 'SALA', 'COZINHA'],
  ['CADEIRA', 'SOFÁ', 'CAMA', 'FOGÃO'],
];

const words = [
  'CONSOLE',
  'QUARTO',
  'BLUETOOTH',
  'BANHEIRO',
  'MESA',
  'CADEIRA',
  'SALA',
  'INTERNET',
  'CELULAR',
  'COMPUTADOR',
  'INFRAVERMELHO',
  'COZINHA',
  'WI-FI',
  'SOFÁ',
  'FOGÃO',
  'CAMA',
];

const description = (
  <p>
    O jogo <span className='text-secondary'>"Conexo"</span> é um desafio de
    palavras e categorias, onde os participantes devem selecionar quatro
    palavras que compartilham um ponto em comum, seja uma categoria, um tema ou
    um conceito. O objetivo do jogo é criar conexões lógicas entre as palavras,
    organizando-as em grupos de quatro com base em critérios específicos.
  </p>
);

export default function Home() {
  // start the game
  const [start, setStart] = useState(false);
  // current words
  const [current, setCurrent] = useState<string[]>([]);
  // accepted words
  const [accepts, setAccepts] = useState<string[][]>([]);
  const [error, setError] = useState(false);

  // check if the words are correct
  const onCheck = (items: string[]) => {
    setAccepts((prev) => [...prev, items]);
    setCurrent([]);
  };

  // check if the words are not correct
  const onNotCheck = () => {
    let timer;
    clearTimeout(timer);
    setError(true);

    timer = setTimeout(() => {
      setCurrent([]);
      setError(false);
    }, 500);
  };

  // verify if the words are correct or not
  useEffect(() => {
    const isCurrently = current.length === 4;
    if (isCurrently) {
      correctlyWords.some((items) => {
        const inclusionCheck = items.every((item) => current.includes(item));
        if (inclusionCheck) {
          onCheck(items);
        } else {
          onNotCheck();
        }
      });
    }
  }, [current]);

  // check if the words are accepted
  const hasAccepted = (word: string) =>
    accepts.some((items) => items.includes(word));

  // check if the words are accepted and return the class
  const classAccepted = (word: string) => {
    if (hasAccepted(word)) {
      return 'bg-green-900';
    }
    if (current.includes(word)) {
      if (error) {
        return 'bg-red-900';
      }
      return 'bg-white bg-opacity-10';
    } else {
      return 'bg-white bg-opacity-5';
    }
  };

  // concat all words accepted
  const itemsSuccess = accepts.reduce(
    (accumulator, currentArray) => accumulator.concat(currentArray),
    []
  );

  // check if the all words are accepted
  const isSuccess = words.every((item) => itemsSuccess.includes(item));

  const buttonLabel = !start
    ? 'Começar a Jogar'
    : isSuccess
    ? 'Recomeçar'
    : 'Cancelar';

  const clearStates = () => {
    setCurrent([]);
    setAccepts([]);
  };

  const handleClick = () => {
    if (isSuccess) {
      setStart(false);
      clearStates();
    } else {
      setStart((prev) => !prev);
      clearStates();
    }
  };

  return (
    <main className='flex flex-col h-screen'>
      <div className='flex flex-col items-center flex-1 justify-center p-2'>
        <h1 className='text-secondary font-extrabold uppercase text-3xl mb-8'>
          Conexo
        </h1>
        {!start && (
          <div className='max-w-[500px] text-center mb-8'>{description}</div>
        )}
        {start && !isSuccess && (
          <Board
            words={words}
            classAccepted={classAccepted}
            hasAccepted={hasAccepted}
            setCurrent={setCurrent}
          />
        )}
        {isSuccess && <Success />}
        <button className='btn btn-secondary' onClick={handleClick}>
          {buttonLabel}
        </button>
      </div>
      <Footer />
    </main>
  );
}
