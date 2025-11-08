import { EyeIcon, Trash } from 'lucide-react'
import type { Order } from '../../../../app/entities/Order'
import Button from '../../../../components/atoms/Button'

interface HistoryActionComponentProps {
  order?: Order
}

function HistoryActionComponent({ order }: HistoryActionComponentProps) {
  return (
    <div className='flex gap-1.5 items-center'>
      <Button size="icon" variant="secondary" className='text-gray-500 hover:text-gray-400'>
        <EyeIcon size={18}/>
      </Button>
      <Button size="icon" variant="secondary" className='text-red-700 hover:text-red-600'>
        <Trash size={18}/>
      </Button>
    </div>
  )
}

export default HistoryActionComponent