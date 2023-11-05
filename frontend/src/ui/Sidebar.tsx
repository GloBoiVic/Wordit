import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@nextui-org/react';
import { ReactNode } from 'react';

type SidebarProps = {
  onDismiss: () => void;
  children: ReactNode;
};

function Sidebar({ onDismiss, children }: SidebarProps) {
  return (
    <>
      <aside className="px-2 py-4 sm:w-[250px] sm:border-r">
        <div className="flex flex-col gap-3 mx-3">
          <Button
            onPress={onDismiss}
            className="w-full hover:bg-primary/60 text-stone-100"
            color="primary"
            startContent={<PlusCircleIcon className="w-5 h-5" />}
          >
            <span className="font-semibold capitalize">Add word</span>
          </Button>
          <Input
            placeholder="Search..."
            type="text"
            radius="md"
            startContent={<MagnifyingGlassIcon className="w-5 h-5" />}
          />
        </div>
      </aside>

      {children}
    </>
  );
}

export default Sidebar;
