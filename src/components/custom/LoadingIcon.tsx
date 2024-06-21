import { leapfrog } from 'ldrs'

leapfrog.register()

export default function LoadingIcon() {
  return (
    <div className='w-[5.5rem] h-[5.5rem] bg-[#FFD13A] flex items-center justify-center rounded-[0.625rem]'>
      <l-leapfrog
          size="28"
          speed="2.5"
          color="#141414" 
        ></l-leapfrog>
    </div>
  );
};

