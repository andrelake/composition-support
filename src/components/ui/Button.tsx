import styled, { css } from 'styled-components';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

/**
 * Props for the Button component.
 * Extends standard HTML button attributes.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The content of the button */
  children: ReactNode;
  /** Visual style variant of the button */
  variant?: ButtonVariant;
}

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s, filter 0.2s;
  border: none;
  outline: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ theme, $variant }) => {
    if ($variant === 'primary') {
      return css`
        background-color: ${theme.colors.primary};
        color: #ffffff;

        &:hover:not(:disabled) {
          background-color: ${theme.colors.primaryLight};
        }
      `;
    } else {
      return css`
        background-color: ${theme.colors.surfaceHover};
        color: ${theme.colors.text}; // Assuming text color works on surfaceHover
        border: 1px solid ${theme.colors.border};

        &:hover:not(:disabled) {
           filter: brightness(1.2);
        }
      `;
    }
  }}
`;

/**
 * A primary action button component.
 * Used for main interactions like "Spin", "Save", etc.
 * 
 * @param props - The component props
 * @returns The styled Button component
 */
export function Button({ 
  children, 
  variant = 'primary', 
  ...props 
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
