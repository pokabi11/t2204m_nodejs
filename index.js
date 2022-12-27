const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log("Server is running... xd");
});

const mysql = require("mysql2");
const conn= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //xampp:"",mamp:"root"
    database: "baitap",
    port:3306
});

app.get("/", function (req,res){
    res.send("Hello world!");
});

app.get("/bong-da", function (req,res){
    res.send("Bóng đá 24h");
});
//api danh sach category
app.get("/api-get-category",function (req,res) {
    const sql_txt = "select * from category";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    });
});
// api danh sach san pham
app.get("/api-get-product",function (req,res) {
    const sql_txt = "select product.id,product.name,product.price,category.name " +
        "as category_name from product left join category on product.categoryId = category.id";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send(err);
        else res.send(data);
    });
});
//thong ke so luong san pham theo loai san pham
//phai in ra
// so luong + ten san pham
app.get("/api-product-by-category",function (req,res) {
    const categoryId = req.query.categoryId;
    const sql_txt = "select product.id,product.name,product.price,category.name as " +
        "category_name from product left join category on product.categoryId = " +
        "category.id where categoryId = "+categoryId;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
});
//tim kiem product
app.get("/search-product",function (req,res) {
    const q = req.query.q;
    const sql_txt = `select * from product where name like '%${q}%'`;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
});
//chi tiet mat hang
app.get("/detail-product",function (req,res) {
    const id = req.query.id;
    const sql_txt = "select * from product where id = "+id;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else if(data.length ==0)
            res.send("404 not found");
        else
            res.send(data[0]);
    })
});