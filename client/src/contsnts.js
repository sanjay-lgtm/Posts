import { RxPencil2 } from "react-icons/rx";
import { SiGnuprivacyguard } from "react-icons/si";
import { GrGallery } from "react-icons/gr";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FcFeedback } from "react-icons/fc";


import SpaceCity1 from "./assets/SpaceCity1.jpg";
import SpaceCity5 from "./assets/SpaceCity5.jpeg";
import SpaceCity6 from "./assets/SpaceCity6.jpeg";
import SpaceCity7 from "./assets/SpaceCity7.jpeg";
import SpaceCity8 from "./assets/SpaceCity8.jpeg";
import SpaceCity9 from "./assets/SpaceCity9.jpeg";
import { Link } from "react-router-dom";

export const ServiceData = [



    {

        icon: SiGnuprivacyguard,
        title: "Auth",
        content: "Please Sign In to get more better Experience.",
        backgroundImage: SpaceCity9,

    },

    {
        icon: RxPencil2,
        title: "Posts",
        content: "Craete your posts and thoughts.",
        backgroundImage: SpaceCity1,
    },
    {
        icon: GrGallery,
        title: "Gallery",
        content: "Uploads your beautiful momenets And share pictures",
        backgroundImage: SpaceCity6,
    },
    {
        icon: IoChatbubbleEllipsesSharp,
        title: "Chats",
        content: "Lets connect togather and chats with end to end encryptions.",
        backgroundImage: SpaceCity7,
    },
    {
        icon: SlCalender,
        title: "Calender",
        content: "Get date and events.",
        backgroundImage: SpaceCity5,
    },
    {
        icon: FcFeedback,
        title: "Feedback",
        content: "please provide your valuable feedback.",
        backgroundImage: SpaceCity8,
    },
];

