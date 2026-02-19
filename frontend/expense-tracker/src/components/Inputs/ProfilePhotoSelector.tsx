import React, { useRef, useState, type ChangeEvent } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

interface ProfilePhotoSelectorProps {
    image: string | null | File;
    setImage: (image: string | null | File) => void;
}

const ProfilePhotoSelector: React.FC<ProfilePhotoSelectorProps> = ({ image, setImage }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(undefined);
    }

    const onChooseFile = () => {
        inputRef.current?.click()
    }

    return (
        <div className='flex justify-center mb-6'>
            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                <div className='w-30 h-30 flex items-center justify-center bg-purple-100 rounded-full relative'>
                    <LuUser className='text-4xl text-primary' />
                    <button
                        type='button'
                        className='w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img src={previewUrl} alt="profile photo" className='w-30 h-30 rounded-full object-cover' />
                    <button
                        type='button'
                        className='w-10 h-10 flex items-center justify-center bg-red-500 text-white absolute -bottom-1 -right-1 rounded-full'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector