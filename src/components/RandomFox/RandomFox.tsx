'use client'

import {random} from "lodash"
import React from "react";
import LazyImage from "../LazyImage/LazyImage";

const randomImg = () => random(1,123)
//const randomImg = () => Math.floor(Math.random() * 123) + 1
const generateId = () => Math.random().toString(36).substr(2, 9)

//lo pasé a global "app.d.ts" para practicar
//type ImageType = { id: string, url: string }
function RandomFox(): JSX.Element {
    const [images, setImages] = React.useState<ImageType[]>([])    

    const addNewFox: React.MouseEventHandler<HTMLButtonElement> = () => {
        const newFox: ImageType = {
            id: generateId(),
            url: `https://randomfox.ca/images/${randomImg()}.jpg`
        }
        setImages([...images, newFox])
    }   

    return (
        <>
            <button className="duration-200 hover:bg-neutral-800 bg-neutral-950 text-neutral-100 rounded-lg py-3 px-5" onClick={addNewFox}>Nuevo zorro</button>
            {
                images.map(({ id, url },index) => (
                    <figure key={id} className="drop-shadow-md w-[500px] h-[360px] rounded-xl overflow-hidden">
                        <LazyImage 
                            className="bg-neutral-200 object-cover w-full h-full" 
                            width={500} 
                            height={500} 
                            src={url}
                            onLazyLoad={(img)=>{
                                console.log(`Image #${index+1} cargada. Nodo:`,img)
                            }}
                        />
                    </figure>
                ))
            }
        </>
    )
}

export default RandomFox;