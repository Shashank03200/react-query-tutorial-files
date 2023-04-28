import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchUserByEmail = ({ queryKey }) => {
  const email = queryKey[1];
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = ({ queryKey }) => {
  const channelId = queryKey[1];
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentPage = ({ email }) => {
  const { data: user, isLoading: userLoading } = useQuery(['user', email], fetchUserByEmail);
  const channelId = user?.data?.channelId;
  // Optional chaining here as the user is not immediately available and takes some time to load
  const { data: channel, isLoading: channelLoading } = useQuery(
    ['channel', channelId],
    fetchCoursesByChannelId,
    {
      enabled: !!channelId,
    }
  );

  if (channelLoading || userLoading) {
    return <p>Loading channel details</p>;
  }

  return channel?.data?.courses.map((course, id) => <li key={id}>{course}</li>);
};

export default DependentPage;
