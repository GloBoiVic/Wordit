import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@nextui-org/react';
import { ChangeEvent, ReactNode } from 'react';

type SidebarProps = {
  onDismiss: () => void;
  children: ReactNode;
  searchQuery: string;
  onChangeSearchQuery: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Sidebar({ onDismiss, children, searchQuery, onChangeSearchQuery }: SidebarProps) {
  return (
    <>
      <aside className="px-2 py-4 sm:w-[250px] sm:border-r border-primary">
        <div className="flex flex-col gap-3 mx-3 text-foreground">
          <Button
            onPress={onDismiss}
            className="w-full hover:bg-accent"
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
            onChange={onChangeSearchQuery}
          />
        </div>
        <p>{searchQuery}</p>
      </aside>

      {children}
    </>
  );
}

export default Sidebar;
