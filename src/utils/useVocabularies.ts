import { useI18n } from 'vue-i18n'

const languageSetting = window.navigator.language

export function vocabularies() {
    const { t } = useI18n({
        locale: languageSetting,
        messages: {
            en: {
                locale: languageSetting,
                year: 'year',
                month: 'month',
                day: 'day',
                calendarServiceWeekdaysText: 'sunday,monday,tuesday,wednesday,thursday,friday,saturday',
                calendarServiceWeekdaysShortText: 'sun,mon,tue,wed,thu,fri,sat',
                roomMaintenanceTitle: "maintenance",
                roomMaintenanceBody: "maintenance",
                roomRegularHoliday: "Regular holiday",
                roomVacancy: "vacancy",
                roomNoVacancy: "no vacancy",
                formGoToCalendar: "Go Back",
                formSubmitButton: "submit",
                formRequired: "Required",
                formLimit: "You have reached your reservation limit. Please select another date and time.",
                formErrorTitle: "Error",
                formErrorBody: "An error has occurred.",
                thanksTitle: "Your reservation is complete.",
                thanksBody1: "Thank you for booking to visit the model room.",
                thanksBody2: `To the registered e-mail address so that you can check the reservation details
                We have sent you a confirmation email.<br>
                We are looking forward to seeing you at the model room.<br>
                On the day of the day, please take care of yourself.`,
                footerPrivacyPolicy: "Privacy Policy",
                footerBasicPolicy: "Basic Policy",
                footerCompanyName: "TOKYU LAND CORPORATION"
            },
            ja: {
                locale: languageSetting,
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