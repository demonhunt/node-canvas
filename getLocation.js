var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const fs = require('fs');
var cors = require('cors');
var request = require('request');
const { createCanvas, loadImage, Image } = require('canvas')
const canvas = createCanvas(640, 1200)
const ctx = canvas.getContext('2d');
const {ApiGet} = require("./apifetcher");

app.use(cors());
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.post("/getlocation", async (req, res, next) => {
    var param = req.body;
    var name = param.name;
    var sku = param.sku;
    var price = param.price;
    var locationtext = param.locationtext;
    //var locationOnMap = param.locationOnMap;
    var locationOnMap= [
        {
            "Name": "A",
            "Location": {
                "x": 165,
                "y": 1080
            }
        },
        {
            "Name": "B",
            "Location": {
                "x": 180,
                "y": 948
            }
        },
        {
            "Name": "C",
            "Location": {
                "x": 170,
                "y": 742
            }
        },
        {
            "Name": "D",
            "Location": {
                "x": 280,
                "y": 530
            }
        },
        {
            "Name": "E",
            "Location": {
                "x": 340,
                "y": 670
            }
        },
        {
            "Name": "F",
            "Location": {
                "x": 355,
                "y": 795
            }
        },
        {
            "Name": "G",
            "Location": {
                "x": 365,
                "y": 920
            }
        }
    ];
    var bookstoreId = param.bookStore;

    let data = {};
    var url = "";
    if (bookstoreId != 0) {
        data.bookStore = bookstoreId;
    }
    await ApiGet("bookstore/getlayout", data).then((res) => {
        url = res.data[0].url;
    }).catch((e)=>{
        console.log(e)
    })
    
    ctx.beginPath();
    ctx.rect(0, 0, 640, 1662);
    ctx.fillStyle = "white";
    ctx.fill();
    var imageData = "";
    await fs.readFile('./logofahasa.png', (err, squid) => {
        if (err) throw err
        const img = new Image()
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 570, 140);
        }
        img.onerror = err => { throw err }
        img.src = squid
    })

    ctx.beginPath();
    ctx.moveTo(0, 170);
    ctx.lineTo(640, 170);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "bold 22px Tahoma";
    ctx.fillText("Tên: ", 10, 200);
    ctx.font = "22px Tahoma";
    ctx.fillText(name, 80, 200);
    ctx.font = "bold 22px Tahoma";
    ctx.fillText("SKU: ", 10, 240);
    ctx.font = "22px Tahoma";
    ctx.fillText(sku, 80, 240);
    ctx.font = "bold 22px Tahoma";
    ctx.fillText("Giá: ", 10, 280);
    ctx.font = "22px Tahoma";
    ctx.fillText(price, 80, 280);
    ctx.moveTo(0, 300);
    ctx.lineTo(640, 300);
    ctx.stroke();
    ctx.font = "bold 22px Tahoma";
    ctx.fillText("Vị trí sản phẩm: ", 10, 330);
    ctx.font = "22px Tahoma";
    ctx.fillText(locationtext, 10, 360);
    ctx.moveTo(0, 380);
    ctx.lineTo(640, 380);
    ctx.stroke();
    ctx.font = "bold 22px Tahoma";
    ctx.fillText("Bản đồ", 10, 420);

    ctx.font = "22px Tahoma";
    await ctx.beginPath();
    await ctx.arc(350, 410, 16, 0, 2 * Math.PI, true);
    ctx.fillStyle = "black";
    await ctx.fill();
    ctx.fillText("Vị trí sản phẩm", 390, 420);
    
    await fs.readFile('./'+ bookstoreId +'.jpg', (err, squid) => {
        if (err) throw err
        const img = new Image()
        img.onload = () => {
            ctx.drawImage(img, 75, 450, 400, 700);
            {
                (locationOnMap.length > 0) ? locationOnMap.map(async (data, index) => {
                    // draw the colored region
                    await ctx.beginPath();
                    await ctx.arc(data.Location.x, data.Location.y, 16, 0, 2 * Math.PI, true);
                    ctx.fillStyle = "black";
                    await ctx.fill();
    
                    ctx.font = "20px Tahoma";
                    ctx.fillStyle = "white";
                    await ctx.fillText(data.Name, data.Location.x-8,data.Location.y+6);
                }) : false
            }
            ctx.fillText("Fahasa xin chân thành cảm ơn quý khách", 50, 1180);
            setTimeout(() => {
                imageData = ctx.getImageData(0, 0, 640, 1200).data
              }, 500)
        }
        img.onerror = err => { throw err }
        img.src = squid
    })
    setTimeout(() => {
        let result = Array.from(imageData)
        console.log(result)
        res.status(200).send({ success: "true", data: result });
    }, 800)
});

 app.listen(3000, () => {
    console.log("Server running on port 3000");
   });