import { ButtonHTMLAttributes } from 'react';

interface ActionButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  alt: string
  testId: string
}

function ActionButtons({ icon, alt, testId, ...props }:ActionButtonsProps) {
  return (
    <button { ...props }><img src={ icon } alt={ alt } data-testid={ testId } /></button>
  );
}
export default ActionButtons;
