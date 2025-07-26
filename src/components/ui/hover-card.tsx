
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"
import { useAccessibilityContext } from "@/components/providers/AccessibilityProvider"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { focus, screenReader } = useAccessibilityContext();

  const handleFocus = React.useCallback((event: React.FocusEvent) => {
    focus.setFocusedElement(event.currentTarget as HTMLElement);
    // Announce hover card availability
    screenReader.announce("Additional information available");
  }, [focus, screenReader]);

  return (
    <HoverCardPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium",
        "ring-offset-background transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "hover:bg-accent hover:text-accent-foreground",
        "motion-reduce:transition-none",
        className
      )}
      onFocus={handleFocus}
      {...props}
    >
      {children}
    </HoverCardPrimitive.Trigger>
  );
});
HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  const { focus, screenReader } = useAccessibilityContext();

  React.useEffect(() => {
    // Announce when hover card opens
    const timer = setTimeout(() => {
      screenReader.announce("Additional information displayed");
    }, 100);
    
    return () => clearTimeout(timer);
  }, [screenReader]);

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "motion-reduce:animate-none motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
        className
      )}
      role="tooltip"
      {...props}
    />
  );
});
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
