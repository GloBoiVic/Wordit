import { Link } from '@nextui-org/react';

function Header() {
  return (
    <header className="flex items-center justify-between w-full h-12 px-4 py-2 mx-auto border">
      <h1 className="text-4xl font-bold leading-relaxed">Wordit</h1>

      <div className="flex gap-8">
        <Link>Sign In</Link>
        <Link>Log In</Link>
      </div>
    </header>
  );
}

export default Header;
