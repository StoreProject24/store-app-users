const formatPrice = (price: number) => {
  const newPrice = price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return newPrice;
};

export default formatPrice;
