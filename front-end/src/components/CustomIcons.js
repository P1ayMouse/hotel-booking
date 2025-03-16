import {SvgIcon} from "@mui/material";

export function FacebookIcon() {
    return (
        <SvgIcon>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.68 15.92C2.88 15.24 0 11.96 0 8C0 3.6 3.6 0 8 0C12.4 0 16 3.6 16 8C16 11.96 13.12 15.24 9.32 15.92L8.88 15.56H7.12L6.68 15.92Z"
                    fill="url(#paint0_linear_795_116)"
                />
                <path
                    d="M11.12 10.2391L11.48 7.99914H9.36V6.43914C9.36 5.79914 9.6 5.31914 10.56 5.31914H11.6V3.27914C11.04 3.19914 10.4 3.11914 9.84 3.11914C8 3.11914 6.72 4.23914 6.72 6.23914V7.99914H4.72V10.2391H6.72V15.8791C7.16 15.9591 7.6 15.9991 8.04 15.9991C8.48 15.9991 8.92 15.9591 9.36 15.8791V10.2391H11.12Z"
                    fill="white"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_795_116"
                        x1="8"
                        y1="0"
                        x2="8"
                        y2="15.9991"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#1AAFFF" />
                        <stop offset="1" stopColor="#0163E0" />
                    </linearGradient>
                </defs>
            </svg>
        </SvgIcon>
    );
}

export function GoogleIcon() {
    return (
        <SvgIcon>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z"
                    fill="#4285F4"
                />
                <path
                    d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z"
                    fill="#34A853"
                />
                <path
                    d="M3.52 9.52C3.36 9.04 3.26545 8.53091 3.26545 8C3.26545 7.46909 3.36 6.96 3.52 6.48V4.41455H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5855L2.93091 9.97091L3.52 9.52Z"
                    fill="#FBBC05"
                />
                <path
                    d="M8 3.18545C9.17818 3.18545 10.2255 3.59273 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.16 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.41455L3.52 6.48C4.15273 4.58909 5.92 3.18545 8 3.18545Z"
                    fill="#EA4335"
                />
            </svg>
        </SvgIcon>
    );
}

export function XIcon() {
    return (
        <SvgIcon>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 30 30"
            >
                <path
                    d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z">
                </path>
            </svg>
        </SvgIcon>
    );
}

export function FavoriteIcon(props) {
    return (
        <SvgIcon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
            >
                <path
                    d="M6.24996 3.33331C3.71866 3.33331 1.66663 5.38535 1.66663 7.91665C1.66663 12.5 7.08329 16.6666 9.99996 17.6359C12.9166 16.6666 18.3333 12.5 18.3333 7.91665C18.3333 5.38535 16.2813 3.33331 13.75 3.33331C12.1998 3.33331 10.8294 4.10285 9.99996 5.28073C9.1705 4.10285 7.80008 3.33331 6.24996 3.33331Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </SvgIcon>
    );
}

export function RightArrowIcon(props) {
    return (
        <SvgIcon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="8"
                 height="12"
                 viewBox="0 0 8 12"
                 fill="none"
            >
                <path
                    d="M0.5 1L6.5 6L0.5 11"
                    stroke="#7F2203"
                />
            </svg>
        </SvgIcon>
    );
}
