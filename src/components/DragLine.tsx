import React, {useState} from 'react';

interface dragLineProps {
    fullOpen: boolean;
    setFullOpen: React.Dispatch<React.SetStateAction<boolean>>;
    close: () => void;
}

const DragLine: React.FC<dragLineProps> = ({fullOpen, setFullOpen, close}) => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchMove, setTouchMove] = useState(0);

    return (
        <div 
            className='product-id__line'
            onTouchStart={(e) => {
                setTouchStart(e.touches[0].screenY);
            }}
            onTouchMove={(e) => {
                setTouchMove(e.touches[0].screenY);
            }}
            onTouchEnd={() => {
                if(!fullOpen){
                    if(touchMove < touchStart) {
                        setFullOpen(true);
                    } else if(touchMove > touchStart) {
                        close();
                    }
                } else {
                    setFullOpen(false);
                }
                setTouchMove(0);
                setTouchStart(0);
            }} 
        ><span></span></div>
    );
};

export default DragLine;