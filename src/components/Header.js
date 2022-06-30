import { useLocation } from "react-router-dom";
import { Navbar, Container, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand href="/">Cookbook</NavbarBrand>
        <Nav pills>
          <NavItem>
            <NavLink className={path === "/" ? "active" : null} href="/">
              Recepty
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={path === "/prilohy" ? "active" : null} href="/prilohy">
              Přílohy
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar >
  );
}
