import React from "react"
import InputV2, { IInputV2 } from "./InputV2";



const InputV2Styled = React.memo((params: IInputV2) => (
    <InputV2
        {...params}
        className={`px-2 py-1 rounded-sm w-full ${params.className}`}
    />
)
)


export default InputV2Styled;