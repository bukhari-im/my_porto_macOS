import dayjs from "dayjs";

import { navIcons, navLinks } from "../constant/navbar";

const Navbar = () => {
  return (
    <nav>
        <div>
            <img src="/public/images/logo.svg" alt="Logo" />
            <p className="font-bold">Imam Portofolio</p>
            <ul>
                {navLinks.map(({id,name}) => (
                    <li key={id}><p>{name}</p></li>
                )) }
            </ul>
        </div>
        <div>
            <ul>
                {navIcons.map(({id,img}) => (
                    <li key={id}>
                        <img src={img} className="icon-hover" alt={`Icon ${id}`}/>
                    </li>
                ))}
            </ul>
            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
  )
}

export default Navbar
