import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function RegisterSuccess() {
  const navigate = useNavigate();

  function goToLogin() {
    navigate('/login');
  }

  return (
    <>
      <main className="mx-auto my-0 flex min-h-screen w-full flex-col items-center">
        <div className="max-h-[124px] w-full px-[1.25rem] py-[2rem] md:max-h-[130px] md:p-[3.625rem]">
          <div className="mx-auto my-0 h-[124px] w-full md:w-4/5">
            <div className="flex w-full">
              <img src="icons/mark.svg" alt="Mark logo" />
              <img
                className="hidden md:block"
                src="icons/reap-icon.svg"
                alt="Reap logo for website"
              />
            </div>
          </div>
        </div>
        <div className="relative mx-auto my-0 flex w-full max-w-[700px] flex-col px-2 antialiased md:gap-y-10 md:pt-10">
          <div className="flex flex-col items-center justify-center gap-5 text-center md:gap-y-[2.5rem]">
            <img src="icons/checkmark-frame.svg" alt="Successful mark" />
            <h1 className="font-barlow text-[2.5rem] font-[800] uppercase tracking-[-0.05rem] md:text-[64px]">
              You have successfully registered your reaps account
            </h1>
            <p className="text-sm text-[#454745]">
              Please click on the{' '}
              <span className="font-semibold">continue</span> button to proceed
              to your dashboard
            </p>
          </div>
          <div className="mx-auto my-0 w-full max-w-[358px] md:w-3/5 md:max-w-[526px]">
            <Button
              className={`my-4 w-full focus:outline-none`}
              onClick={() => {
                goToLogin();
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
