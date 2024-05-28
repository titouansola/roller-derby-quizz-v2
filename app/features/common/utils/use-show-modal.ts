import { useCallback, useState } from 'react';

export function useShowModal(): [boolean, () => void] {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  return [showModal, toggleModal];
}
