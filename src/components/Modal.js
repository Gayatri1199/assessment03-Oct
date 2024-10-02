// Modal.js
import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  padding-top: 10px;
  border-radius: 15px;
  max-width: 750px;
  width: 90%;
  position: relative;
  h3 {
    margin-top: 0px;
  }
  form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    input,
    button {
      font-family: "Poppins", sans-serif;
    }
    input {
      max-width: 47%;
      width: 100%;
      padding: 5px;
      border: 1px solid #eeeeee;
      &:focus-visible {
        outline: none;
      }
    }
    button {
      width: 100%;
      padding: 10px;
      text-transform: uppercase;
      background: #000;
      border: none;
      color: #fff;
      cursor: pointer;
      margin-top: 10px;
    }
  }
`;

const CloseButton = styled.button`
  background: #fff;
  color: #000;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 11px;
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <i class="fa-solid fa-x"></i>
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
