export default function () {
  function isTelValid(val: string) {
    const expression = new RegExp('^[0-9]*$');
    if (expression.test(val) && val.length < 12){
      return true
    }
    if (expression.test(val) && val.length > 12){
      return "最大「12」桁まで入力してください。"
    } else {
      return "電話番号を正しく入力してください。"
    }
  }


  function isKataKanaValid(val: string) {
    if (!val || val.match(/^[ァ-ヶー]*$/)) {
      return true
    }
    return "全角カタカナで入力してください。"
  }

  const is_valid = (rules: string[], value: string): string[] => {
    const errors: string[] = []
    if (rules.includes("katakana")) {
      const response: any = isKataKanaValid(value)
      if (typeof response === "string") errors.push(response)
    }
    if (rules.includes("tel")) {
      const response: any = isTelValid(value)
      if (typeof response === "string") errors.push(response)
    }

    return errors
  }

  return {
    is_valid,
  }
}
