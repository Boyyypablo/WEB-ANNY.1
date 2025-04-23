
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
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border-none group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg relative pr-10",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: "absolute top-1/2 right-3 -translate-y-1/2 text-red-500 hover:bg-red-50 rounded-full p-1.5"
        },
        unstyled: true,
        success: (value) => ({
          icon: <Check className="text-anny-green" size={20} />,
          ...value,
        })
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
