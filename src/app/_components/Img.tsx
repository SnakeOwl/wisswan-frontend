import Image, { ImageProps } from "next/image";

export default function Img(props: ImageProps) {
    const newSrc = process.env.NEXT_PUBLIC_API_STORAGE! + props.src;
    
    return (
        <Image
            {...props}
            src={newSrc}
        />
    )
}