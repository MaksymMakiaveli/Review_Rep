import { useState } from 'react';

interface HookReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}
interface HookProps {
  initialOpen?: boolean;
}
const useModalState = (props: HookProps): HookReturn => {
  const { initialOpen = false } = props;
  const [isOpen, setIsOpen] = useState(initialOpen);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, onOpen, onClose, onToggle };
};

export default useModalState;
