import { SidebarIcon } from "lucide-react"

function Sidebar() {
  return (
    <div className="bg-red-300 w-16 flex flex-col items-center pt-2">
      <button><SidebarIcon size={18}/></button>
      <div className="bg-blue-300 h-full w-full p-2 flex flex-col items-start">
        <p>teste</p>
      </div>
    </div>
  )
}

export default Sidebar