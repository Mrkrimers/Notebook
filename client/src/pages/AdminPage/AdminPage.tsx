import React, { useEffect, useState } from 'react';
import style from '../AdminPage/style.module.scss';
import Header from "../../components/Header/Header";
import { Button, Input, Textarea } from "@mantine/core";
import { openDB } from 'idb';

interface NoteData {
    id: string;
    fieldName: string;
}

const AdminPage: React.FC = () => {
    const [activeDiv, setActiveDiv] = useState<string | null>(null);
    const [opt, setOpt] = useState<string>('Создание');
    const [data, setData] = useState<NoteData[]>([]);
    const [inp, setInp] = useState({
        note: '',
        description: ''
    });

    useEffect(() => {
        const openDatabase = async () => {
            const db = await openDB('myDatabase', 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('myStore')) {
                        const store = db.createObjectStore('myStore', { keyPath: 'id' });
                        store.createIndex('myIndex', 'fieldName', { unique: false });
                    }
                },
            });
            const dataDB = await db.getAll('myStore');
            setData(dataDB);
        };
        openDatabase();
    }, [data]);

    const addData = async () => {
        try {
            const db = await openDB('myDatabase', 1);
            const transaction = db.transaction('myStore', 'readwrite');
            const store = transaction.objectStore('myStore');
            const newData: NoteData = { id: inp.note, fieldName: inp.description };

            if (inp.note.trim() === '') throw new Error('Note is empty');
            await store.add(newData);

            setData([...data, newData]);

        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error('An unexpected error occurred:', err);
            }
        }
    };

    const getData = async (e: React.MouseEvent<HTMLDivElement>) => {
        const db = await openDB('myDatabase', 1);
        const transaction = db.transaction('myStore', 'readwrite');
        const store = transaction.objectStore('myStore');
        const { id } = await store.get((e.target as HTMLDivElement).getAttribute('data-name') || '');
        setActiveDiv((e.target as HTMLDivElement).getAttribute('data-name'));
        setInp({ note: id, description: '' });
    };

    const putData = async () => {
        try {
            const db = await openDB('myDatabase', 1);
            const transaction = db.transaction('myStore', 'readwrite');
            const store = transaction.objectStore('myStore');
            if (inp.note.trim() === '') throw new Error('Select a note');
            if (inp.description.trim() === '') throw new Error('Description is empty');
            const newData: NoteData = { id: inp.note, fieldName: inp.description };
            await store.put(newData);

            alert('заметка обновилась');
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error('An unexpected error occurred:', err);
            }
        }
    };

    const showContent = () => {
        if (opt === 'Создание') {
            return (
                <>
                    <div className={style.inp}>
                        <Input.Wrapper label="Заметка">
                            <Input
                                onChange={(e) => setInp({ ...inp, [e.target.name]: e.target.value })}
                                name="note"
                                placeholder="Введите заметку"
                            />
                        </Input.Wrapper>
                    </div>

                    <div className={style.inp}>
                        <Textarea
                            onChange={(e) => setInp({ ...inp, [e.target.name]: e.target.value })}
                            name="description"
                            label="Описание"
                            placeholder="Введите описание"
                        />
                    </div>
                </>
            );
        } else if (opt === 'Обновление') {
            return (
                <>
                    <div className={style.inp}>
                        <Textarea
                            onChange={(e) => setInp({ ...inp, [e.target.name]: e.target.value })}
                            name="description"
                            label="Описание"
                            placeholder="Введите новое описание"
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <main>
            <Header />

            <div className={style.rest}>
                <h2 onClick={(e) => setOpt(e.currentTarget.textContent || '')} className={opt === 'Создание' ? style.active : ''}>Создание</h2>
                <h2 onClick={(e) => setOpt(e.currentTarget.textContent || '')} className={opt === 'Обновление' ? style.active : ''}>Обновление</h2>
            </div>

            <div className={style.wrapperNotes}>
                {opt === 'Создание' ? <h2>Текущие заметки</h2> : <h2>Для обновления описания необходимо выбрать заметку</h2>}
                {opt === 'Создание' ? data?.map((el) =>
                    <div key={el.id} className={style.item}>
                        <h3>{el.id}</h3>
                        <p>{el.fieldName}</p>
                    </div>
                ) : data?.map((el) =>
                    <div key={el.id}
                        data-name={el.id}
                        onClick={getData}
                        className={activeDiv === el.id ? style.active : style.item} >
                        <h3 data-name={el.id}>{el.id}</h3>
                    </div>
                )}
            </div>

            <div className={style.wrapperAction}>
                {showContent()}
                <div className={style.btn}>
                    <Button fullWidth onClick={opt === 'Создание' ? addData : putData}>{opt === 'Создание' ? 'Добавить' : 'Обновить'}</Button>
                </div>
            </div>
        </main>
    );
};

export default AdminPage;

// import style from '../AdminPage/style.module.scss'
// import Header from "../../components/Header/Header"
// import { Button, Input, Textarea } from "@mantine/core";
// import { openDB } from 'idb'
// import { useEffect, useState } from "react";


// function AdminPage() {
//     const [activeDiv, setActiveDiv] = useState(null);
//     const [opt, setOpt] = useState('Создание');
//     const [data, setData] = useState([]);
//     const [inp, setInp] = useState({
//         note: '',
//         description: ''
//     });

//     useEffect(() => {
//         const openDatabase = async () => {
//             const db = await openDB('myDatabase', 1, {
//                 upgrade(db) {
//                     if (!db.objectStoreNames.contains('myStore')) {
//                         const store = db.createObjectStore('myStore', { keyPath: 'id' });
//                         store.createIndex('myIndex', 'fieldName', { unique: false })
//                     }
//                 },
//             });
//             const dataDB = await db.getAll('myStore');
//             setData(dataDB);
//         }
//         openDatabase();
//     }, [data])

//     const addData = async () => {
//         try {
//             const db = await openDB('myDatabase', 1);
//             const transaction = db.transaction('myStore', 'readwrite');
//             const store = transaction.objectStore('myStore');
//             const newData = { id: inp.note, fieldName: inp.description };

//             if (inp.note.trim() == '') throw new Error('Note is empty')
//             await store.add(newData);

//             setData([...data, newData]);

//         } catch (err) {
//             console.log(err.message);
//         }
//     };

//     const getData = async (e) => {
//         const db = await openDB('myDatabase', 1);
//         const transaction = db.transaction('myStore', 'readwrite');
//         const store = transaction.objectStore('myStore');
//         const { id } = await store.get(e.target.getAttribute('name'));
//         setActiveDiv(e.target.getAttribute('name'));
//         setInp({ note: id, description: '' })
//     }

//     const putData = async () => {
//         try {
//             const db = await openDB('myDatabase', 1);
//             const transaction = db.transaction('myStore', 'readwrite');
//             const store = transaction.objectStore('myStore');
//             if (inp.note.trim() == '') throw new Error('Select a note')
//             if (inp.description.trim() == '') throw new Error('Description is empty')
//             const newData = { id: inp.note, fieldName: inp.description };
//             await store.put(newData);

//             alert('заметка обновилась')
//         } catch (err) {
//             console.log(err.message);
//         }
//     };

//     const showContent = () => {
//         if (opt === 'Создание') {
//             return (
//                 <>
//                     <div className={style.inp}>

//                         <Input.Wrapper label="Заметка">
//                             <Input
//                                 onChange={(e) => setInp({ ...inp, [e.target.name]: e.target.value })}
//                                 label="Заметка"
//                                 name="note"
//                                 placeholder="Введите заметку"
//                             />
//                         </Input.Wrapper>

//                     </div>

//                     <div className={style.inp}>
//                         <Textarea
//                             onChange={(e) => setInp({ ...inp, [e.target.name]: e.target.value })}
//                             name="description"
//                             label="Описание"
//                             placeholder="Введите описание"
//                         />
//                     </div>
//                 </>
//             )
//         } else if (opt === 'Обновление') {
//             return (
//                 <>
//                     <div className={style.inp}>
//                         <Textarea
//                             onChange={(e) => setInp({ ...inp, [e.target.name]: e.target.value })}
//                             name="description"
//                             label="Описание"
//                             placeholder="Введите новое описание"
//                         />
//                     </div>
//                 </>
//             )
//         }
//     }


//     return (
//         <main>
//             <Header />

//             <div className={style.rest}>
//                 <h2 onClick={(e) => setOpt(e.target.textContent)} className={opt === 'Создание' ? style.active : null}>Создание</h2>
//                 <h2 onClick={(e) => setOpt(e.target.textContent)} className={opt === 'Обновление' ? style.active : null}>Обновление</h2>
//             </div>

//             <div className={style.wrapperNotes}>
//                 {opt === 'Создание' ? <h2>Текущие заметки</h2> : <h2>Для обновления описания необходимо выбрать заметку</h2>}
//                 {opt === 'Создание' ? data?.map((el) =>
//                     <div key={el.id} className={style.item}>
//                         <h3 >{el.id}</h3>
//                         <p>{el.fieldName}</p>
//                     </div>
//                 ) : data?.map((el) =>
//                     <div key={el.id}
//                         name={el.id}
//                         onClick={getData}
//                         className={activeDiv === el.id ? style.active : style.item} >
//                         <h3 name={el.id}>{el.id}</h3>
//                     </div>
//                 )}
//             </div>

//             <div className={style.wrapperAction}>

//                 {showContent()}

//                 <div className={style.btn}>
//                     <Button fullWidth onClick={opt === 'Создание' ? addData : putData}>{opt === 'Создание' ? 'Добавить' : 'Обновить'}</Button>
//                 </div>

//             </div>


//         </main >
//     )
// }

// export default AdminPage