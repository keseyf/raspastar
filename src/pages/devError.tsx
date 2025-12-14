export default function DevErrorRender(message: any){
    return(
        <div className="h-screen flex w-full items-center justify-center flex-col">
            <h1 className="font-bold">
                {message}
            </h1>
        </div>
    )
}