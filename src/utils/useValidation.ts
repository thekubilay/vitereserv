function required(val: string|number|Array<string>|any){
  if(Array.isArray(val)){
    if(val.length>0)
      return true
    return "情報を入力してください。"
  }
  if(typeof val === "number" && val.toString().length>0)
    return true;
  if(typeof val === "string" && val.length>0)
    return true
  if(typeof val === "object" && val!==null && val.hasOwnProperty("value") && val.value.toString().length>0)//null is considered an object
    return true
  if(Array.isArray(val) && val.length>0)
    return true
  return "情報を入力してください。"
}

function hankakuCheck(val: string) {
  if (!val || val.match(/^[0-9a-zA-Z]*$/)) {
      return true
  }
  return "半角英数字で入力してください。"
}

function hankakukigouCheck(val: string) {
  if(!val || val.match(/^[ -~]+$/)) {
      return true
  }
  return "半角英数字記号で入力して下さい。"
}

function mailCheck(val: string) {
  if (!val || val.match(/^[a-zA-Z0-9!$&*.=^`|~#%'+/?_{}-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,4}$/)) {
      return true
  }
  return "メールアドレスを正しく入力してください。"
}

function kanaCheck(val: string) {
  if (!val || val.match(/^[ァ-ヶー]*$/)) {
      return true
  }
  return "全角カタカナで入力してください。"
}

function zipCodeCheck(val:string|number) {
  val = val.toString()
  if (!val || val.match(/^\d{3}-*\d{4}$/ )) {
      return true
  }
  return "郵便番号を入力してください。"
}

function minLength(l: number,val:string){
  if(!val || val.length >= l)
    return true
  return `${l}文字以上を入力して下さい。`
}

function phoneNumberCheck(val: string) {
  // if (!val || val.match(/^0\d{9}$/ )) {
  //     return true
  // }
  // else if(!val || val.match(/^0\d{3}\d{2}\d{4}$/ )) {
  //     return true
  // }
  // else if(!val || val.match(/^\(0\d\)\d{4}\d{4}$/ )) {
  //     return true
  // }
  // else if(!val || val.match(/^\(0\d{3}\)\d{2}\d{4}$/ )) {
  //     return true
  // }
  // else if(!val || val.match(/^(070|080|090)\d{4}\d{4}$/ )) {
  //     return true
  // }
  // else if(!val || val.match(/^050\d{4}\d{4}$/ )) {
  //     return true
  // }
  // else if(!val || val.match(/^0120\d{3}\d{3}$/ )) {
  //     return true
  // }
  return true
}

export default {
  required,
  hankakuCheck,
  hankakukigouCheck,
  mailCheck,
  kanaCheck,
  zipCodeCheck,
  minLength,
  phoneNumberCheck,
}
