import { useMissions } from '../hooks';
import { v4 as uuid4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const MissionList = () => {
  const { loading, error, dataMissions } = useMissions();

  let navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }

  const handleClick = (missionId) => {
    let path = `/${missionId}`;
    navigate(path);
  };

  return (
    <>
      <header className='header'>
        <h1 className='logo'>SpaceX App</h1>
      </header>

      <div className='mission-container'>
        <ul className='mission-list'>
          {dataMissions.launchesPast.map((mission) => {
            const {
              mission_name,
              id,
              links,
              launch_date_local,
              rocket,
              ships,
            } = mission;
            return (
              <li
                key={id}
                onClick={() => handleClick(id)}
                className='mission-card'
              >
                <div className='mission-data'>
                  <p>
                    <b>Mission name: </b>
                    {mission_name}
                  </p>
                  <p>
                    <b>Launch date:</b> {launch_date_local}
                  </p>

                  <p>
                    <b>Rocket name: </b>
                    {rocket.rocket_name}
                  </p>
                  <b>Article link: </b>
                  {links.article_link ? (
                    <a
                      href={links.article_link}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {links.article_link}
                    </a>
                  ) : (
                    <span>Not available</span>
                  )}
                  <br />
                  <br />
                  <b>Video link: </b>
                  {links.video_link ? (
                    <a
                      href={links.video_link}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {links.video_link}
                    </a>
                  ) : (
                    <span>Not available</span>
                  )}
                  <br />
                  <br />
                  <ul className='rocket-list'>
                    {rocket.first_stage.cores.map((core) => (
                      <li key={uuid4()}>
                        <b>Rocket flight: </b>
                        {core.flight}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr />
                <h3 className='ships-title'>Ships</h3>
                {ships.length > 0 ? (
                  <ul className='ship-list'>
                    {ships.map((ship) => {
                      if (ship !== null) {
                        const { name, home_port } = ship;
                        return (
                          <li key={uuid4()}>
                            <p>
                              <b>Ship name: </b>
                              {name}
                            </p>
                            <p>
                              <b>Home port: </b>
                              {home_port}
                            </p>
                            <img src={ship.image} alt='' className='image' />
                          </li>
                        );
                      }
                    })}
                  </ul>
                ) : (
                  <p>There is no information for the ships available</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default MissionList;
