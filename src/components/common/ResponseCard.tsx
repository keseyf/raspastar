export default function ResponseCard({message, bg}: any){
    return(
        <div className={`fixed flex rounded animate-easeup p-5 flex-col justify-center items-center ${bg} text-white text-center top-10 left-1/2 -translate-x-1/2 m-5 z-10000`}>
            <p>
                {`${message}`}
            </p>
        </div>
    )
}