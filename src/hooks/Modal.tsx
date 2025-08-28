import React, { createContext, useContext, useState, ReactNode } from "react";
interface ModalContextType {
  openModal: (conten: ReactNode) => void;
  closeModal: () => void;
  userName: () => void;
}
const ModalContext = createContext();
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) return "context must be wrapped by modal";
  return context;
}
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  function openModal(content: ReactNode) {
    setModalContent(content);
  }
  function closeModal() {
    setModalContent(null);
  }
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalContent && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-40"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white dark:bg-gray-800 object-cover rounded-lg"
          >
            <button
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-200 font-bold text-xl"
              onClick={closeModal}
            >
              ×
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
