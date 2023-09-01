import Page from "../components/UI/Page"

const PageNotFound = () => {
  return (
    <Page className="h-full flex-1 flex justify-center items-center">
      <h2 className="text-5xl text-red-400 font-semibold block my-auto relative text-center">
        <span className="text-red-500 font-bold">404</span> Page Not Found
      </h2>
    </Page>
  )
}
export default PageNotFound
