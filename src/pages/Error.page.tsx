import Page from "../components/UI/Page"

const Error = () => {
  return (
    <Page className="h-full flex-1 flex justify-center items-center">
      <h2 className="text-5xl text-red-400 font-semibold block my-auto relative text-center">
        <span className="text-red-500 font-bold">Error</span> Something went
        wrong, check browser console for more detailed information
      </h2>
    </Page>
  )
}
export default Error
