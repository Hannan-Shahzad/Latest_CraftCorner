declare module 'react-slick' {
    import { Component } from 'react';

    export interface Settings {
        dots?: boolean;
        infinite?: boolean;
        speed?: number;
        slidesToShow?: number;
        slidesToScroll?: number;
        autoplay?: boolean;
        autoplaySpeed?: number;
        arrows?: boolean;
        centerMode?: boolean;
        // Add other settings from the react-slick documentation as needed
    }

    export default class Slider extends Component<Settings> {}
}
