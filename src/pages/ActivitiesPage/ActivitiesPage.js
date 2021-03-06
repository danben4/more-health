import React, { Component } from 'react';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import Page from '../../components/Page';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import EmptyResponse from '../../components/EmptyResponse';
import Activities from '../../components/Activities'
import Numbers from '../../components/Numbers'
import Seperator from '../../components/Seperator';

const filterRecentActivites = (activities) =>
  Object.keys(activities).map(
    key => {return {id: key, ...activities[key]}}
  ).filter(activity => { 
    const yearInSeconds = 3600 * 24 * 365 * 2;
    return Math.floor(Date.now() / 1000) - yearInSeconds  < activity.date;
  }
);

class ActivitiesPage extends Component {
  render() {
    const { userId } = this.props;
    return (
      <Page className="homePage">
        {
          userId ?
          <FirebaseDatabaseNode
            path={"users/" + userId}
            orderByValue="date"
          >
            {data => {
              if (data.isLoading) return <Loading />;
              if (! data.value || ! data.value.useractivities) return <EmptyResponse text="No activites!" />;
              const recentActivites = filterRecentActivites(data.value.useractivities);
              return (
                <>
                  <Heading text="Key Numbers" />
                  <Numbers />
                  <Seperator />
                  <Heading text="Recent Activities" />
                  {
                    recentActivites.length === 0 ?
                    <EmptyResponse text="No active goals!" /> :
                    <Activities activities={recentActivites}/>
                  }
                </>
              );
            }}
          </FirebaseDatabaseNode> :
          <Loading />
        }
      </Page>
    );
  }
}

export default ActivitiesPage;
