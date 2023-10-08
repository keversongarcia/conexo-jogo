import Lottie, { LottieComponentProps, useLottie } from 'lottie-react';
import successAnimation from '../assets/animations/success.json';

const options: LottieComponentProps = {
  animationData: successAnimation,
  loop: false,
  width: '100',
  height: '100',
};

export const Success = () => {
  const { View } = useLottie(options);

  return <div className='relative max-w-[500px] mb-8'>{View}</div>;
};
