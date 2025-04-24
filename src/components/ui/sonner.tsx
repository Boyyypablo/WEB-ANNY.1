
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"
import { Check, X } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton={true}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg relative pr-10 flex items-center justify-start", 
          description: "group-[.toast]:text-muted-foreground ml-2 flex-grow",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground mr-2",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: "absolute top-1/2 right-2 -translate-y-1/2 hover:bg-gray-100 rounded-full p-1",
          icon: "mr-2" // Add some margin to the right of the icon
        }
      }}
      // Only use the supported icon types from the Sonner library
      icons={{
        success: <Check size={16} />
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
