declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';
    export interface IconProps extends SVGProps<SVGSVGElement> {
        color?: string;
        size?: string | number;
        strokeWidth?: string | number;
        absoluteStrokeWidth?: boolean;
    }
    export type Icon = FC<IconProps>;

    export const MapPin: Icon;
    export const Clock: Icon;
    // Add other icons used in the project if necessary, or use a specific import pattern.
}
