// import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "../Buttons/primary";
import { SecondaryButton } from "../Buttons/secondary";

export const ImageCanvas = ({ image, save, close }: ImageCanvasProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [mouseOffset, setMouseOffset] = useState({x: 0, y: 0});
    const [imageSrc, setImageSrc] = useState(image.urls?.regular)

    const onImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        const canvas = document.createElement("canvas");
        const img = new Image();
        
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(event.target as CanvasImageSource, 0, 0, canvas.width, canvas.height);

            const x = event.nativeEvent.offsetX;
            const y = event.nativeEvent.offsetY;

            const clearSize = 40;
            const clearXOffset = (x) - 20;
            const clearYOffset = (y) - 20;

            ctx?.clearRect(clearXOffset, clearYOffset, clearSize, clearSize);
            setImageSrc(canvas.toDataURL());
        }

        img.src = imageSrc || '';
        img.crossOrigin = 'anonymous';
    }

    const onClickSave = () => {
        save({ src: imageSrc, id: image.id });
        close();
    }

    return <div className='flex flex-col bg-opacity-95 bg-gray-600 p-5 pt-6 px-7 z-50 fixed h-full w-full top-0 left-0 items-center overflow-y-scroll' >
        {/* <div className={`absolute w-32 h-10 bg-yellow-200 border-[1px] border-black top-1 left-5`}>x={mouseOffset.x}, y={mouseOffset.y}</div> */}

        <img 
            crossOrigin="anonymous" 
            ref={imageRef} 
            src={imageSrc} 
            alt={image.alt_description}
            className="bg-white"
            onClick={onImageClick} 
            onMouseMove={(e) => setMouseOffset({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})}/>
        
        <div className='flex flex-row justify-end mt-5 w-[90%]'>
            <SecondaryButton onClick={close}>Cancel</SecondaryButton>
            <PrimaryButton classes="px-7 ml-5" onClick={onClickSave}>Save</PrimaryButton>
        </div>
    </div>
}
