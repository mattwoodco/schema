import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function AppFooter() {
  return (
    <footer className="max-w-3xl mx-auto flex justify-center gap-2 md:gap-5 items-center py-3 w-full">
      <div className="flex-1 flex justify-center">
        <a href="/dashboard">Artists</a>
      </div>
      <div className="flex-1 flex justify-center">
        <div>
          &copy;
          {new Date().getFullYear()}
          <span className="pl-2">Bouquet, LLC</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <a href="/terms">Legal</a>
      </div>
      <div className="flex-1 flex justify-center">
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
