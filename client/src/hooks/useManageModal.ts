import { useState } from "react";

export default function useManageModal() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const onClick = () => setIsVisible((prev) => !prev);
  const closeModal = () => setIsVisible(false);
  const openModal = () => setIsVisible(true);

  return { onClick, closeModal, openModal, isVisible };
}
