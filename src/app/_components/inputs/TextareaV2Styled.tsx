import TextareaV2, { ITextareaV2 } from "./TextareaV2";



export default function TextareaV2Styled({className, ...params}: ITextareaV2) {
    return (
        <TextareaV2
            className={`py-1 px-2 rounded-md ${className}`}
            {...params}
        />
    )
}