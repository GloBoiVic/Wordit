import { Link } from '@nextui-org/react';

function Header() {
  return (
    <header className="border flex space-between max-w-lg">
      <h1 className="text-2xl font-bold">Wordit</h1>

      <div>
        <Link>Sign In</Link>
        <Link>Log In</Link>
      </div>
    </header>
  );
}

export default Header;
