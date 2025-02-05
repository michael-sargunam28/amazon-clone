

export function formattedCurrency(productPrice) {
    return ((productPrice.priceCents)/100).toFixed(2);
}