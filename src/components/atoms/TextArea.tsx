import { type ComponentProps } from 'react'
import { cn } from '../../app/lib/utils'

interface TextAreaProps extends ComponentProps<"textarea"> {}

function TextArea({className, placeholder, id, ...props}: TextAreaProps) {
  return (
    <div>
      <label htmlFor={id} className="text-gray-600 text-sm">
        {placeholder}
      </label>
      <textarea  {...props} className={cn("w-full border border-gray-300 rounded-lg outline-none p-3", className)}/>
    </div>
  )
}

export default TextArea