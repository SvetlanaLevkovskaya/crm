export const formatCurrency = (value: number) => {
    const formattedValue = new Intl.NumberFormat('ru-RU', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)

    if (value % 1 === 0) return formattedValue.split(',')[0]

    return formattedValue
}
