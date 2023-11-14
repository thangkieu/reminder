import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

export function useGetNotes() {
  return useQuery({
    queryKey: ['useGetNotes'],
    queryFn() {
      return axios.get<NoteItem[]>('/api/notes');
    },
  });
}
