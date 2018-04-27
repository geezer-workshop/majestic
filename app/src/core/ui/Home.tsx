import * as React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
const SplitPane = require('react-split-pane');
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import './index.css';
import { Workspace } from './stores/Workspace';
import SummaryPanel from './components/SummaryPanel';
import DebugLink from './components/debugLink';
import { Tests, Debugger, Searcher, Preference, Updater } from './stores';
import MiddlePanel from './components/MiddlePanel';
import { lighten } from 'polished';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MainWorkSpace = styled.div`
  display: flex;
  width: 100%;
  background-color: ${props => lighten(0.1, props.theme.main)} !important;
`;

interface HomeProps {
  workspace: Workspace;
  tests: Tests;
  debug: Debugger;
  searcher: Searcher;
  preference: Preference;
  updater: Updater;
}

@observer
class Home extends React.Component<HomeProps, {}> {
  public render() {
    const {
      workspace,
      tests,
      debug,
      searcher,
      preference,
      updater
    } = this.props;
    return (
      <Container className="Home">
        <DevTools />
        <MainWorkSpace>
          <SplitPane
            paneStyle={{ position: 'inherit' }}
            split="vertical"
            minSize={320}
            defaultSize={320}
          >
            <Sidebar tests={tests} searcher={searcher} />
            <MiddlePanel workspace={workspace} tests={tests} debug={debug} />
          </SplitPane>
        </MainWorkSpace>
        <SummaryPanel
          workspace={workspace}
          tests={tests}
          preference={preference}
          updater={updater}
        />
        <DebugLink workspace={workspace} debug={debug} />
      </Container>
    );
  }
}

export default Home;
