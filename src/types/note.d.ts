type NoteItem = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type NoteItemPOST = {
  title: string;
  content: string;
};

type NoteItemPUT = { id: string; title: string; content: string };
