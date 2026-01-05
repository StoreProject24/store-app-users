export interface Props {
  handleQuantity: (v: 'increment' | 'decrement') => void;
  quantity: number;
  disabled: boolean;
}
