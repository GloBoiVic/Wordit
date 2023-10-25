import { Button, Input } from '@nextui-org/react';
import { ReactNode } from 'react';

type SidebarProps = {
  onDismiss: () => void;
  children: ReactNode;
};

function Sidebar({ onDismiss, children }: SidebarProps) {
  return (
    <>
      <div className="w-full col-span-1 px-2 py-4 bg-gray-300">
        <div className="w-3/4 space-y-3 sm:mx-auto">
          <Button onPress={onDismiss} className="w-full border">
            Add word
          </Button>
          <Input placeholder="Search..." type="text" radius="full" />
        </div>
      </div>

      {children}
    </>
  );
}

export default Sidebar;
