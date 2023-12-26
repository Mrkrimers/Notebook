import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from '../Header/style.module.scss';

const Header: React.FC = () => {
    const { pathname } = useLocation();

    return (
        <header>
            <div className={style.container}>
                <Link to={'/'}>
                    <h2>NoteBookRUD</h2>
                </Link>

                <div className={style.wrapper}>
                    <Link to={'/admin'}>
                        <p className={pathname === '/admin' ? style.active : undefined}>Создать/Редактировать</p>
                    </Link>
                    <Link to={'/'}>
                        <p className={pathname === '/' ? style.active : undefined}>Просмотр/Удаление</p>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;


// import { Link, useLocation, } from 'react-router-dom'
// import style from '../Header/style.module.scss'

// function Header() {
//     const { pathname } = useLocation();

//     return (
//         <header>
//             <div className={style.container}>

//                 <Link to={'/'}> <h2>NoteBookRUD</h2> </Link>

//                 <div className={style.wrapper}>
//                     <Link to={'/admin'}> <p className={pathname === '/admin' ? style.active : null}>Создать/Редактировать</p> </Link>
//                     <Link to={'/'}> <p className={pathname === '/' ? style.active : null}>Просмотр</p> </Link>
//                 </div>

//             </div>
//         </header>
//     )
// }

// export default Header;