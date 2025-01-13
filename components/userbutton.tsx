import {Avatar,AvatarFallback,AvatarImage} from "@/components/ui/avatar";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const Userbutton = () => {
    const router=useRouter();
    const {data:session,status} =useSession();

    if (status ==="loading"){
        return(
        <Loader className="size-6 mr-4 mt-4 float-right animate-spin"/>)
    }
    const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
    const handleSignout=async()=>{
        await signOut({
            redirect:false
        })
    }

  return (
    <nav className="h-10 bg-base-100 text-xl border-none btn">
        {
            session?(
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="outline-none relative float-right border-none">
                        <div className="flex gap-4 items-center">
                            <span>{session.user?.name}</span>
                            <Avatar className="size-8 hover:opacity-75 transition">
                                <AvatarImage className="size-10 hover:opacity-75 transition"
                                src={session.user?.image || undefined}
                                />
                            <AvatarFallback className="bg-sky-700 text-white">{avatarFallback}</AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" side="bottom" className="w-50">
                        <DropdownMenuItem onClick={handleSignout} className="h-10">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ):(
                <div className="flex justify-end  gap-4">
                    <button className="btn btn-primary">
                        <Link href="/signup">sign up</Link>
                    </button>
                    
                    <button className="btn btn-primary ">
                        <Link href="/signin">sign in</Link>
                    </button>
                </div>
            )
        }
    </nav>
  )
}

export default Userbutton
