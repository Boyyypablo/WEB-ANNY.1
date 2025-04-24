
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"
import { Check } from "lucide-react"

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
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg relative pr-10 flex items-center pl-8", 
          description: "group-[.toast]:text-muted-foreground ml-8 flex-grow",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground mr-2",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: "absolute top-1/2 right-2 -translate-y-1/2 hover:bg-gray-100 rounded-full p-1",
          icon: "mr-8"
        }
      }}
      // Configure toast behavior to prevent stacking
      duration={5000}  // 5 seconds display time
      expand={false}   // Don't expand on hover
      position="top-center"
      richColors={true}
      // Limit the number of toasts that can appear at once
      visibleToasts={1}
      // Only use the supported icon types from the Sonner library
      icons={{
        success: <Check size={19} className="text-green-500" />
      }}
      {...props}
    />
  )
}

// Create a debounced version of the toast function to prevent rapid firing
// Track toast timestamps to implement cooldown
const toastTimers: Record<string, number> = {};
const TOAST_COOLDOWN = 5000; // 5 seconds cooldown

// Wrapper for the toast function that implements cooldown
const debouncedToast = {
  success: (message: string, options = {}) => {
    const now = Date.now();
    const key = `success-${message}`;
    if (!toastTimers[key] || (now - toastTimers[key] > TOAST_COOLDOWN)) {
      toastTimers[key] = now;
      return toast.success(message, options);
    }
    return undefined;
  },
  error: (message: string, options = {}) => {
    const now = Date.now();
    const key = `error-${message}`;
    if (!toastTimers[key] || (now - toastTimers[key] > TOAST_COOLDOWN)) {
      toastTimers[key] = now;
      return toast.error(message, options);
    }
    return undefined;
  },
  info: (message: string, options = {}) => {
    const now = Date.now();
    const key = `info-${message}`;
    if (!toastTimers[key] || (now - toastTimers[key] > TOAST_COOLDOWN)) {
      toastTimers[key] = now;
      return toast.info(message, options);
    }
    return undefined;
  },
  warning: (message: string, options = {}) => {
    const now = Date.now();
    const key = `warning-${message}`;
    if (!toastTimers[key] || (now - toastTimers[key] > TOAST_COOLDOWN)) {
      toastTimers[key] = now;
      return toast.warning(message, options);
    }
    return undefined;
  }
};

// Export both the original toast and our debounced version
export { Toaster, toast, debouncedToast }
