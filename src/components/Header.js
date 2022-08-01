import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, NavbarBrand, Nav, NavItem } from 'reactstrap';

export function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand href="/">Cookbook</NavbarBrand>
        <Nav>
          <NavItem>
            <Link to={'/'}>
              <div
                className={
                  path === '/' ? 'btn btn-primary' : 'btn btn-outline-primary'
                }
              >
                Recepty
              </div>
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/prilohy'}>
              <div
                className={
                  path === '/prilohy'
                    ? 'btn btn-primary'
                    : 'btn btn-outline-primary'
                }
              >
                Přílohy
              </div>
            </Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}
