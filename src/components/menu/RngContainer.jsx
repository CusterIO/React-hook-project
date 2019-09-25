import React from 'react';
// Components
import { Menu } from 'components/menu/Menu';
import { Footer } from 'components/menu/Footer';
import { Rng } from 'components/rng/Rng';
// CSS
import 'components/menu/BlogContainer.css';

export const RngContainer = () => {
  return (
    <React.Fragment>
      <div className="blogContainer-wrapper">
        <div className="blogContainer-wrapper__leftSide">
          <div className="blogContainer-wrapper__leftSide-style">Roger Hurtig</div>
        </div>
        <div className="blogContainer-wrapper__content">
          <Menu />
          <div className="blogContainer-wrapper__content-style">
            <Rng />
          </div>
          <Footer />
        </div>
        <div className="blogContainer-wrapper__rightSide">
          <div className="blogContainer-wrapper__rightSide-style">Custer IO</div>
        </div>
      </div>
    </React.Fragment>
  );
};
