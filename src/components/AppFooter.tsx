import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function AppFooter() {
  return (
    <footer className="mt-auto mx-auto flex lg:justify-center gap-2 md:gap-5 lg:items-center pt-20 w-full md:py-20 pb-2 lg:pb-8 flex-wrap flex-col lg:flex-row px-6 lg:px-0 lg:max-w-6xl">
      {/* <div className="flex-1 flex lg:justify-center">
        <a href="/dashboard">Admin Settings</a>
      </div> */}

      <div className="flex-1 flex lg:justify-center">
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
