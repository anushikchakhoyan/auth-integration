import React from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 60px;
  padding: 0.5rem 1.5rem;
  border: 1px solid gray;

  &:hover {
    color: white;
    background: #000;
  }
`;


const Button = ({className, onClick, children}: Props) => (
    <StyledButton className={className} onClick={onClick}>
        {children}
    </StyledButton>
);

export default Button;
