import { Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../utils';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';

function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block min-w-[225px]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <Icons.LogoSmall className="h-6 w-6" />
            <span className="">Atelier</span>
          </NavLink>

          <Button variant="outline" size="icon" className="ml-auto h-8 w-8 bg-transparent">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>

        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.title}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2  transition-all  ${isActive ? 'text-link-active' : 'text-muted-foreground hover:text-primary'}`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
export { Sidebar };
