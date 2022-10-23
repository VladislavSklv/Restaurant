import CapsuleTabs, { CapsuleTabProps as AntCapsuleTabProps } from 'antd-mobile/es/components/capsule-tabs';
import React from 'react';

export type CapsuleTabProps = AntCapsuleTabProps & {
    onClick?: () => void;
}

const MyCapsuleTab = CapsuleTabs.Tab;

const AntCapsuleTab:React.FC<CapsuleTabProps> = ({onClick, ...props}) => {
    const tab = (
        <MyCapsuleTab {...props}/>
    )
    return tab;
};

export default AntCapsuleTab;