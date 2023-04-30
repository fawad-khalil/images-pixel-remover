import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../Buttons/primary";
import { SecondaryButton } from "../Buttons/secondary";
import { trpc } from "@/utils/trpc";

export const RequestEditForm = ({ image, close }: RequestEditProps) => {
    const saveRequest = trpc.editRequest.useMutation();
    const [editRequestDesc, setEditRequestDesc] = useState('');

    const onSave = async () => {

        const data = {image: image.urls?.regular || '', editDescription: editRequestDesc};

        saveRequest.mutate(data);
    }

    const onChangeText: React.ChangeEventHandler<HTMLTextAreaElement> = ({target: { value }}) => {
        setEditRequestDesc(value);
    }

    useEffect(() => {
        if (saveRequest.isSuccess) {
            close();
        }
    }, [saveRequest]);

    return <div className="fixed flex flex-col flex-1 h-full w-full justify-center items-center flex-wrap top-0 left-0 bg-opacity-95 bg-gray-600 p-5">
        <div className="font-bold text-lg flex w-[20.58%] justify-start items-start mb-5">
            Request Edit
        </div>

        <img src={image.urls?.regular} width={250} height={200} />

        <textarea className='mt-7 px-1 w-[20.5%]' placeholder="Describe here..." onChange={onChangeText}/>

        <div className='flex flex-row justify-end mt-5 w-[21%]'>
            {/* {saveRequest.isLoading && <div>Saving...</div>}

            {saveRequest.isError && <div>Error: {saveRequest.error.message}</div>} */}

            <SecondaryButton onClick={close}>Cancel</SecondaryButton>

            <PrimaryButton classes="ml-5" onClick={onSave}>Save</PrimaryButton>
        </div>
    </div>
};
