const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-5">
            <span className="navbar-brand">ระบบจัดเก็บพัสดุ</span>
            <ul className="navbar-nav ml-auto pr-5">
                <li className="nav-item px-2 text-light">คลังวัสดุ</li>
                <li className="nav-item px-2 text-light">นำเข้าวัสดุ</li>
                <li className="nav-item px-2 text-light">เบิกวัสดุ</li>
            </ul>
        </nav>
    )
}

export default Navbar;