import { ReactNode } from "react"

import { IconXmark } from "../icons"

// eslint-disable-next-line react-refresh/only-export-components
export enum EIconType {
	SVG = "svg"
}

const getIconComponentSVG = (iconName: string): ReactNode => {
	switch (iconName) {
		case "x-mark": {
			return <IconXmark />
		}
		default: {
			return <></>
		}
	}
}

const getIconComponent = (iconType: EIconType, iconName: string) => {
	switch (iconType) {
		case EIconType.SVG: {
			return getIconComponentSVG(iconName)
		}
		default: {
			return <></>
		}
	}
}

interface IAtmIconProps {
	iconType: EIconType | undefined
	iconName: string | undefined
}

export const AtmIcon = ({ iconType, iconName }: IAtmIconProps) => {
	if (!iconType || !iconName) return <></>
	return getIconComponent(iconType, iconName)
}
