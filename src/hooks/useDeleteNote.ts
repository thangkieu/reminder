import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn(id: number) {
      return axios.delete('/api/note', { data: { id } });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['useGetNotes'] });
    },
  });
}
