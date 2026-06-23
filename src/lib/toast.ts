import toast from "react-hot-toast";

export const appToast={
    success:(message:string)=>toast.success(message),
    error:(message:string)=>toast.error(message),
    loading:(message:string)=>toast.loading(message),
    warning:(message:string)=>toast(message,{
        icon:"⚠️",
        className:"appToast appToastWarning",
    }),
    info:(message:string)=>toast(message,{
        icon:"ℹ️",
        className:"appToast appToastInfo",
    }),
};