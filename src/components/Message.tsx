import React from 'react';

interface messageProps {
    isError: boolean;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Message:React.FC<messageProps> = ({isError, isActive, setIsActive}) => {
    return (
        <div 
            className={isError ? (isActive ? 'message message_e message_active' : 'message message_e') : (isActive ? 'message message_r message_active' : 'message message_r')}
            onClick={() => setIsActive(false)}
            >
            {isError 
                ? 
                <div className='message__text'>
                    <span><img src="../images/info.svg" alt="i" /></span>Выберите обязательный ингредиент
                </div>  
                :
                <div className='message__text'>
                    <span><img src="../images/refresh.svg" alt="refresh" /></span>Обновите страницу
                </div>
            }
        </div>
    );
};

export default Message;