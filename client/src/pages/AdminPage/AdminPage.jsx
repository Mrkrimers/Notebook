import style from '../AdminPage/style.module.scss'
import Header from "../../components/Header/Header"
import { Button, Input, Textarea } from "@mantine/core";
import { openDB } from 'idb'
import { useEffect, useState } from "react";


function AdminPage() {
    const [activeDiv, setActiveDiv] = useState(null);
    const [opt, setOpt] = useState('Создание');
    const [data, setData] = useState([]);
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
                        store.createIndex('myIndex', 'fieldName', { unique: false })
                    }
                },
            });
            const dataDB = await db.getAll('myStore');
            setData(dataDB);
        }
        openDatabase();
    }, [])

    const addData = async () => {
        const db = await openDB('myDatabase', 1);
        const transaction = db.transaction('myStore', 'readwrite');
        const store = transaction.objectStore('myStore');

        const newData = { id: inp.note, fieldName: inp.description };

        await store.add(newData);
        setData([...data, newData]);
    };


    const getData = async (e) => {
        const db = await openDB('myDatabase', 1);
        const transaction = db.transaction('myStore', 'readwrite');
        const store = transaction.objectStore('myStore');
        const { id, fieldName } = await store.get(e.target.getAttribute('name'));
        setActiveDiv(e.target.getAttribute('name'));
        setInp({ note: id, description: fieldName })
    }

    const putData = async () => {
        const db = await openDB('myDatabase', 1);
        const transaction = db.transaction('myStore', 'readwrite');
        const store = transaction.objectStore('myStore');
        try {
            if (inp.description == '') throw new Error('Description is empty')

            const newData = { id: inp.note, fieldName: inp.description };
            await store.put(newData);
        } catch (err) {
            console.log(err.message);
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
                                label="Заметка"
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
            )
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
            )
        }
    }


    return (
        <main>
            <Header />

            <div className={style.rest}>
                <h2 onClick={(e) => setOpt(e.target.textContent)} className={opt === 'Создание' ? style.active : null}>Создание</h2>
                <h2 onClick={(e) => setOpt(e.target.textContent)} className={opt === 'Обновление' ? style.active : null}>Обновление</h2>
            </div>

            <div className={style.wrapperAction}>

                {showContent()}

                <div className={style.btn}>
                    <Button fullWidth onClick={opt === 'Создание' ? addData : putData}>{opt === 'Создание' ? 'Добавить' : 'Обновить'}</Button>
                </div>

            </div>

            <div className={style.wrapperNotes}>
                {opt === 'Создание' ? data?.map((el) =>
                    <div key={el.id}>
                        <h3 >{el.id}</h3>
                        <p>{el.fieldName}</p>
                    </div>
                ) : data?.map((el) =>
                    <div key={el.id} name={el.id}
                        onClick={getData}
                        className={activeDiv === el.id ? style.active : null} >
                        <h3 name={el.id}>{el.id}</h3>
                    </div>
                )}
            </div>
        </main >
    )
}

export default AdminPage