"use client"

import Modal from "@/components/Modal";
import Image from "next/image";

interface Props {
  src: string;
  isOpen: boolean;    
  onClose: () => void;
}

const ImageModal = ({ src, isOpen, onClose }: Props) => {

  if (!src) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image 
        src={src}
        alt="Image"
        fill
        className="object-cover"/>
      </div>
    </Modal>
  )
}

export default ImageModal