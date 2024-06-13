import Lottie from 'lottie-react';
import React from 'react';
import LoadingAnim from '../assets/loading.json';

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div> */}
      <Lottie animationData={LoadingAnim} loop={true} className='w-48 h-auto'/>
    </div>
  );
}

export default Loading;