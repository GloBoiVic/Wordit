import { Link } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

function ErrorVocabPage() {
  return (
    <main className="h-[30vh] flex justify-center items-center">
      <div className="max-w-lg mx-auto space-y-3 text-center">
        <h3 className="text-4xl font-semibold sm:text-5xl">Oops</h3>
        <p>Sorry, something went wrong while getting your words. Please try again later</p>
        <Link
          as={NavLink}
          to="/"
          className="inline-flex items-center font-medium text-indigo-600 duration-150 hover:text-indigo-400 gap-x-1"
        >
          Go back
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}

export default ErrorVocabPage;
