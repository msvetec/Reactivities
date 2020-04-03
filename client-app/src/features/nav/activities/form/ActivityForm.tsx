import React, { useState, FormEvent } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { IActivity } from '../../../../app/models/activity';
import { v4 as uuid } from 'uuid';


interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}
const ActivityForm: React.FC<IProps> = ({ setEditMode, activity: initialFormState, createActivity, editActivity }) => {

    const initializeForm = () => {
        if (initialFormState) return initialFormState;
        else return {
            id: '',
            title: '',
            category: '',
            description: '',
            date: '',
            city: '',
            venue: '',
        };
    }
    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handelInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    const handelSubmint = () => {
        if (activity.id.length === 0) {
            let newActivitiy = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivitiy);
        }
        else editActivity(activity);

    }
    return (
        <Segment clearing>
            <Form onSubmit={handelSubmint}>
                <Form.Input onChange={handelInputChange} placeholder='Title' name='title' value={activity.title} />
                <Form.TextArea rows={2} onChange={handelInputChange} placeholder='Description' name='description' value={activity.description} />
                <Form.Input onChange={handelInputChange} placeholder='Category' name='category' value={activity.category} />
                <Form.Input onChange={handelInputChange} type='datetime-local' placeholder='Date' name='date' value={activity.date} />
                <Form.Input onChange={handelInputChange} placeholder='City' name='city' value={activity.city} />
                <Form.Input onChange={handelInputChange} placeholder='Venue' name='venue' value={activity.venue} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cnacel' />

            </Form>
        </Segment>

    );

}

export default ActivityForm