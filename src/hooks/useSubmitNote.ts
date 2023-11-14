import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSubmitNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteItemPOST) => {
      return axios.post('/api/note', data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['useGetNotes'] });
    },
  });
}
export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteItemPUT) => {
      return axios.put('/api/note', data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['useGetNotes'] });
    },
  });
}
