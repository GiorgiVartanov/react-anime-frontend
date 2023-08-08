import { ReactComponent as Github } from "../../assets/icons/github.svg"

const Footer = () => {
  return (
    <div className="dark:bg-sp-gray bg-sp-white text-center py-3 px-2 shadow-sm relative z-20 text-white">
      <a
        href="https://github.com/GiorgiVartanov/react-anime-frontend"
        className="block w-fit mx-auto transition-all ease-in-out duration-200 hover:opacity-80"
        target="_blank"
      >
        <Github
          width={32}
          height={32}
          fill={"#e91e63"}
        />
      </a>
    </div>
  )
}
export default Footer
