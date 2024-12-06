export default function formatCurrency(num: any) {
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
  }
  