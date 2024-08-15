import { ReactNode } from "react"

type Props = {
    children: ReactNode;
}
export default function RequestsLayout({ children }: Props) {
    return (
        <main className="scroll fixed top-0 left-0 bg-white h-full w-full z-40">
            {children}
        </main>
    )
}