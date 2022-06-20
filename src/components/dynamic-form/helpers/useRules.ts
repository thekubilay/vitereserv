export function isRomaji(value = ""): string {//hankaku
  return value.match(/^[0-9a-zA-Z]*$/) ? "" : "半角英数字で入力してください。"
}

export function isRomajiWithIrregulars(value = ""): string {//hankakukigou
  return value.match(/^[ -~]+$/) ? "" : "半角英数字記号で入力して下さい。"
}

export function isMail(value = ""): string {
  return value.match(/^[a-zA-Z0-9!$&*.=^`|~#%'+/?_{}-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,4}$/) ? "" : "メールアドレスを正しく入力してください。"
}

export function isKatakana(value = ""): string {//kana
  return value.match(/^[ァ-ヶー]*$/) ? "" : "全角カタカナで入力してください。"
}

export function isZip(value = ""): string {
  return value.match(/^\d{3}-*\d{4}$/) ? "" : "郵便番号を入力してください。"
}

export function isNumber(value = ""): string {//hankaku
  return value.match(/^[0-9]*$/) ? "" : "数字入力してください。"
}

export function phoneNumberCheck(val: string = "") {
  // // if(typeof val === "number")
  // val = String(val)
  if(val.match(/^[0-9]*$/)){
    if (val.match(/^0\d{9}$/)) {
      return ""
    }else if(val.match(/^0\d{3}\d{2}\d{4}$/)) {
      return ""
    }
    else if(val.match(/^\(0\d\)\d{4}\d{4}$/)) {
      return ""
    }
    else if(val.match(/^\(0\d{3}\)\d{2}\d{4}$/)) {
      return ""
    }
    else if(val.match(/^(070|080|090)\d{4}\d{4}$/)) {
      return ""
    }
    else if(val.match(/^050\d{4}\d{4}$/)) {
      return ""
    }
    else if(val.match(/^0120\d{3}\d{3}$/)) {
      return ""
    }else if(val.match(/^0120\d{6}$/ )) {
      return ""
    }
    return "電話番号を正しく入力してください。"
  }
  return "数字を入力してください。"
}