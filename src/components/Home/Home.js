import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Inventory from './Inventory';

import { getInventory, addItem, setStoredInfo } from '../../redux/actions';

const Container = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

// name, title, username, password, role_id, loc_id - user schema

class Home extends React.Component {
  componentDidMount() {
    // User should be given control over stored information.
    const storedUser = JSON.parse(localStorage.getItem('soupUser'));
    if (storedUser) {
      this.props.setStoredInfo(storedUser);
      if (!this.props.inventory.length) this.props.getInventory(storedUser);
    } else {
      if (this.props.user === null) return this.props.history.push('/auth');
      if (!this.props.inventory.length)
        this.props.getInventory(this.props.user);
    }
    if (!storedUser)
      localStorage.setItem('soupUser', JSON.stringify(this.props.user));
  }
  render() {
    return (
      <Container>
        <Inventory
          categories={this.props.categories}
          inventory={this.props.inventory}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    inventory: state.inventory,
    categories: state.categories,
  };
};

export default connect(
  mapStateToProps,
  { getInventory, addItem, setStoredInfo }
)(Home);
