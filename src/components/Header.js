import { h } from 'preact';
import { connect } from 'preact-redux';

import { NavLink } from './Router';

const Header = ({ firstName, lastName }) => (
  <header>
    <div class="container">
      <p>{`${firstName} ${lastName}`}</p>
      <ul>
        <li>
          <NavLink to="/dashboard/overview" activeClass="activeNav">
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/salaries" activeClass="activeNav">
            Salaries
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/projects" activeClass="activeNav">
            Projects
          </NavLink>
        </li>
      </ul>
    </div>
  </header>
);

const mapStateToProps = state => ({
  firstName: state.firstName,
  lastName: state.lastName,
});

export default connect(mapStateToProps)(Header);
