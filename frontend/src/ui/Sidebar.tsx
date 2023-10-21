import { Button, Input } from '@nextui-org/react';
import CreateWordModal from '../features/vocab/CreateWordModal';
import { useState } from 'react';

function Sidebar() {
  const [showAddWordModal, setShowAddWordModal] = useState(false);

  return (
    <>
      <div className="w-full col-span-1 px-2 py-4 bg-gray-300">
        <div className="w-3/4 space-y-3">
          <Button onPress={() => setShowAddWordModal(true)} className="w-full border">
            Add word
          </Button>
          <Input placeholder="Search..." type="text" radius="full" />
        </div>
      </div>

      {showAddWordModal && <CreateWordModal onDismiss={() => setShowAddWordModal(false)} />}
    </>
  );
}

export default Sidebar;
