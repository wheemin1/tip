import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      title: "Tip Calculator",
      calculator: "Bill Calculator",
      billAmount: "Bill Amount",
      tipPercentage: "Tip Percentage",
      numberOfPeople: "Number of People",
      custom: "Custom",
      results: "Results",
      tipAmount: "Tip Amount",
      totalAmount: "Total Amount",
      perPerson: "Per Person",
      splitBetween: "Split between",
      person: "person",
      people: "people",
      reset: "Reset",
      enterBillAmount: "Enter bill amount to see results",
    },
  },
  ko: {
    translation: {
      title: "팁 계산기",
      calculator: "청구서 계산기",
      billAmount: "총 청구 금액",
      tipPercentage: "팁 비율",
      numberOfPeople: "인원수",
      custom: "사용자 정의",
      results: "결과",
      tipAmount: "팁 금액",
      totalAmount: "총 금액",
      perPerson: "1인당",
      splitBetween: "분할 인원",
      person: "명",
      people: "명",
      reset: "재설정",
      enterBillAmount: "청구 금액을 입력하여 결과를 확인하세요",
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
