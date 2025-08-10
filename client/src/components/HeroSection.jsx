import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url('/backgroundImage.png')] bg-cover bg-center h-screen">

            <img 
                src={assets.sonyLogo} 
                alt="Sony Logo" 
                className="h-[200px] w-auto mt-0 -ml-5 md:-ml-16 lg:-ml-16 block"
            />

            <img 
                src={assets.kdhLogo} 
                alt="KDH Logo" 
                className="h-[150px] w-auto -ml-4 md:-ml-16 lg:-ml-13 -mt-20 block"
            />

            <div className="flex items-center gap-4 text-gray-300">
                <span>Animation | Adventure | Musical</span>
                <div className="flex items-center gap-1">
                    <CalendarIcon className="w-5 h-5" /> 2025
                </div>
                <div className="flex items-center gap-1">
                    <ClockIcon className="w-5 h-5" /> 1h 35m
                </div>
            </div>

            <p className="text-gray-300">
                A world-renowned K-Pop girl group balances their lives in <br />the spotlight with their secret identities as bad-ass demon hunters,<br /> set against a colorful backdrop of fashion, food, style, and the most <br />popular music movement of the current generation. They sing. They dance. <br />They battle demons.
            </p>

            <button
                onClick={() => navigate('/movies')}
                className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer group"
            >
                Explore Movies
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </div>

    )
}

export default HeroSection