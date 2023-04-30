import Image from "next/image";
import { useEffect, useState } from "react";
import ImagesMock from "../__mock__/images.json";
import { ImageCanvas } from "@/components/ImageCanvas";
import { SecondaryButton } from "@/components/Buttons/secondary";
import { PrimaryButton } from "@/components/Buttons/primary";
import { RequestEditForm } from "@/components/RequestEdit";

export default function Photos() {
    const [images, setImages] = useState<Partial<ImageType>[]>();
    const [ imageInEdit, setImageInEdit ] = useState<Partial<ImageType> | null>();
    const [ requestEditImage, setRequestEditImage ] = useState<Partial<ImageType> | null>();

    const loadImages = async () => {
        setImages(ImagesMock);
    }

    useEffect(() => {
        loadImages();
    }, []);

    const openImageEditor = ({ image }: { image: Partial<ImageType> }) => {
        setImageInEdit(image);
    }

    const saveImage = (imageInfo: {src: string, id: string}) => {
        const index = images ? images.findIndex((image) => image.id === imageInfo.id) : -1;
        
        if (images && index >= 0) {
            images[index] = {
                ...images[index], 
                urls: { ...images[index].urls, 
                    oldRegular: images[index].urls?.oldRegular ? images[index].urls?.oldRegular : images[index].urls?.regular,
                    regular: imageInfo.src || '' 
                }}
            
            setImages([...images]);
        }
    }

    const openRequestEditForm = ({image}: { image: Partial<ImageType> }) => {
        setRequestEditImage(image);
    }

    return (<div className="flex flex-row h-full flex-1 w-full flex-wrap gap-5 my-10 justify-between px-7">
        {images?.map((image) => {
            return <div key={image.id} className="group max-w-[22%]">
                        <Image
                        className="w-auto h-auto bg-white"
                        src={image?.urls?.regular || ""} 
                        alt={image.alt_description || ""} 
                        width = {200}
                        height={175} />

                        <div className="mt-5 hidden justify-between group-hover:visible group-hover:flex">
                            <SecondaryButton onClick={() => openRequestEditForm({image})}>Request Edit</SecondaryButton>
                            <PrimaryButton 
                                classes="ml-5"
                                onClick={() => openImageEditor({image})}>
                                    Edit
                            </PrimaryButton>
                        </div>
                        
            </div>
            
            // return <Image src={image?.urls?.regular} alt={image.alt_description} />
        })}

        {imageInEdit && <ImageCanvas image={imageInEdit} save={saveImage} close={() => setImageInEdit(null)} />}
        {requestEditImage && <RequestEditForm image={requestEditImage} close={() => setRequestEditImage(null)}/>}
    </div>);
}
