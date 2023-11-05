import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { ChangeEvent, ReactNode, useState } from 'react';
import useGetWords from '../features/vocab/useGetWords';

type SidebarProps = {
  onDismiss: () => void;
  children: ReactNode;
};

const selectValues = [
  { key: 0, item: 'Ascend' },
  { key: 1, item: 'Decend' },
];

function Sidebar({ onDismiss, children }: SidebarProps) {
  const [sortValue, setSortValue] = useState('');

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
  };

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
          <Select label="Sort By:" selectedKeys={[sortValue]} onChange={handleSelectionChange}>
            {selectValues.map((val) => (
              <SelectItem key={val.key} value={val.item}>
                {val.item}
              </SelectItem>
            ))}
            {/* <SelectItem key={1} value={'Ascend'}>
              Ascend
            </SelectItem>
            <SelectItem key={2} value={'Decend'}>
              Decend
            </SelectItem> */}
          </Select>
          <p>Selected value: {sortValue}</p>
        </div>
      </aside>

      {children}
    </>
  );
}

export default Sidebar;
