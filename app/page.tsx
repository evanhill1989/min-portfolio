import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <>
      <main className="">
        <div className="content-wrapper">
          <div className="content">
            <div className="flex flex-col">
              <h1 className="">Evan Hill</h1>
              <p>Web Developer</p>
            </div>

            <nav>
              <NavigationMenu>
                <NavigationMenuList className="flex-col gap-0">
                  <NavigationMenuItem>
                    <NavigationMenuLink>Projects</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink>Resume</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink>Contact</NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>
        </div>
      </main>
    </>
  );
}
