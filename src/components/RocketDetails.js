import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

const GET_MISSION_QUERY = gql`
  query {
    launchesPast {
      id
      rocket {
        rocket_name
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
            payload_mass_lbs
          }
        }
      }
    }
  }
`;

const RocketDetails = () => {
  const [text, setText] = useState('');
  const [err, setErr] = useState(null);
  const [status, setStatus] = useState('typing');
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const { error, loading, data } = useQuery(GET_MISSION_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  const handleTextareaChange = (e) => {
    setText(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setComment(text);
    setText('');
    setStatus('submitting');
    try {
      await submitForm(text);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setErr(err);
    }
  }
  const { rocket } = data.launchesPast.find((rocket) => rocket.id === id);
  return (
    <>
      <header className='header'>
        <h1 className='logo'>SpaceX App</h1>
      </header>
      <div className='rocket-details'>
        <main className='main'>
          <div className='rocket-card'>
            <h2>Rocket details</h2>
            <p>
              <b>Rocket name: </b>
              {rocket.rocket_name}
            </p>
            <ul className='first-stage-list'>
              {rocket.first_stage.cores.map((core) => {
                return (
                  <li key={uuid4()}>
                    <p>
                      <b>Rocket cores flight: </b>
                      {core.flight}
                    </p>
                    <p>
                      <b>Rocket core reuse count: </b>
                      {core.core.reuse_count
                        ? core.core.reuse_count
                        : 'Not available'}
                    </p>
                    <p>
                      <b>Rocket cores status: </b>
                      {core.core.status ? core.core.status : 'Not available'}
                    </p>
                  </li>
                );
              })}
            </ul>
            <ul className='second-stage-list'>
              {rocket.second_stage.payloads.map((payload) => {
                return (
                  <li key={uuid4()}>
                    <p>
                      <b>Payload type: </b>
                      {payload.payload_type}
                    </p>
                    <p>
                      <b>Payload mass: </b>
                      {payload.payload_mass_kg} kg
                    </p>
                    <p>
                      <b>Payload mass: </b>
                      {payload.payload_mass_lbs} lbs
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
        <aside className='sidebar'>
          <p>Leave a comment</p>
          <form onSubmit={handleSubmit}>
            <textarea
              value={text}
              onChange={handleTextareaChange}
              disabled={status === 'submitting'}
            />
            <br />
            <button disabled={text.length === 0 || status === 'submitting'}>
              Submit
            </button>
          </form>
          <hr />
          {comment && <p>{comment}</p>}
        </aside>
      </div>
    </>
  );
};

function submitForm(text) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

export default RocketDetails;
