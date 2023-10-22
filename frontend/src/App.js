import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Homepage } from './features/homepage';
import { WooksPage } from './features/wooks-page';
import { WooksDetail } from './features/wooks-detail';
import { AttributesPage } from './features/attributes-page';
import { AttributeDetail } from './features/attributes-page/attributes-detail/AttributesDetail';
import { CommunityPage } from './features/community';
import { CelebsPage } from './features/celebs';
import styles from './app.module.css';
import ScrollToTop from './components/ScrollToTop';
import { RarityPage } from './features/rarity-page';
class App extends Component {
  myRef = React.createRef();
  render() {
    return (
      <Router>
        <div ref={this.myRef} className={styles.App}>
          <ScrollToTop element={this.myRef} />

          <Switch>
            <Route path="/rarity" exact>
              <RarityPage />
            </Route>
            <Route path="/community-grant" exact>
              <CommunityPage />
            </Route>
            <Route path="/attributes" exact>
              <AttributesPage />
            </Route>
            <Route path="/attributes/:id">
              <AttributeDetail />
            </Route>
            <Route path="/wooks" exact>
              <WooksPage />
            </Route>
            <Route path="/wooks/:id">
              <WooksDetail />
            </Route>
            <Route path="/celebs">
              <CelebsPage />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
