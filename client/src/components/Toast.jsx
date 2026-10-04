import { useRef } from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  const lastMessage = useRef('');

  if (toast?.message) lastMessage.current = toast.message;

  return (
    <div
      className={`cart-toast${toast ? ' cart-toast--visible' : ''}`}
      role="status"
      aria-live="polite"
    >
      {lastMessage.current}
    </div>
  );
}