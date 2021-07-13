import { useState, useEffect } from 'react';
import Selectitem from './Selectitem';
import { v4 as uuidv4 } from 'uuid';

const Importform = () => {
    // state
    const newList = {
        "id": uuidv4(),
        "item_id": "",
        "price": 0,
        "amount": 0
    };
    const item = {
        "category_id": "default",
        "item_name": "",
        "unit": ""
    }
    const [importData, setImportData] = useState({});
    const [importList, setImportList] = useState([newList]);
    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [newItem, setNewItem] = useState(item); 

    const addNewCategory = async () => {
        try {
            const newHeader = new Headers();
            newHeader.append("Content-type", "application/json");

            const body = { "category_name": newCategory }
            
            const res = await fetch("http://localhost:3001/import/category", {
                method: "POST",
                headers: newHeader,
                body: JSON.stringify(body)
            });
            const parseRes = await res.json();
            console.log(parseRes);
            getCategory();
        }
        catch (err) {
            console.error(err);
        }
    }
    const addNewItem = async () => {
        try {
            const newHeader = new Headers();
            newHeader.append("Content-type", "application/json");

            const body = newItem;
            
            const res = await fetch("http://localhost:3001/import/item", {
                method: "POST",
                headers: newHeader,
                body: JSON.stringify(body)
            });
            const parseRes = await res.json();
            console.log(parseRes);
        }
        catch (err) {
            console.error(err);
        }
    }

    const getCategory = async () => {
        try {
            const res = await fetch("http://localhost:3001/import/category");
            const parseRes = await res.json();
            setCategory(parseRes);
        } catch (err) {
            console.error(err);
        }
    };

    const submitImport = async (e) => {
        e.preventDefault();
        try {
            const newHeader = new Headers();
            newHeader.append("Content-type", "application/json");

            const body = {
                ...importData,
                lists: importList
            };
            console.log(body);
            const res = await fetch("http://localhost:3001/import/importitem", {
                method: "POST",
                headers: newHeader,
                body: JSON.stringify(body)
            });
            const parseRes = await res.json();
            console.log(parseRes);
            getCategory();
        }
        catch (err) {
            console.error(err);
        }
    }
    const addImportList = () => {
        setImportList( prevData => {return [...prevData, newList]});
    };
    const updateItem = (id, value) => {
        setImportList(prevList => {
            return prevList.map( list => {
                if(list.id === id){
                    return {
                        ...list, 
                        ...value
                    }
                } else{
                    return list
                }
            })
        });
    };
    const deleteImportList = (id) => {
        if(importList.length > 1){
            setImportList(importList.filter(el => el.id !== id));
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div className="p-5">
            <h3 className="text-dark text-center">นำเข้าวัสดุ</h3>
            <div className="container">
                <form onSubmit={submitImport}>
                    <div className="form-group">
                        <label className="form-label">ชื่อบริษัท</label>
                        <input 
                            type="text" placeholder="กรุณาใส่ชื่อบริษัท" 
                            className="form-control" 
                            onChange={ e => {
                                setImportData( prevData => ({
                                    ...prevData,
                                    company: e.target.value
                                }));
                            }}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label">วันที่</label>
                        <input 
                            type="date" 
                            className="form-control"
                            onChange={ e => {
                                setImportData( prevData => ({
                                    ...prevData,
                                    dates: e.target.value
                                }));
                            }}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-3">รายการวัสดุ</label>
                        {importList.map((el) => {
                            return <Selectitem key={el.id} 
                                id={el.id} 
                                category={category} 
                                deleteImportList={deleteImportList}
                                updateItem={updateItem}/>
                        })}
                        <div className="d-flex justify-content-center">
                            <button type="button" onClick={addImportList} className="btn btn-lg btn-info btn-block mr-2">เพิ่มรายการวัสดุ</button>
                            <button 
                                type="button" className="btn btn-lg btn-secondary col-lg-2 mr-2" data-toggle="modal" data-target="#item"
                                onClick={() => { setNewItem(item); }}
                            >เพิ่มวัสดุ</button>
                            <button 
                                type="button" className="btn btn-lg btn-secondary col-lg-3" data-toggle="modal" data-target="#category"
                                onClick={() => { setNewCategory(""); }}
                            >เพิ่มประเภทวัสดุ</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <button type="submit" className="btn btn-lg btn-success col-lg-5 mr-2">นำเข้าวัสดุ</button>
                    </div>
                </form>
                <div className="modal fade" id="category" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">เพิ่มประเภทวัสดุ</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group m-2">
                                        <input 
                                            type="text" className="form-control" placeholder="กรุณาใส่ชื่อประเภท"
                                            value={newCategory}
                                            onChange={(e) => {setNewCategory(e.target.value)}}
                                        ></input>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer d-flex">
                                <button type="button" className="btn btn-secondary col-lg-3 mr-2" data-dismiss="modal">ยกเลิก</button>
                                <button type="button" className="btn btn-primary col-lg-3" data-dismiss="modal" onClick={addNewCategory}>ยืนยัน</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="item" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">เพิ่มวัสดุ</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label className="form-label">ประเภทพัสดุ</label>
                                        <select 
                                            className="form-control" value={newItem.category_id} 
                                            onChange={ (e) => {setNewItem( prev => ({...prev, "category_id": e.target.value}))} }
                                        >
                                            <option value="default" disabled hidden>เลือกประเภท</option>
                                            {category.map((el) => {
                                                return <option key={el.category_id} value={el.category_id}>{el.category_name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">ชื่อพัสดุ</label>
                                        <input 
                                            type="text" className="form-control" placeholder="กรุณาใส่ชื่อวัสดุ" value={newItem.item_name} 
                                            onChange={ (e) => {setNewItem( prev => ({...prev, "item_name": e.target.value}))} }
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">หน่วยนับ</label>
                                        <input 
                                            type="text" className="form-control" placeholder="กรุณาใส่หน่วยนับ" value={newItem.unit}
                                            onChange={ (e) => {setNewItem( prev => ({...prev, "unit": e.target.value}))} }
                                        ></input>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer d-flex">
                                <button type="button" className="btn btn-secondary col-lg-3 mr-2" data-dismiss="modal">ยกเลิก</button>
                                <button type="button" className="btn btn-primary col-lg-3" data-dismiss="modal" onClick={addNewItem}>ยืนยัน</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Importform;