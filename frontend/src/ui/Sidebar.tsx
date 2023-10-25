import { Button, Input } from '@nextui-org/react';
import { ReactNode } from 'react';

type SidebarProps = {
  onDismiss: () => void;
  children: ReactNode;
};

function Sidebar({ onDismiss, children }: SidebarProps) {
  return (
    <>
      <div className="px-2 py-4 bg-gray-300">
        <div className="flex flex-col gap-3 sm:flex-row sm:w-1/2">
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
