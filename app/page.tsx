export type CalculationResult = {
  billAmount: number
  tipPercentage: number
  numberOfPeople: number
  tipAmount: number
  totalAmount: number
  amountPerPerson: number
  currency: string
}
;('"use client')

import { useState, useEffect } from "react"
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
import TipSelector from "@/components/TipSelector"
import { useTranslation } from "react-i18next"

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<number>(0)
  const [tipPercentage, setTipPercentage] = useState<number>(15)
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1)
  const [currency, setCurrency] = useState<string>("$")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isProVersion, setIsProVersion] = useState<boolean>(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [isDarkMode])

  const tipAmount = (billAmount * tipPercentage) / 100
  const totalAmount = billAmount + tipAmount
  const amountPerPerson = totalAmount / numberOfPeople

  const resetValues = () => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <div className="container mx-auto max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <div className="space-x-2 flex items-center">
            <LanguageToggle />
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </div>

        <ProVersionToggle isProVersion={isProVersion} setIsProVersion={setIsProVersion} />

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t("calculator")}</h2>
              <CurrencySelector currency={currency} setCurrency={setCurrency} />
            </div>

            <BillInput billAmount={billAmount} setBillAmount={setBillAmount} currency={currency} />
            <TipSelector tipPercentage={tipPercentage} setTipPercentage={setTipPercentage} />
            <PeopleInput numberOfPeople={numberOfPeople} setNumberOfPeople={setNumberOfPeople} />
          </div>

          <ResultsCard
            billAmount={billAmount}
            tipAmount={tipAmount}
            totalAmount={totalAmount}
            amountPerPerson={amountPerPerson}
            numberOfPeople={numberOfPeople}
            currency={currency}
          />

          <div className="flex space-x-2">
            <ResetButton onReset={resetValues} />
            <ShareResult result={calculationResult} />
          </div>
        </div>

        <AdSenseBanner />
      </div>
    </div>
  )
}
