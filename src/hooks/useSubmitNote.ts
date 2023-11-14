import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSubmitNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteItemPOST | NoteItemPUT) => {
      return axios.post('/api/note', data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['useGetNotes'] });
    },
  });
}
