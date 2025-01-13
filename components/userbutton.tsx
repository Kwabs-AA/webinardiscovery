import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const Userbutton = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <Loader className="size-6 mr-4 mt-4 float-right animate-spin"/>
        )
    }

    const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
    
    const handleSignout = async () => {
        await signOut({
            redirect: false
        })
    }

    return (
        <nav className="h-10 text-xl">
            {session ? (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="outline-none relative float-right">
                        <div className="flex gap-2 md:gap-4 items-center">
                            <span className="hidden sm:inline">{session.user?.name}</span>
                            <Avatar className="size-8 transition">
                                <AvatarImage 
                                    className="size-10 transition"
                                    src={session.user?.image || undefined}
                                />
                                <AvatarFallback className="bg-sky-700 text-white">
                                    {avatarFallback}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={handleSignout} className="h-10 cursor-pointer">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex justify-end gap-2 md:gap-4">
                    <Link 
                        href="/signup" 
                        className="px-4 py-2 text-sm md:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Sign up
                    </Link>
                    <Link 
                        href="/signin" 
                        className="px-4 py-2 text-sm md:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Userbutton