type NoteItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type NoteItemPOST = {
  title: string;
  content: string;
};

type NoteItemPUT = { id: number; title: string; content: string };
