import { Link } from '@nextui-org/react';

function Header() {
  return (
    <header className="border flex items-center max-w-lg justify-between h-12 px-4 py-2 mx-auto">
      <h1 className="text-4xl leading-relaxed font-bold">Wordit</h1>

      <div className="flex gap-8">
        <Link>Sign In</Link>
        <Link>Log In</Link>
      </div>
    </header>
  );
}

export default Header;
