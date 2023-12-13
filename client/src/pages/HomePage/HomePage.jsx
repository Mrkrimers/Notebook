import { Button, Input } from "@mantine/core";
import Header from "../../components/Header/Header";
import style from '../HomePage/style.module.scss';
// import { useGetAllCourseQuery } from "../../services/course";
import { openDB } from 'idb'
import { useEffect, useState } from "react";


function HomePage() {
    const [data, setData] = useState([])


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
    }, [data])



    const deleteData = async (event) => {
        const db = await openDB('myDatabase', 1);
        const transaction = db.transaction('myStore', 'readwrite');
        const store = transaction.objectStore('myStore');

        const { id } = await store.get(event.target.getAttribute('name'));
        await store.delete(id);
    }

    return (
        <main>
            <Header />

            <div className={style.wrapper}>
                <div>
                    <Input placeholder="Поиск" />
                </div>

                <div>
                    <Button>Поиск</Button>
                </div>
            </div>

            <div className={style.wrapperNotes} >
                {data?.map((el) => <div className={style.content} key={el.id}>
                    <h3>{el.id}</h3>
                    <p>{el.fieldName}</p>

                    <button onClick={deleteData} name={el.id}>delete</button>
                </div>)}
            </div>

        </main >
    )
}

export default HomePage;