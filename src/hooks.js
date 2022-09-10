import { gql, useQuery } from '@apollo/client';

const GET_MISSIONS_QUERY = gql`
  query {
    launchesPast {
      id
      mission_name
      launch_date_local
      links {
        article_link
        video_link
      }
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
      }
      ships {
        name
        home_port
        image
      }
    }
  }
`;

export const useMissions = () => {
  const { error, loading, data } = useQuery(GET_MISSIONS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  return { error, loading, dataMissions: data };
};
