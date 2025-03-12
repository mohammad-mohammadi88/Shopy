'use client'
import { Bounce, toast } from "react-toastify";

export function showToast(
    isInfo:boolean,
    showMessage:string,
    status:number,
    successStatus:number,
    errors:any
) :void {
    if(status === successStatus){
        toast[isInfo ? 'info' : 'success']( showMessage, {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    } else {
        if(status === 500 || !Array.isArray(errors)){
            toast.error(errors, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            errors?.forEach((error:string)=>{
                toast.error(error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
        }
      
    }
}
