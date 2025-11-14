import { Building2Icon } from "lucide-react"
import PageHeader from "../../../components/molecules/PageHeader"

function Org() {
  return (
    <div className="w-full h-full">
      <PageHeader
        icon={Building2Icon}
        title="Organização"
        subtitle="Gerencie as informações da sua organização"
      />
      <div className="flex-1 bg-red-300 mt-2">
        <h1>teste</h1>
      </div>
    </div>
  )
}

export default Org