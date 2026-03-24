import { LuImage, LuX } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

interface EmojiPickerPopupProps {
    icon: string;
    onSelect: (selectedIcon: string) => void;
}

const EmojiPickerPopup = ({ icon, onSelect }: EmojiPickerPopupProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div onClick={() => setIsOpen(true)} className="flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center gap-4 bg-purple-50 text-primary rounded-2xl">
                    {icon ? (
                        <img src={icon} alt="icon" className="w-12 h-12" />
                    ) : (
                        <LuImage className="text-xl" />
                    )}
                </div>

                <p>{icon ? "Edit Icon" : "Select Icon"}</p>
            </div>

            {isOpen && (
                <div className="relative">
                    <button onClick={() => setIsOpen(false)} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer">
                        <LuX />
                    </button>

                    <EmojiPicker open={isOpen} onEmojiClick={(emoji) => {
                        onSelect(emoji?.imageUrl || "");
                    }} />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup