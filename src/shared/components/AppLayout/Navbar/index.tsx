import { motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { logoutUser } from "@/redux/slices/auth";

import { useScrollDirection } from "@/shared/hooks/useScrollDirection";
import { ModeToggle } from "../../system/ModeToggle";
import { Logo } from "./Logo";
import { NAVBAR_ANIMATION } from "../../../../constants/navbar";
import makeRoutingList from "@/helpers/makeRoutingList";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropdownMenu";
import { Button } from "@/shared/components/ui/Button";

export default function Navbar() {
  const scrollDirection = useScrollDirection();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth?.user);
  const isAuthenticated = useSelector(
    (state: any) => state.auth?.isAuthenticated,
  );
  const cartItems = useSelector((state: any) => state.cart?.totalItems || 0);

  const routes = makeRoutingList();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  const navigateToPage = (path: string) => {
    navigate(path);
  };

  return (
    <motion.header
      initial={NAVBAR_ANIMATION.initial}
      animate={{
        y:
          scrollDirection === "down"
            ? NAVBAR_ANIMATION.animate.down.y
            : NAVBAR_ANIMATION.animate.up.y,
        opacity:
          scrollDirection === "down"
            ? NAVBAR_ANIMATION.animate.down.opacity
            : NAVBAR_ANIMATION.animate.up.opacity,
      }}
      transition={NAVBAR_ANIMATION.transition}
      className="bg-navbar fixed inset-x-0 top-0 z-30 mx-auto my-2 max-w-5xl rounded-2xl py-3 shadow-sm backdrop-blur-xs md:top-6 md:w-md lg:w-full"
    >
      <nav className="w-full px-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <div className="relative flex w-9 shrink-0 items-center space-x-3 lg:w-18">
            <Logo />
          </div>

          <div className="flex items-center justify-center gap-5">
            <div className="items-center space-x-4">
              {routes.map(
                (route) =>
                  route.show && (
                    <Button
                      key={route.navLink}
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateToPage(route.navLink)}
                    >
                      {route.navName}
                    </Button>
                  ),
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/cart")}
                  className="relative"
                >
                  <ShoppingCart size={20} />
                  {cartItems > 0 && (
                    <span className="bg-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
                      {cartItems}
                    </span>
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <User size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user?.firstName} {user?.lastName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/cart")}>
                      My Cart
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {!isAuthenticated && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/auth/login")}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate("/auth/register")}
                >
                  Register
                </Button>
              </div>
            )}

            <ModeToggle />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
