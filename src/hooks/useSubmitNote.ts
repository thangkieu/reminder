import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useSubmitNote() {
  return useMutation({
    mutationFn: (data: NoteItemPOST | NoteItemPUT) => {
      return axios.post("/api/note", data);
    },
  });
}
