"use client"

import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TipSelectorProps {
  tipPercentage: number
  setTipPercentage: (percentage: number) => void
}

export default function TipSelector({ tipPercentage, setTipPercentage }: TipSelectorProps) {
  const { t } = useTranslation()
  const presetTips = [10, 15, 20]

  return (
    <div className="space-y-3">
      <Label>{t("tipPercentage")}</Label>

      <div className="grid grid-cols-3 gap-2">
        {presetTips.map((preset) => (
          <Button
            key={preset}
            variant={tipPercentage === preset ? "default" : "outline"}
            onClick={() => setTipPercentage(preset)}
            className="h-12"
          >
            {preset}%
          </Button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="custom-tip" className="text-sm">
          {t("custom")}:
        </Label>
        <div className="relative flex-1">
          <Input
            id="custom-tip"
            type="number"
            inputMode="numeric"
            min="0"
            max="100"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(Number(e.target.value) || 0)}
            className="pr-8"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            %
          </span>
        </div>
      </div>
    </div>
  )
}
