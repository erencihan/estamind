'use client'

type Props = {
  userName: string
  isLite: boolean
  creditsLeft: number
}

export function DashboardWelcome({ userName, isLite, creditsLeft }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-xl sm:text-2xl font-dm font-bold mb-2 break-words">Hoş Geldiniz, {userName} 👋</h1>
      <p className="text-gray-400">
        {isLite
          ? `Lite planındasınız. Bu ay ${creditsLeft} analiz hakkınız var. Daha fazlası için paketi yükseltin.`
          : `Platform üzerinde 24 rapor oluşturdunuz. 3 yeni rapor hazır.`}
      </p>
    </div>
  )
}
