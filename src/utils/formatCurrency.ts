const formatCurrency = (value = 0) => {
  return `$ ${new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)}`;
};

export default formatCurrency;
