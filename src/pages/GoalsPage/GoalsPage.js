import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Company from '../../components/Company';

class GoalsPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <div>
        <Heading text="All goals" />
        {
          userId ?
          <FirebaseDatabaseNode path={"companies"}>
            {({value, isLoading}) => {
              {
              console.log("companies", value);
              console.log("isLoadingCompanies", isLoading);}
              return (
                isLoading ? 
                <Loading /> :
                  ! value ?
                    <EmptyResponse text="No active goals!" /> :
                    Object.keys(value).map(
                      key =>
                        <Company key={key} company={value[key]} />
                    )
              );
            }}
          </FirebaseDatabaseNode> :
          <Loading />
        }
      </div>
    );
  }
}

export default GoalsPage;
