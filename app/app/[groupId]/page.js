import Form from "../../../src/components/Form"
import RecordsContainer from "../../../src/components/RecordsContainer"
import Resume from "../../../src/components/Resume"

export default async function Page({ params }) {
  const groupId = (await params).groupId

  return (
    <div className="container my-3">
      <Form />
      <RecordsContainer />
      <Resume />
    </div>
  )
}