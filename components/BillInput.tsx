"use client"

import type React from "react"

import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BillInputProps {
  billAmount: number
  setBillAmount: (amount: number) => void
  currency: string
}

export default function BillInput({ billAmount, setBillAmount, currency }: BillInputProps) {
  const { t } = useTranslation()

  const formatNumber = (value: string) => {
    const cleanValue = value.replace(/[^\d.]/g, "")
    const parts = cleanValue.split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2)
    }
    return parts.join(".")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formatNumber(value)
    const numericValue = Number.parseFloat(formatted.replace(/,/g, "")) || 0
    setBillAmount(numericValue)
  }

  const displayValue = billAmount > 0 ? formatNumber(billAmount.toString()) : ""

  return (
    <div className="space-y-2">
      <Label htmlFor="bill-amount">{t("billAmount")}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          {currency}
        </span>
        <Input
          id="bill-amount"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={displayValue}
          onChange={handleChange}
          className="pl-8 text-lg"
        />
      </div>
    </div>
  )
}
