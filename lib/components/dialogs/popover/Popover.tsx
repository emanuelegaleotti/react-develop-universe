import './popover.scss'
import { cloneElement, type ReactElement, type ReactNode, useId, useState } from 'react'
import clsx from 'clsx'

export type RduPopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

type RduPopoverTriggerProps = {
  popoverTarget?: string
  'aria-expanded'?: boolean
  'aria-controls'?: string
}

type RduPopoverProps = {
  trigger: ReactElement<RduPopoverTriggerProps>
  children: ReactNode
  id?: string
  placement?: RduPopoverPlacement
  className?: string
  onToggle?: (open: boolean) => void
}

// Native Popover API (light dismiss, Esc, top layer): the invoker (popovertarget) is the implicit anchor
// of the popover, which is placed with CSS anchor positioning
export function RDU_Popover ({ trigger, children, id, placement = 'bottom', className, onToggle }: RduPopoverProps) {
  const generatedId = useId().replace(/:/g, '')
  const popoverId = id ?? `rdu-popover-${generatedId}`
  const [open, setOpen] = useState(false)

  return (
    <>
      {cloneElement(trigger, {
        popoverTarget: popoverId,
        'aria-expanded': open,
        'aria-controls': popoverId,
      })}
      <div id={popoverId}
           popover="auto"
           className={clsx('rdu-popover', className)}
           data-placement={placement}
           onToggle={event => {
             const isOpen = (event.nativeEvent as ToggleEvent).newState === 'open'
             setOpen(isOpen)
             onToggle?.(isOpen)
           }}>
        {children}
      </div>
    </>
  )
}
