import React from 'react';
import { SvgProps } from 'react-native-svg';
import { 
    HomeIcon, 
    Cog6ToothIcon, 
    Squares2X2Icon, 
    HomeModernIcon, 
    ShieldExclamationIcon, 
    ChatBubbleOvalLeftEllipsisIcon, 
    UserCircleIcon 
} from './Icons';

export const iconComponents: { [key: string]: React.FC<SvgProps> } = {
    HomeIcon,
    Cog6ToothIcon,
    Squares2X2Icon,
    HomeModernIcon,
    ShieldExclamationIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    UserCircleIcon,
};

export const getIcon = (name: string | undefined, props: SvgProps) => {
    if (!name) return <Squares2X2Icon {...props} />;
    const IconComponent = iconComponents[name];
    return IconComponent ? <IconComponent {...props} /> : <Squares2X2Icon {...props} />;
};
