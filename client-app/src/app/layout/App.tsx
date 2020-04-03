import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/nav/activities/dashboard/ActivityDashboard';



const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false); //aktiviranje editmoda.


  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  //button view
  const handelSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handelCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);  //... uzimanje trenutno postojeceg objeta 
    setSelectedActivity(activity);
    setEditMode(false);
  }
  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);

  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities);
      });
  }, []); //!!!! [] sprijecava da se funkcija svaki put pokrece kada se rendera stranica!!! VAZNA STVAR!

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handelCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>

    </Fragment>
  );

}

export default App;
