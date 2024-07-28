import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '../../../../../config';
import { User } from '../../../../../types';
import { LoginData, SignupFormData, SignupResponseData } from '../types';

async function login(payload: LoginData) {
  const res = await fetch(`${BASE_URL}/d/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data as User;
}

async function signup(payload: SignupFormData) {
  const res = await fetch(`${BASE_URL}/d/signup`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data as SignupResponseData;
}

function useAuthenication() {
  const loginMutation = useMutation({ mutationFn: login });
  const signupMutation = useMutation({ mutationFn: signup });
  return { loginMutation, signupMutation };
}

export { useAuthenication };
