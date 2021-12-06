import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import arrowUp from './arrowUp.svg';
import menuClosed from './menuClosed.svg';
import menuOpened from './menuOpened.svg';

export const icons = {
	arrowUp,
	menuClosed,
	menuOpened,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconName;
	appearance: 'primary' | 'white';
}