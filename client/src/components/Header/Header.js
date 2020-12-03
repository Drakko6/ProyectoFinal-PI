import React from "react";
import "./Header.scss";
import { Container, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/png/instaclone.png";
import LogoIcon from "../../assets/png/icon.png";
import RightHeader from "./RightHeader";
import Search from "./Search";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const isMovil = useMediaQuery({ query: "(max-width: 787px)" });
  // const isTablet = useMediaQuery({
  //   query: "(min-width: 768px)",
  // });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 788px)",
  });

  return (
    <div className="header">
      <Container>
        <Grid>
          {isDesktopOrLaptop && (
            <>
              <Grid.Column width={3} className="header_logo">
                <Link to="/">
                  <Image src={Logo} alt="Logo" />
                </Link>
              </Grid.Column>
              <Grid.Column width={10}>
                <Search />
              </Grid.Column>
              <Grid.Column width={3}>
                <RightHeader />
              </Grid.Column>
            </>
          )}

          {isMovil && (
            <>
              <Grid.Column width={2} className="header_logo">
                <Link to="/">
                  <Image className="imagenLogo" src={LogoIcon} alt="Logo" />
                </Link>
              </Grid.Column>
              <Grid.Column width={9} className="header_search">
                <Search />
              </Grid.Column>
              <Grid.Column width={5} className="header_right">
                <RightHeader />
              </Grid.Column>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}
