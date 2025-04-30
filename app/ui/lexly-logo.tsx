import Image from 'next/image';

export default function LexlyLogo() {
    return (
        <div className="flex justify-center w-full h-full">
            <Image
                src="/logo-white.png"
                width={160}
                height={160}
                className="w-auto"
                alt="Lexly Logo - CRM per avvocati e studi legali"
                priority={true}
            />
            {/* <p className="text-[44px]">Lexly</p> */}
        </div>
    )
}