import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <>
      <div className="wrapper">
        <div className="content-wrapper">
          <div className="content">
            <header className="header flex flex-col gap-12 ">
              <div className="flex flex-col">
                <h1 className="text-5xl ml-[-4px] mt-[-0.175em] leading-none">
                  Evan Hill
                </h1>
                <p>Web Developer</p>
              </div>

              <nav className="nav">
                <NavigationMenu>
                  <NavigationMenuList className="flex-col font-bold">
                    <NavigationMenuItem>
                      <NavigationMenuLink>Projects</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink>Resume</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink>Contact</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink>Blog</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink>Favorite Websites</NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </header>
            <main className="main"></main>
            <aside className="aside font-bold">
              <p>
                I am a<br /> full stack developer
                <br /> based in Florida.
                <br /> I solve problems.
                <br /> I obsess about
                <br /> strategic development & design.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
