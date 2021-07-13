import { useState } from "react";

const Selectitem = ({id, category, deleteImportList, updateItem}) => {

    const [item, setItem] = useState([]);

    const getItemList = async (e) => {
        try {
            const id = e.target.value
            const res = await fetch(`http://localhost:3001/import/item/${id}`);
            const parseRes = await res.json();
            setItem(parseRes);
        } catch (error) {
            console.error(error);
        }       
    };

    return (
        <div className="form-group d-flex">
            <select className="form-control col-lg-2 mr-2" defaultValue="default" onChange={getItemList}>
                <option value="default" disabled hidden>เลือกประเภท</option>
                {category.map((el) => {
                    return <option key={el.category_id} value={el.category_id}>{el.category_name}</option>
                })}
            </select>
            <select className="form-control mr-2" defaultValue="default" onChange={(e) => updateItem(id, {item_id: e.target.value})}>
                <option value="default" disabled hidden>เลือกวัสดุ</option>
                {item.map((el) => {
                    return <option key={el.item_id} value={el.item_id}>{el.item_name}</option>
                })}
            </select>
            <input type="number" placeholder="ราคา/หน่วย" className="form-control col-lg-2 mr-2" onChange={(e) => updateItem(id, {price: e.target.value})}></input>
            <input type="number" placeholder="จำนวน" className="form-control col-lg-2 mr-2" onChange={(e) => updateItem(id, {amount: e.target.value})}></input>
            <button type="button" className="btn btn-outline-danger" onClick={() => deleteImportList(id)}>ลบ</button>
        </div>
    )
};

export default Selectitem;