import * as React from 'react';

type TNotesData = Array<{id: string, data: string}>

const sampleData: TNotesData = [
  {
    id: '1',
    data:
      "I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
  },
  {
    id: '2',
    data:
      "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
  },
  {
    id: '3',
    data:
      "The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.",
  },
  {
    id: '4',
    data:
      "I appreciate the attention to detail in the design of this product. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience.",
  },
  {
    id: '5',
    data:
      "I've tried other similar products, but this one stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs.",
  },
  {
    id: '6',
    data:
      "The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!",
  },
];

function allStorage() {
  const notes = localStorage.getItem('notes') ?? JSON.stringify(sampleData)
  return JSON.parse(notes) as typeof sampleData
}

const storageData = allStorage()

const initialData = storageData ?? sampleData

export const notesInterface = {
  data: initialData,
  setItem: ({id, data}: {id?: string | null, data: string}) => {
    let editIndex = notesInterface.data.findIndex( ({id: sourceId})=> sourceId === id )
    let editId = ''
    if (editIndex === -1) {
      const editId = notesInterface.data.reduce((acc, {id})=> Number(acc) > Number(id) ? acc : `${Number(id) + 1}`  , '0')
      editIndex = notesInterface.data.push({
        id: editId,
        data: `${data}`
      })
    } else {
      notesInterface.data[editIndex].data = `${data}`;
      editId=notesInterface.data[editIndex].id
    }
    notesInterface.data = [...notesInterface.data]
    localStorage.setItem('notes', JSON.stringify(notesInterface.data))
  },
  deleteItem: ({id}: {id: string}) => {
    const deletedIndex = notesInterface.data.findIndex( ({id: sourceId})=> sourceId === id );
    notesInterface.data.splice(deletedIndex, 1);
    notesInterface.data = [...notesInterface.data];
    localStorage.setItem('notes', JSON.stringify(notesInterface.data))
  }  
}

export const NotesContext = React.createContext(notesInterface);