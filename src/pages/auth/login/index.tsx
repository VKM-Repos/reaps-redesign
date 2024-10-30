import { LoginForm } from './LoginForm';
import TopBar from '@/components/custom/TopBar';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <TopBar title="" />
      <div className="mx-auto my-0 w-4/5 antialiased">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl2 pb-5 pt-10 font-semibold md:py-5">
            Welcome back.
          </h1>
          <p className="pb-10 pt-2 text-sm">
            New to R.E.A.P.S?{' '}
            <a
              onClick={() => {
                navigate('/signup');
              }}
              className="text-black hover:text-black font-semibold underline"
            >
              Sign up
            </a>
          </p>
        </div>
        <div className="mx-auto my-0 w-full max-w-[358px] md:w-3/5 md:max-w-[526px]">
          <LoginForm />
        </div>
        <p className="mx-auto max-w-fit pb-8 pt-2 text-sm">
          Trouble logging in?{' '}
          <a
            className="text-black hover:text-black font-semibold underline"
            href="https://www.vhdo.org/"
            target="_blank"
          >
            Contact us
          </a>{' '}
          or{' '}
          <a
            className="text-black hover:text-black font-semibold underline"
            href="/recovery"
          >
            Reset your password
          </a>
        </p>
      </div>
    </>
  );
}
