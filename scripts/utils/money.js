

export function formattedCurrency(productPrice) {
    return (Math.round(productPrice)/100).toFixed(2);
}