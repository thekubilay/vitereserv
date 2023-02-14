import { useI18n } from 'vue-i18n'

let queryLang = "ja";
function languageDistributor(val:string|null){
    switch (val) {
        case "ja":
            queryLang = "ja";
            break;
        case "en":
            queryLang = "en";
            break;
        case "zh":
            queryLang = "zh";
            break;
    }
}

//for Browser language setting
languageDistributor(window.navigator.language.slice( 0, 2 ));

//for URL param
const params = new URLSearchParams(window.location.search);
languageDistributor(params.get("lang"));


// if(queryLang === "zh") {
//     const fontFace = new FontFace(
//         'Noto Sans SC',
//         'url(/fonts/NotoSansSC-Regular.otf)',
//         { style: 'normal'}
//     );
//     fontFace.load().then(function(loadedFace){
//         /// フォント読み込み成功
//         /// body要素全体にそれを適用する
//         document.fonts.add(loadedFace);
//         document.body.style.fontFamily = '"Noto Sans SC"';
//     }).catch(function(e){
//         /// フォント読み込み失敗
//         console.error('fontError');
//     });
// }

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
                roomMaintenanceBody: "We apologize for the inconvenience. <br>Please wait for a moment.",
                roomRegularHoliday: "Regular holiday",
                roomVacancy: "Available",
                roomNoVacancy: "Not available",
                formGoToCalendar: "Calendar",
                formSubmitButton: "Send",
                formRequired: "Required",
                formLimit: "The reservation has reached its limit. Please select another date and time.",
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
            zh: {
                locale: languageSetting,
                metaDescription: `Create and manage a reservation system from an easy-to-use management screen. We support your business efficiency!`,
                metaKeywords: `viterve, viterve, reservation system, reservation management, real estate`,
                year: 'year',
                month: 'month',
                day: 'day',
                calendarServiceWeekdaysText: 'sunday,monday,tuesday,wednesday,thursday,friday,saturday',
                calendarServiceWeekdaysShortText: 'sun,mon,tue,wed,thu,fri,sat',
                roomMaintenanceTitle: "maintenance",
                roomMaintenanceBody: "We apologize for the inconvenience. <br>Please wait for a moment.",
                roomRegularHoliday: "定休日",
                roomVacancy: "可預約",
                roomNoVacancy: "不可預約",
                formGoToCalendar: "日曆",
                formSubmitButton: "提交",
                formRequired: "必須",
                formLimit: "预订已达到其限制。请选择另一个日期和时间。",
                formErrorTitle: "Error",
                formErrorBody: "An error has occurred.",
                formRequireError: "请您输入",
                thanksTitle: "多謝您預約參觀示範單位。",
                thanksBody1: "",
                thanksBody2: "",
                footerPrivacyPolicy: "個人資料保護政策",
                footerBasicPolicy: "使用條款",
                footerCompanyName: "東急不動産"
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