import Image from "next/image"
import HeaderIcon from '@/assets/taskicon.png'
const Navbar = () => {
  return (
    <div className="bg-black p-3 text-white flex items-center font-bold ">
            <Image src={HeaderIcon} alt="header-icon" className="w-8"/>
        Taskify</div>
  )
}

export default Navbar