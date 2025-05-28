"use client"

import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export default function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ko" : "en"
    i18n.changeLanguage(newLang)
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleLanguage} className="h-10 w-10">
      <Languages className="h-4 w-4" />
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
