type NoteItem = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type NoteItemPOST = {
  title: string;
  content: string;
};

type NoteItemPUT = { id: string; title: string; content: string };
