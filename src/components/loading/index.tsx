import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    isLoading: boolean;
    component: ReactNode;
}

const Loading = ({ children, isLoading, component }: Props) => {
    return (
        <>
            {isLoading ? component : children}
        </>
    )
}

export default Loading;