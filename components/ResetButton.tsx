"use client"

import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface ResetButtonProps {
  onReset: () => void
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  const { t } = useTranslation()

  return (
    <Button variant="outline" onClick={onReset} className="w-full">
      <RotateCcw className="h-4 w-4 mr-2" />
      {t("reset")}
    </Button>
  )
}
