import { Link, useLocation } from 'react-router';
import { SlashIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function BreadcrumbWithCustomSeparator() {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split('/').filter(Boolean);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        {pathnames.map((name, index) => (
          <>
            <BreadcrumbItem key={name}>
              <BreadcrumbLink asChild>
                <Link to={`/${name}`}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < pathnames.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
