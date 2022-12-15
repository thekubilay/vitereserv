import { useI18n } from 'vue-i18n'

function getQuery(name:string) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let queryLang = window.navigator.language==="ja" ? "ja" : "en";
switch (getQuery("lang")) {
    case "ja":
        queryLang = "ja";
        break;
    case "en":
        queryLang = "en";
        break;
    case "en-us":
        queryLang = "en";
        break;
}
export const languageSetting = queryLang;

export function vocabularies() {
    const { t } = useI18n({
        locale: languageSetting,
        messages: {
            en: {
                locale: languageSetting,
                metaDescription: `Create and manage a reservation system from an easy-to-use management screen. We support your business efficiency!`,
                metaKeywords: `viterve, viterve, reservation system, reservation management, real estate`,
                year: 'year',
                month: 'month',
                day: 'day',
                calendarServiceWeekdaysText: 'sunday,monday,tuesday,wednesday,thursday,friday,saturday',
                calendarServiceWeekdaysShortText: 'sun,mon,tue,wed,thu,fri,sat',
                roomMaintenanceTitle: "maintenance",
                roomMaintenanceBody: "maintenance",
                roomRegularHoliday: "Regular holiday",
                roomVacancy: "Available",
                roomNoVacancy: "Not available",
                formGoToCalendar: "Calendar",
                formSubmitButton: "Send",
                formRequired: "Required",
                formLimit: "You have reached your reservation limit. Please select another date and time.",
                formErrorTitle: "Error",
                formErrorBody: "An error has occurred.",
                formRequireError: "Please enter",
                thanksTitle: "Thank you for reserving a model room tour.",
                thanksBody1: "",
                thanksBody2: "We will send a confirmation email to the email address you entered <br>so that you can confirm the details of your reservation.<br><br>We look forward to seeing you.",
                footerPrivacyPolicy: "Privacy Policy",
                footerBasicPolicy: "Basic Policy",
                footerCompanyName: "TOKYU LAND CORPORATION"
            },
            ja: {
                locale: languageSetting,
                metaDescription: `使いやすい管理画面から予約システムを作成・管理。業務の効率化をサポート！`,
                metaKeywords: `ビターブ, viterve, 予約システム, 予約管理, 不動産`,
                year: '年',
                month: '月',
                day: '日',
                calendarServiceWeekdaysText: '日曜日,月曜日,火曜日,水曜日,木曜日,金曜日,土曜日',
                calendarServiceWeekdaysShortText: '日,月,火,水,木,金,土',
                roomMaintenanceTitle: "ただいまメンテナンス中です。",
                roomMaintenanceBody: "ご迷惑をおかけしておりますが、<br>今しばらくお待ちください",
                roomRegularHoliday: "定休日",
                roomVacancy: "予約できます",
                roomNoVacancy: "予約できません",
                formGoToCalendar: "カレンダーへ戻る",
                formSubmitButton: "登録",
                formRequired: "必須",
                formLimit: "予約が上限に達しました。他の日時を選択して下さい。",
                formErrorTitle: "エラー",
                formErrorBody: "エラーが発生しました。",
                formRequireError: "ご入力ください。",
                thanksTitle: "ありがとうございました。",
                thanksBody1: "オンライン相談の申し込みが<br class='for-sp'>完了しました。",
                thanksBody2: "ご予約の日時などをメール送信致しましたので<br class='for-sp'>ご確認ください。",
                footerPrivacyPolicy: "個人情報保護ポリシー",
                footerBasicPolicy: "利用規約",
                footerCompanyName: "東急不動産"
            }
        }
    })
    // const msg = computed(() => t('msg'))

    return { t }
}