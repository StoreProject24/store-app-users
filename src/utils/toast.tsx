
import { JSX } from "react"
import { toast } from "react-hot-toast"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

export const toastAppSuccess = (message: string, icon?: JSX.Element | string | null) =>
  toast.success(message, { icon })
export const toastAppError = (message: string, icon?: JSX.Element | string | null) =>
  toast.error(message, {
    icon,
  })
export const toastAppLoading = (message: string) => toast.loading(message)
export const toastAppInfo = (message: string) => {
  toast(message, {
    icon: <InformationCircleIcon className="w-6 h-6 text-blue-400" />,
    style: {
      borderRadius: "10px",
      background: "#fff",
      color: "#000",
    },
    className: "font-poppins text-sm text-dark",
    position: "top-right",
  })
}
