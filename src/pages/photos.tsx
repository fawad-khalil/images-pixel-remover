import { IMAGES_PULL_LIMIT } from "@/constants/common";
import { GET_UNSPLASH_RANDOM_IMAGES } from "@/constants/urls";
import axios from "axios";
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
        // const response = await axios({url: `${GET_UNSPLASH_RANDOM_IMAGES}`, params: {
        //     count: IMAGES_PULL_LIMIT,
        //     client_id: "BAwhgWBBg6EBh87Q2X5AkgEtVM6Z4yhA2RBGKBNSVKg"
        // }});
        setImages(ImagesMock);
    }

    useEffect(() => {
        loadImages();
    }, []);

    const openImageEditor = ({ image }: { image: Partial<ImageType> }) => {
        setImageInEdit(image);
    }

    const saveImage = (imageInfo: {src: string, id: string}) => {
        const index = images?.findIndex((image) => image.id === imageInfo.id);

        if (images && index && index >= 0) {
            images[index] = {...images[index], urls: { ...images[index].urls, regular: imageInfo.src || '' }}
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
