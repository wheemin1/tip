"\"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"
import AdSenseBanner from "@/components/AdSenseBanner"
import BillInput from "@/components/BillInput"
import CurrencySelector from "@/components/CurrencySelector"
import LanguageToggle from "@/components/LanguageToggle"
import PeopleInput from "@/components/PeopleInput"
import ProVersionToggle from "@/components/ProVersionToggle"
import ResetButton from "@/components/ResetButton"
import ResultsCard from "@/components/ResultsCard"
import ShareResult from "@/components/ShareResult"
import ThemeToggle from "@/components/ThemeToggle"
// Define the CalculationResult type
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
  const [billAmount, setBillAmount] = useState<number>(0)
  const [tipPercentage, setTipPercentage] = useState<number>(15)
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1)
  const [currency, setCurrency] = useState<string>("$")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isProVersion, setIsProVersion] = useState<boolean>(false)

  const { t } = useTranslation()

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [isDarkMode])

  const handleReset = () => {
    setBillAmount(0)
    setTipPercentage(15)
    setNumberOfPeople(1)
  }

  const tipAmount = (billAmount * tipPercentage) / 100
  const totalAmount = billAmount + tipAmount
  const amountPerPerson = totalAmount / numberOfPeople

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
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          <div className="flex gap-2">
            <LanguageToggle />
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </div>

        {/* Ad Banner */}
        <AdSenseBanner />

        {/* Main Calculator */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {t("calculator")}
              <CurrencySelector currency={currency} setCurrency={setCurrency} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bill Input */}
            <BillInput billAmount={billAmount} setBillAmount={setBillAmount} currency={currency} />

            {/* Tip Selector */}
            <TipSelector tipPercentage={tipPercentage} setTipPercentage={setTipPercentage} />

            {/* People Input */}
            <PeopleInput numberOfPeople={numberOfPeople} setNumberOfPeople={setNumberOfPeople} />

            {/* Results */}
            <ResultsCard
              billAmount={billAmount}
              tipAmount={tipAmount}
              totalAmount={totalAmount}
              amountPerPerson={amountPerPerson}
              numberOfPeople={numberOfPeople}
              currency={currency}
            />

            {/* Action Buttons */}
            <div className="flex gap-2">
              <ResetButton onReset={handleReset} />
              <ShareResult result={calculationResult} />
            </div>
          </CardContent>
        </Card>

        {/* Pro Version */}
        <ProVersionToggle isProVersion={isProVersion} setIsProVersion={setIsProVersion} />
      </div>
    </div>
  )
}
