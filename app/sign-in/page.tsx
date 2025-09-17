'use client';
import { useAuthActions } from '@convex-dev/auth/react';

import { Button } from '@/components/ui/button';

export default function SignInPage() {
  return (
    <div className="min-h-[100svh] flex items-center justify-center px-4">
      <SignInCard />
    </div>
  );
}

const SignInCard = () => {
  const { signIn } = useAuthActions();

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center gap-2 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-center">
          Not Fin Advice
        </h1>
        <p className="text-muted-foreground text-sm text-center max-w-xs">
          Sign in to access your personalized financial insights.
        </p>
      </div>
      <div className="p-0 sm:p-2">
        <Button
          aria-label="Sign in with Google"
          variant="outline"
          type="button"
          className="w-full h-10"
          onClick={() => void signIn('google')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            className="size-5"
          >
            <path
              fill="#EA4335"
              d="M17.64 9.204c0-.638-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.841 2.077-1.79 2.716v2.258h2.9c1.698-1.564 2.686-3.867 2.686-6.615z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.467-.804 5.956-2.18l-2.9-2.258c-.804.54-1.834.861-3.056.861-2.348 0-4.335-1.585-5.045-3.716H.957v2.332C2.437 15.983 5.478 18 9 18z"
            />
            <path
              fill="#FBBC05"
              d="M3.955 10.706a5.41 5.41 0 0 1 0-3.412V4.962H.957a9.002 9.002 0 0 0 0 8.076l2.998-2.332z"
            />
            <path
              fill="#4285F4"
              d="M9 3.579c1.321 0 2.515.454 3.452 1.345l2.589-2.589C13.464.866 11.427 0 9 0 5.478 0 2.437 2.017.957 4.962l2.998 2.332C4.665 5.164 6.652 3.579 9 3.579z"
            />
          </svg>
          Sign in with Google
        </Button>

        <p className="text-muted-foreground text-center text-xs text-balance mt-4 *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
          By clicking continue, you agree to our{' '}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};
