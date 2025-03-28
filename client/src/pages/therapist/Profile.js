import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { therapistProfile } from '../../endpoints';
import keycloakService from '../../services/KeycloakService';
import apiClient from '../../services/APIService';

function Profile() {
  const navigate = useNavigate();

  const userId = keycloakService.getUserId;
  const [therapist, setTherapist] = useState([]);

  useEffect(() => {
    try {
      apiClient.get(therapistProfile).then((response) => {
        setTherapist(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [userId, navigate]);

  return (
    <div>
      <div>{therapist.family_name ? therapist.family_name : '-'}</div>
      <div>{therapist.given_name ? therapist.given_name : '-'}</div>
      <div>{therapist.email}</div>
    </div>
  );
}

export { Profile };
