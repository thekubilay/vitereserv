export function isRomaji(value = ""): string {
  return value.match(/^[0-9a-zA-Z]*$/) ? "" : "半角英数字で入力してください。"
}

export function isRomajiWithIrregulars(value = ""): string {
  return value.match(/^[ -~]+$/) ? "" : "半角英数字記号で入力して下さい。"
}

export function isMail(value = ""): string {
  return value.match(/^[a-zA-Z0-9!$&*.=^`|~#%'+/?_{}-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,4}$/) ? "" : "メールアドレスを正しく入力してください。"
}

export function isKatakana(value = ""): string {
  return value.match(/^[ァ-ヶー]*$/) ? "全角カタカナで入力してください。" : ""
}

export function isZip(value = ""): string {
  return value.match(/^\d{3}-*\d{4}$/) ? "郵便番号を入力してください。" : ""
}
