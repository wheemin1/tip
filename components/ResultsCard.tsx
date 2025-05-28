"use client"

import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ResultsCardProps {
  billAmount: number
  tipAmount: number
  totalAmount: number
  amountPerPerson: number
  numberOfPeople: number
  currency: string
}

export default function ResultsCard({
  billAmount,
  tipAmount,
  totalAmount,
  amountPerPerson,
  numberOfPeople,
  currency,
}: ResultsCardProps) {
  const { t } = useTranslation()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  if (billAmount === 0) {
    return (
      <Card className="bg-gray-50 dark:bg-gray-800">
        <CardContent className="pt-6">
          <p className="text-center text-gray-500 dark:text-gray-400">{t("enterBillAmount")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
      <CardHeader>
        <CardTitle className="text-lg">{t("results")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t("tipAmount")}</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {currency}
              {formatCurrency(tipAmount)}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t("totalAmount")}</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {currency}
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </div>

        <div className="text-center border-t pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t("perPerson")}</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {currency}
            {formatCurrency(amountPerPerson)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("splitBetween")} {numberOfPeople} {numberOfPeople === 1 ? t("person") : t("people")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
