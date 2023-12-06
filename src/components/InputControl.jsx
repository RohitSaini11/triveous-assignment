const InputControl=(props)=>{
    return(
        <div className="">
            {/* {props.lable && <label className="p-2">{props.lable}<br/></label>} */}
            <input  className="w-64 p-2  border-2 rounded-md " {...props} required />
        </div>
    );
}

export default InputControl;