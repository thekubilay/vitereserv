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
                formGoToCalendar: "Go Back",
                thanksTitle: "Thank you very much.",
                thanksBody1: "very very thank you.",
                thanksBody2: "See you soon.",
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
                formGoToCalendar: "カレンダーへ戻る",
                thanksTitle: "ありがとうございました。",
                thanksBody1: "オンライン相談の申し込みが<br class='for-sp'>完了しました。",
                thanksBody2: "ご予約の日時などをメール送信致しましたので<br class='for-sp'>ご確認ください。",
            }
        }
    })
    // const msg = computed(() => t('msg'))

    return { t }
}