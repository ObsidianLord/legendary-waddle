const formatPrice = (price: number): string => price.toLocaleString('en').replaceAll(',', ' ');

export default formatPrice;
