import HeaderNavigationLink from "../Navigation/HeaderNavigationLink"
import Navigation from "./Navigation"

const Header = () => {
  return (
    <header className="dark:bg-sp-gray font-bold dark:text-white text-sp-gray bg-sp-white py-1 shadow-sm relative z-30">
      <div className="m-auto max-w-7xl px-2 py-1 flex justify-between">
        <HeaderNavigationLink
          to="/"
          className="flex flex-col justify-center"
        >
          <h1 className="text-sp-main font-extrabold">
            AX
            <span className="dark:text-white text-sp-black font-extrabold">
              P
            </span>
          </h1>
        </HeaderNavigationLink>
        <Navigation />
      </div>
    </header>
  )
}
export default Header
