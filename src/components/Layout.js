import {Link} from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
import {rhythm} from '../utils/typography';
import Toggle from './Toggle';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: null,
    };
  }

  componentDidMount() {
    this.setState({theme: window.__theme});
    window.__onThemeChange = () => {
      this.setState({theme: window.__theme});
    };
  }

  renderHeader() {
    const {title} = this.props;

    return (
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          marginTop: 0,
          marginBottom: 0,
          height: 42,
          lineHeight: '2.625rem',
        }}
      >
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: '#fdcb6e',
          }}
          to={'/en'}
        >
          {title}
        </Link>
      </h3>
    );
  }

  render() {
    const {children} = this.props;

    return (
      <div
        style={{
          color: 'var(--textNormal)',
          background: 'var(--bg)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
          minHeight: '100vh',
        }}
      >
        <Helmet
          meta={[
            {
              name: 'theme-color',
              content: this.state.theme === 'light' ? '#ffa8c5' : '#282c35',
            },
          ]}
        />
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(24),
            padding: `2.625rem ${rhythm(3 / 4)}`,
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.625rem',
            }}
          >
            {this.renderHeader()}
            {this.state.theme !== null ? (
              <Toggle
                icons={{
                  checked: (
                    <img
                      src={moon}
                      width='16'
                      height='16'
                      role='presentation'
                      style={{pointerEvents: 'none'}}
                    />
                  ),
                  unchecked: (
                    <img
                      src={sun}
                      width='16'
                      height='16'
                      role='presentation'
                      style={{pointerEvents: 'none'}}
                    />
                  ),
                }}
                checked={this.state.theme === 'dark'}
                onChange={e =>
                  window.__setPreferredTheme(
                    e.target.checked ? 'dark' : 'light'
                  )
                }
              />
            ) : (
              <div style={{height: '24px'}} />
            )}
          </header>
          {children}
        </div>
      </div>
    );
  }
}

export default Layout;
