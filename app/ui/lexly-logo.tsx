import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import { playfairDisplay } from '@/app/ui/fonts';

export default function LexlyLogo() {
    return (
        <div className={`${playfairDisplay.className} flex flex-row items-center leading-none text-white`}>
            <GlobeEuropeAfricaIcon className="h-12 w-12 rotate-[15deg" />
            <p className="text-[44px]">Lexly</p>
        </div>
    )
}