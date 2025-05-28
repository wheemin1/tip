"\"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import BillInput from "@/components/BillInput"
import TipSelector from "@/components/TipSelector"
import PeopleInput from "@/components/PeopleInput"
import ResultsCard from "@/components/ResultsCard"
import CurrencySelector from "@/components/CurrencySelector"
import LanguageToggle from "@/components/LanguageToggle"
import ResetButton from "@/components/ResetButton"
import ThemeToggle from "@/components/ThemeToggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ShareResult from "@/components/ShareResult"
import AdSenseBanner from "@/components/AdSenseBanner"
import ProVersionToggle from "@/components/ProVersionToggle"
import "./i18n"

export interface CalculationResult {
  billAmount: number
  tipPercentage: number
  numberOfPeople: number
  tipAmount: number
  totalAmount: number
  amountPerPerson: number
  currency: string
}

export default function TipCalculator() {
  const { t } = useTranslation()
  const [billAmount, setBillAmount] = useState<number>(0)
  const [tipPercentage, setTipPercentage] = useState<number>(15)
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1)
  const [currency, setCurrency] = useState<string>("$")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isProVersion, setIsProVersion] = useState<boolean>(false)

  // 브라우저 로케일 기반 통화 감지
  useEffect(() => {
    const locale = navigator.language || "en-US"
    if (locale.startsWith("ko")) {
      setCurrency("₩")
    } else if (locale.startsWith("en-GB")) {
      setCurrency("£")
    } else if (locale.includes("EUR") || locale.startsWith("de") || locale.startsWith("fr")) {
      setCurrency("€")
    } else {
      setCurrency("$")
    }
  }, [])

  // 다크 모드 적용
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // URL 파라미터 기반 초기값 설정
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const bill = urlParams.get("bill")
    const tip = urlParams.get("tip")
    const people = urlParams.get("people")
    const currencyParam = urlParams.get("currency")

    if (bill) setBillAmount(Number.parseFloat(bill))
    if (tip) setTipPercentage(Number.parseFloat(tip))
    if (people) setNumberOfPeople(Number.parseInt(people))
    if (currencyParam) setCurrency(decodeURIComponent(currencyParam))
  }, [])

  // 실시간 계산
  const tipAmount = (billAmount * tipPercentage) / 100
  const totalAmount = billAmount + tipAmount
  const amountPerPerson = totalAmount / numberOfPeople

  const handleReset = () => {
    setBillAmount(0)
    setTipPercentage(15)
    setNumberOfPeople(1)
  }

  const calculationResult: CalculationResult = {
    billAmount,
    tipPercentage,
    numberOfPeople,
    tipAmount,
    totalAmount,
    amountPerPerson,
    currency,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          <div className="flex gap-2">
            <LanguageToggle />
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </div>

        {/* Pro Version Toggle */}
        <ProVersionToggle isProVersion={isProVersion} setIsProVersion={setIsProVersion} />

        {/* 메인 계산기 카드 */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {t("calculator")}
              <CurrencySelector currency={currency} setCurrency={setCurrency} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <BillInput billAmount={billAmount} setBillAmount={setBillAmount} currency={currency} />

            <TipSelector tipPercentage={tipPercentage} setTipPercentage={setTipPercentage} />

            <PeopleInput numberOfPeople={numberOfPeople} setNumberOfPeople={setNumberOfPeople} />

            <ResultsCard
              billAmount={billAmount}
              tipAmount={tipAmount}
              totalAmount={totalAmount}
              amountPerPerson={amountPerPerson}
              numberOfPeople={numberOfPeople}
              currency={currency}
            />

            <div className="flex gap-2">
              <ResetButton onReset={handleReset} />
              <ShareResult result={calculationResult} />
            </div>
          </CardContent>
        </Card>

        {/* AdSense Banner */}
        <AdSenseBanner />
      </div>
    </div>
  )
}
