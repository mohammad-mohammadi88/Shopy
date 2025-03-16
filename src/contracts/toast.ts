import { Bounce, toast } from "react-toastify";

export function showAuthToast(
    isInfo:boolean,
    showMessage:string,
    status:number |string,
    successStatus:number|string,
    errors:any
) :void {
    if(status === successStatus){
        toast[isInfo ? 'info' : 'success'](showMessage,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })
    } else {
        if(status === 500 || !Array.isArray(errors)){
            toast.error(errors,{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        } else {
            errors?.forEach((error:string)=>{
                toast.error(error,{
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            })
        }
      
    }
}

export const updateToast = (toastName:string,render:string,type:any='success') => toast.update(toastName,{
    render,
    type,
    isLoading: false,
    autoClose: 5000,
    pauseOnHover: true,
    closeButton:true,
    draggable: true,
    progress: undefined,
})