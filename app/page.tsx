"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

// Import your page components
import Home from "@/components/pages/Home";
import Projects from "@/components/pages/Projects";
import Resume from "@/components/pages/Resume";
import Contact from "@/components/pages/Contact";
import Blog from "@/components/pages/Blog";
import FavoriteWebsites from "@/components/pages/FavoriteWebsites";
import Orb from "@/components/Orb";

type PageType =
  | "home"
  | "projects"
  | "resume"
  | "contact"
  | "blog"
  | "favorites";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home className="w-full" />;
      case "projects":
        return <Projects />;
      case "resume":
        return <Resume />;
      case "contact":
        return <Contact />;
      case "blog":
        return <Blog />;
      case "favorites":
        return <FavoriteWebsites />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <div className="content">
          <header className="header flex flex-col gap-12 z-10">
            <div className="flex flex-col">
              <button
                onClick={() => setCurrentPage("home")}
                className="text-left"
              >
                <h1 className="text-7xl font-light ml-[-4px] mt-[-0.175em] leading-none hover:text-primary transition-colors">
                  Evan Hill
                </h1>
                <p className="tracking-tight font-extralight">Web Developer</p>
              </button>
            </div>

            <nav className="nav">
              <NavigationMenu>
                <NavigationMenuList className="flex-col font-bold">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={`cursor-pointer ${
                        currentPage === "projects" ? "text-primary" : ""
                      }`}
                      onClick={() => setCurrentPage("projects")}
                    >
                      Projects
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={`cursor-pointer ${
                        currentPage === "resume" ? "text-primary" : ""
                      }`}
                      onClick={() => setCurrentPage("resume")}
                    >
                      Resume
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={`cursor-pointer ${
                        currentPage === "contact" ? "text-primary" : ""
                      }`}
                      onClick={() => setCurrentPage("contact")}
                    >
                      Contact
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={`cursor-pointer ${
                        currentPage === "blog" ? "text-primary" : ""
                      }`}
                      onClick={() => setCurrentPage("blog")}
                    >
                      Blog
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={`cursor-pointer ${
                        currentPage === "favorites" ? "text-primary" : ""
                      }`}
                      onClick={() => setCurrentPage("favorites")}
                    >
                      Favorite Websites
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </header>

          {renderPage()}
        </div>
      </div>
    </div>
  );
}
