'use client'
import Image,{ImageProps} from "next/image";
import React from "react";

type LazyImagesProps = {src: string, onLazyLoad?: (img: HTMLImageElement)=>void}
type Props = LazyImagesProps & Omit<ImageProps, "alt">;

function LazyImage({src, onLazyLoad, ...imgProps}: Props): JSX.Element {
    const node = React.useRef<HTMLImageElement>(null)
    const [currentSrc, setCurrentSrc] = React.useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")
    const [isLazyLoaded, setIsLazyLoaded] = React.useState(false)

    React.useEffect(() => {
        if(isLazyLoaded) return;

        //nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting || !node.current) {
                    return;
                }
                setCurrentSrc(src)
                observer.disconnect()
                setIsLazyLoaded(true)
                onLazyLoad && onLazyLoad(node.current)
            })
        })
        //observe node
        if(node.current) observer.observe(node.current)

        //desconectar
        return ()=>{observer.disconnect()}
    },[src,onLazyLoad,isLazyLoaded])

    return (        
        <Image 
            ref={node}            
            src={currentSrc}                        
            {...imgProps}  
            alt={currentSrc}          
            />        
    );
}

export default LazyImage;