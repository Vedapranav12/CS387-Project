const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const pg = require('pg');
pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
    return parseInt(value);
});
pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value) => {
    return parseFloat(value);
});
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
    return parseFloat(value);
});


app.use(cors());
app.use(express.json());
app.use(postTrimmer);
var bodyParser = require('body-parser')
app.use(bodyParser.json({ type: 'application/*+json' }))

function postTrimmer(req, res, next) {
    if (req.method === 'POST') {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof(value) === 'string')
                req.body[key] = value.trim();
        }
    }
    next();
}

app.get("/editprofile/:username", async(req, res) => {
    try {
        var address = 0;
        if (req.query.address) {
            address = req.query.address;
        }
        var name = 0;
        if (req.query.name) {
            name = req.query.name;
        }
        var contact = 0;
        if (req.query.contact) {
            contact = req.query.contact;
        }

    } catch (err) {
        console.error(err.message);
    }
});

app.post("/assign_tbl/:tbl_id", async(req, res) => {
    var id = req.params.tbl_id;
    pool.query("update table_info set Status = 'Not Free' where TableID = $1", [id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Table not exist' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.get("/insuff_ing_off/:tbl_id", async(req, res) => {
    try {
        var id = req.params.tbl_id;
        const InsuffIngredsOff = await pool.query(`select inv.ItemID,
    inv.Quantity-sum(CartQuantity*ing.Quantity) as quantity from Table_cart
    as tc inner join Ingredients as ing on tc.DishID=ing.DishID inner join
    Inventory as inv on ing.ItemID=inv.ItemID where CartQuantity>0
    and TableID=$1 group by (inv.ItemID,inv.Quantity) having
    inv.Quantity-sum(CartQuantity*ing.Quantity)< 0;`, [id]);
        req.json(InsuffIngreds.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/insuff_ing_onl/:usernme", async(req, res) => {
    try {
        var id = req.params.usernme;
        const InsuffIngredsOnl = await pool.query(`select inv.ItemID,
    inv.Quantity-sum(c.Quantity*ing.Quantity) as quantity from Cart as c inner
    join Ingredients as ing on c.DishID=ing.DishID inner join Inventory as
    inv on ing.ItemID=inv.ItemID where c.Quantity>0 and c.CustomerID=$1
    group by (inv.ItemID,inv.Quantity) having
    inv.Quantity-sum(c.Quantity*ing.Quantity)<0;`, [id]);
        req.json(InsuffIngredsOnl.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/pend_ords", async(req, res) => {
    try {
        const PendingOrds = await pool.query(`select O1.OrderID,DishID, Quantity from Order_items
    as O1 inner join Order_info as O2 on O1.OrderID=O2.OrderID where
    Status='Received' order by OrderID asc,DishID asc;
    select TableID, DishID, OrderQuantity from Table_cart where OrderQuantity>0
    order by TableID asc, DishID asc;`);
        req.json(PendingOrds.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/view_menu", async(req, res) => {
    try {
        const Menu = await pool.query(`select DishID, Name, price, Non_veg, Category from Dish where
    Available='Yes' order by DishID ASC, Category ASC;`);
        req.json(Menu.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/ord_history/:usrnme", async(req, res) => {
    try {
        var id = req.params.usrnme;
        const History = await pool.query(`select OrderID, Status, Time from Order_info where CustomerID=$1;`, [id]);
        req.json(History.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/curr_ords/:usrnme", async(req, res) => {
    try {
        var id = req.params.usrnme;
        const DelOrdList = await pool.query(`select OrderID, Delivery_Man.Name, Status, Time
    from Order_info, Delivery_Man where
    CustomerID=$1 and Status!='Delivered'`, [id]);
        req.json(DelOrdList.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/onl_cook_ords", async(req, res) => {
    try {
        const OnlCookOrds = await pool.query(`select OrderID, Zip, Time from Order_info as o inner join Customer as
    c on o.CustomerID=c.Username where Status='Cooked';`);
        req.json(OnlCookOrds.rows());
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/del_ppl/:pincode", async(req, res) => {
    try {
        var pincode = req.params.pincode;
        const DelPpl = await pool.query(`select Username,Name,Contact from Delivery_Man where Available='Yes'
    and Primary_Zip=$1 union select Username,Name,Contact from Delivery_Man
    as dm inner join Secondary as s on dm.Username=s.deliveryID
    where Available='Yes' and Zip=$1 and Primary_Zip!=$1;`, [pincode]);
        req.json(DelPpl.rows());
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/coupons/:usrnme", async(req, res) => {
    try {
        var id = req.params.usrnme;
        const Coupons = await pool.query(`select couponid,expiry date,category,discount,min_bill,max_discount from
    coupon as c inner join cust_category as cc on c.user_category=cc.category
    where cc.customerid=$1 and expiry_date>=CURRENT_DATE and couponid
    not in (select couponid from cust_coups as ccc where ccc.username=$1);
    `, [id]);
        req.json(Coupons.rows());
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/login/:tbl/:usrnme/:pass", async(req, res) => {
    try {
        var tbl = req.params.tbl;
        var usrnme = req.params.usrnme;
        var pass = req.params.pass;
        const CheckPerson = await pool.query(`select count(*) from $1 where Username=$2
    and Passcode=crypt($3,Passcode)`, [tbl, usrnme, pass]);
        req.json(CheckPerson.rows());
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/signup/:addr/:usrnme/:nme/:contact/:pass/:zip", async(req, res) => {
    var addr = req.params.addr;
    var usrnme = req.params.usrnme;
    var nme = req.params.nme;
    var contact = req.params.contact;
    var pass = req.params.pass;
    var zip = req.params.zip;
    pool.query(`insert into Customer values(Address,Username,Name,Contact,
      crypt(Passcode,gen_salt('bf')),Zip);`, [addr, usrnme, nme, contact, pass, zip], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'username already exists. Please try again' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/editprofile/:tbl/:addr/:usrnme/:nme/:contact/:pass/:zip", async(req, res) => {
    var addr = req.params.addr;
    var usrnme = req.params.usrnme;
    var nme = req.params.nme;
    var contact = req.params.contact;
    var pass = req.params.pass;
    var zip = req.params.zip;
    var tbl = req.params.tbl;
    pool.query(`update $1
                set Address = $2,
                set Name = $4,
                set Contact = $5,
                set Zip = $6
                where Username = $3;`, [tbl, addr, usrnme, nme, contact, pass, zip], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/insert_table_cart/:tblid/:dishid/:quantity", async(req, res) => {
    var tblid = req.params.tblid;
    var dishid = req.params.dishid;
    var quantity = req.params.quantity;
    pool.query(`insert into Table_cart as tc values($1, $2,
    $3,0,0) ON conflict ($1,$2) do update set CartQuantity =
    tc.CartQuantity+$3;`, [tblid, dishid, quantity], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/sub_ingreds_tbl_cart/:tblid", async(req, res) => {
    var tblid = req.params.tblid;
    pool.query(`with consumed as (select ing.ItemID,
    sum(CartQuantity*ing.Quantity) as quantity from Table_cart as tc inner
    join Ingredients as ing on tc.DishID=ing.DishID where CartQuantity>0 and
    TableID=$1 group by (ing.ItemID) ) update Inventory as I SET Quantity
    = I.Quantity - C.quantity FROM consumed as C where I.ItemID=C.ItemID;`, [tblid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/insert_cart/:usrnme/:dishid/:quantity", async(req, res) => {
    var usrnme = req.params.usrnme;
    var dishid = req.params.dishid;
    var quantity = req.params.quantity;
    pool.query(`insert into Cart as tc values($1, $2,
    $3,0,0) ON conflict ($1,$2) do update set CartQuantity =
    tc.CartQuantity+quantity;`, [usrnme, dishid, quantity], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/sub_ingreds_cart/:usrnme", async(req, res) => {
    var usrnme = req.params.usrnme;
    pool.query(`with consumed as (select ing.ItemID,
    sum(tc.Quantity*ing.Quantity) as quantity from Cart as tc inner join
    Ingredients as ing on tc.DishID=ing.DishID where tc.Quantity>0 and
    tc.CustomerID=$1 group by (ing.ItemID) ) update Inventory as I
    SET Quantity = I.Quantity - C.quantity FROM consumed as C where
    I.ItemID=C.ItemID;`, [usrnme], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/checkout_offl/:tblid", async(req, res) => {
    var tblid = req.params.tblid;
    pool.query(`update Table_info set Status = 'Free' where TableID=$1;`, [id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
    pool.query(`delete from Table_cart where TableID=$1;`, [id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/set_addr/:usrnme/:addr/:zip", async(req, res) => {
    var usrnme = req.params.usrnme;
    var addr = req.params.addr;
    var zip = req.params.zip;
    pool.query(`update Customer set Address = $1, Zip = $2
  where Username = $3;`, [addr, zip, usrnme], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/ins_ord/:usrnme/:timestamp", async(req, res) => {
    var usrnme = req.params.usrnme;
    var timestamp = req.params.timestamp;
    pool.query(`insert into Order_info values(NULL, $1,'Received',
    $2);`, [usrnme, timestamp], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/onl_ords_update/:ordid", async(req, res) => {
    var ord = req.params.ordid;
    pool.query(`update Order_info set Status = 'Cooked' where OrderID = $1;`, [ord], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});
s
app.post("/offl_ord_update/:tblid/:dishid", async(req, res) => {
    var tblid = req.params.tblid;
    var dishid = req.params.dishid;
    pool.query(`update Table_cart set CookedQuantity = CookedQuantity+
  OrderQuantity, OrderQuantity = 0 where TableID = $1 and DishID=
  $2;`, [tblid, dishid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/add_items/:quantity/:itemid/:today", async(req, res) => {
    var quantity = req.params.quantity;
    var itemid = req.params.itemid;
    var today = req.params.today;
    pool.query(`update Inventory set Quantity = Quantity+$1 where ItemID=$2;`, [quantity, itemid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
    pool.query(`insert into Add_items as ai values($1, $2, $3) ON conflict
  ($1, $2) do update set Quantity = ai.Quantity+$3;`, [itemid, today, quantity], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/update_status_menu/:dishid/:avbl", async(req, res) => {
    var avbl = req.params.avbl;
    var dishid = req.params.dishid;
    pool.query(`update Dish set Available = $2 where DishID = $1;`, [dishid, avbl], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/insert_dish/:name/:price/:avbl/:nv/:cat", async(req, res) => {
    var name = req.params.name;
    var price = req.params.price;
    var avbl = req.params.avbl;
    var nv = req.params.nv;
    var cat = req.params.cat;
    pool.query(`Insert into Dish values ($1,$2,$3,$4,$5);`, [name, price, avbl, nv, cat], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/del_dish/:dishid", async(req, res) => {
    var dishid = req.params.dishid;
    pool.query(`delete from Dish where DishID=$1`, [dishid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/apply_offer/:usrnme/:coup", async(req, res) => {
    var usrnme = req.params.usrnme;
    var coup = req.params.coup;
    pool.query(`Insert into Cust_Coup values($1,$2);`, [usrnme, coup], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/hire_chef/:usrnme/:nme/:contact/:salary/:pass/:role", async(req, res) => {
    var usrnme = req.params.usrnme;
    var nme = req.params.nme;
    var contact = req.params.contact;
    var salary = req.params.salary;
    var pass = req.params.pass;
    var role = req.params.role;
    pool.query(`insert into Chef values ($1,$2,$3,$4,crypt($5,gen_salt('bf')),$5);`, [usrnme, nme, contact, salary, pass, role], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/hire_waiter/:usrnme/:nme/:contact/:salary/:pass", async(req, res) => {
    var usrnme = req.params.usrnme;
    var nme = req.params.nme;
    var contact = req.params.contact;
    var salary = req.params.salary;
    var pass = req.params.pass;
    pool.query(`insert into Waiter values ($1,$2,$3,$4,crypt($5,gen_salt('bf')));`, [usrnme, nme, contact, salary, pass], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/hire_delperson/:usrnme/:nme/:contact/:salary/:pass", async(req, res) => {
    var usrnme = req.params.usrnme;
    var nme = req.params.nme;
    var contact = req.params.contact;
    var salary = req.params.salary;
    var pass = req.params.pass;
    pool.query(`insert into Delivery_Man values ($1,$2,$3,$4,crypt($5,gen_salt('bf')));`, [usrnme, nme, contact, salary, pass], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/fire_chef/:usrnme", async(req, res) => {
    var usrnme = req.params.usrnme;
    pool.query(`delete from Chef where Username=$1`, [usrnme], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/fire_waiter/:usrnme", async(req, res) => {
    var usrnme = req.params.usrnme;
    pool.query(`delete from Waiter where Username=$1`, [usrnme], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/fire_delperson/:usrnme", async(req, res) => {
    var usrnme = req.params.usrnme;
    pool.query(`delete from Delivery_Man where Username=$1`, [usrnme], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/add_coupons/:expr_date/:usr_cat/:discount/:min_bill/:max_discount", async(req, res) => {
    var expr_date = req.params.expr_date;
    var usr_cat = req.params.usr_cat;
    var discount = req.params.discount;
    var min_bill = req.params.min_bill;
    var max_discount = req.params.max_discount;
    pool.query(`insert into Coupon values($1, $2, $3, $4, $5);`, [expr_date, usr_cat, discount, min_bill, max_discount], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/assign_delperson/:delid/:ordid", async(req, res) => {
    var delid = req.params.delid;
    var ordid = req.params.ordid;
    pool.query(`update Order_info set DeliveryID=$1, Status='Out for delivery'
    where OrderID=$2;`, [delid, ordid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
    pool.query(`update Delivery_Man set Available='No' where DeliveryID=$1;`, [delid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.post("/delivered/:delid/:ordid", async(req, res) => {
    var delid = req.params.delid;
    var ordid = req.params.ordid;
    pool.query(`update Order_info set DeliveryID=NULL, Status='Delivered'
    where OrderID=$1;`, [ordid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
    pool.query(`update Delivery_Man set Available='Yes' where DeliveryID=$1;`, [delid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'Please try again later' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

app.get("/matches", async(req, res) => {
    try {
        const allMatches = await pool.query("select match_id, t1.team_name as team1, t2.team_name as team2, venue.venue_name, venue.city_name, t3.team_name as match_winner from match, team as t1, team as t2, venue, team as t3 where match.team1 = t1.team_id and match.team2 = t2.team_id and match.match_winner = t3.team_id and match.venue_id = venue.venue_id;");
        res.json(allMatches.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/matches/:match_id", async(req, res) => {
    try {
        const { match_id } = req.params;
        const battingDetails = await pool.query("with all_batsmen as ( select distinct striker as batter from ball_by_ball where match_id = $1 UNION select distinct non_striker as batter from ball_by_ball where match_id = $1 ), score_info as ( select innings_no, striker, sum(runs_scored) as runs, count(*) filter (where runs_scored=4) as no_fours, count(*) filter (where runs_scored=6) as no_sixes, count(*) as balls_faced from ball_by_ball where match_id = $1 group by striker, innings_no ) select innings_no, all_batsmen.batter as batter, player_name, COALESCE(score_info.runs, 0) as runs, COALESCE(score_info.no_fours, 0) as no_fours, COALESCE(score_info.no_sixes, 0) as no_sixes, COALESCE(score_info.balls_faced, 0) as balls_faced from all_batsmen left outer join score_info on all_batsmen.batter = score_info.striker, player where all_batsmen.batter = player.player_id;", [match_id]);
        const extraDetails = await pool.query("with first_team_total as ( select sum(runs_scored+extra_runs) as first_runs, count(*) filter (where out_type is not null) as first_wickets, sum(extra_runs) as first_extras from ball_by_ball where innings_no = 1 and match_id = $1 ), second_team_total as ( select sum(runs_scored+extra_runs) as second_runs, count(*) filter (where out_type is not null) as second_wickets, sum(extra_runs) as second_extras from ball_by_ball where innings_no = 2 and match_id = $1 ) select first_batting, second_batting, t1.team_name as first_team, t2.team_name as second_team, first_team_total.*, second_team_total.*, t3.team_name as team1_name, t4.team_name as team2_name, season_year, t5.team_name as toss_winner_name, venue.venue_name, t6.team_name as match_winner, win_type, win_margin from ( select case when toss_name = 'bat' then toss_winner else case when toss_winner = team1 then team2 else team1 end end as first_batting, case when toss_name = 'field' then toss_winner else case when toss_winner = team1 then team2 else team1 end end as second_batting, match_winner, team1, team2, season_year, match_id, venue_id, toss_winner, win_type, win_margin from match where match_id = $1 ) as toss_info, team as t1, team as t2, team as t3, team as t4, team as t5, venue, first_team_total, second_team_total, team as t6 where first_batting = t1.team_id and second_batting = t2.team_id and t3.team_id = team1 and t4.team_id = team2 and t5.team_id = toss_winner and toss_info.venue_id = venue.venue_id and t6.team_id = match_winner;", [match_id]);
        const bowlingDetails = await pool.query("select bowler, count(*) filter(where out_type in ('keeper catch', 'caught', 'bowled', 'caught and bowled', 'stumped', 'lbw')) as wickets_taken, count(*) as balls_bowled, sum(runs_scored) as runs_given, player_name, innings_no from ball_by_ball, player where match_id = $1 and player.player_id = bowler group by match_id, innings_no, bowler, player_id;", [match_id]);
        const umpireDetails = await pool.query("select match.match_id, umpire_name, umpire.umpire_id from match, umpire_match, umpire where match.match_id = $1 and umpire.umpire_id = umpire_match.umpire_id and umpire_match.match_id = match.match_id;", [match_id]);
        const playing11 = await pool.query("with team1_players as ( select player_name, player.player_id, ROW_NUMBER() over (order by player.player_id) as srno from player, player_match, match where player_match.match_id = $1 and match.match_id = $1 and player.player_id = player_match.player_id and match.team1 = player_match.team_id ), team2_players as ( select player_name, player.player_id, ROW_NUMBER() over (order by player.player_id) as srno from player, player_match, match where player_match.match_id = $1 and match.match_id = $1 and player.player_id = player_match.player_id and match.team2 = player_match.team_id ) select team1_players.srno, team1_players.player_name as players111, team2_players.player_name as players211 from team1_players, team2_players where team1_players.srno = team2_players.srno;", [match_id]);
        const score_overs = await pool.query("with indi_sum as ( select over_id, sum(runs_scored+extra_runs) as over_score, count(*) filter(where out_type is not null), innings_no from ball_by_ball where match_id = $1 group by match_id, innings_no, over_id order by innings_no, over_id ) select t1.over_id, sum(t2.over_score) as score, t1.count as fallenwickets, t1.innings_no from indi_sum as t1 inner join indi_sum as t2 on t1.over_id >= t2.over_id and t1.innings_no = t2.innings_no group by t1.over_id, t1.over_score, t1.innings_no, t1.count order by t1.innings_no, t1.over_id;", [match_id]);
        const top3_batters = await pool.query("select * from ( select sum(runs_scored) as runs, count(*) as balls_played, player_id, player_name, innings_no, DENSE_RANK() over (partition by innings_no order by sum(runs_scored) desc, count(*) asc, player_name asc) as ranking from ball_by_ball, player where match_id = $1 and striker = player_id group by match_id, striker, innings_no, player_id ) as data_inside where ranking <= 3;", [match_id]);
        const top3_bowlers = await pool.query("select * from ( select sum(runs_scored) as runs_given, count(*) as no_balls, count(*) filter(where out_type in ('keeper catch', 'caught', 'bowled', 'caught and bowled', 'stumped', 'lbw')) as wickets, player_id, player_name, innings_no, DENSE_RANK() over (partition by innings_no order by count(*) filter(where out_type in ('keeper catch', 'caught', 'bowled', 'caught and bowled', 'stumped', 'lbw')) desc, sum(runs_scored) asc, player_name asc) as ranking from ball_by_ball, player where match_id = $1 and bowler = player_id group by match_id, bowler, innings_no, player_id ) as data_inside where ranking <= 3 and wickets > 0;", [match_id]);
        const pieChartData = await pool.query("select innings_no, 6*count(*) filter(where runs_scored = 6) as no_sixes, 4*count(*) filter(where runs_scored = 4) as no_fours, 3*count(*) filter(where runs_scored = 3) as no_threes, 2*count(*) filter(where runs_scored = 2) as no_twos, count(*) filter(where runs_scored = 1) as no_ones, sum(extra_runs) as extras from ball_by_ball where match_id = $1 group by innings_no;", [match_id]);
        res.json({ 'scores': battingDetails.rows, 'extraDetails': extraDetails.rows[0], 'bowlingDetails': bowlingDetails.rows, 'umpireDetails': umpireDetails.rows, 'playing11': playing11.rows, 'scoreOvers': score_overs.rows, 'top3_batters': top3_batters.rows, 'top3_bowlers': top3_bowlers.rows, 'pieChartData': pieChartData.rows });
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/players/:player_id", async(req, res) => {
    try {
        const { player_id } = req.params;

        const playerBasicInfo = await pool.query("select * from player where player_id = $1;", [player_id]);
        const playerBattingInfo = await pool.query("select $1 as player_id, matches_played, total_runs, four_runs, six_runs, fifties, highest_score, balls_faced, ROUND((total_runs*100.0)/(NULLIF(balls_faced, 0)*1.0), 3) as strike_rate, ROUND((total_runs*1.0)/(number_outs_norm*1.0), 3) as average from ( select count(distinct match_id) as matches_played from ball_by_ball where striker = $1 or non_striker = $1 ) as matches_played, ( select sum(runs_scored) as total_runs from ball_by_ball where striker = $1 ) as total_runs, ( select 4*count(*) as four_runs from ball_by_ball where striker = $1 and runs_scored = 4 ) as four_runs, ( select 6*count(*) as six_runs from ball_by_ball where striker = $1 and runs_scored = 6 ) as six_runs, ( select count(*) as fifties from ( select sum(runs_scored) as runs_each from ball_by_ball where striker = $1 group by match_id ) as runs_each where runs_each >= 50 ) as fifties, ( select max(runs_each) as highest_score from ( select sum(runs_scored) as runs_each from ball_by_ball where striker = $1 group by match_id ) as runs_each ) as highest_score, ( select count(*) as balls_faced from ball_by_ball where striker = $1 ) as balls_faced, ( select case when count(distinct match_id) = 0 then 1 else count(distinct match_id) end as number_outs_norm from ball_by_ball where out_type is not null and striker = $1 ) as number_outs_norm;", [player_id]);
        const playerBowlingInfo = await pool.query("select $1 as player_id, *, ROUND((total_runs_given*1.0)/(NULLIF(overs_bowled, 0)*1.0), 3) as economy from ( select count(distinct match_id) as matches_bowled from ball_by_ball where bowler = $1 ) as matches_played, ( select sum(runs_scored) as total_runs_given from ball_by_ball where bowler = $1 ) as total_runs_given, ( select count(*) as balls_bowled from ball_by_ball where bowler = $1 ) as balls_bowled, ( select count(distinct (match_id, over_id)) as overs_bowled from ball_by_ball where bowler = $1 ) as overs_bowled, ( select count(*) as wickets_taken from ball_by_ball where bowler = $1 and out_type in ('keeper catch', 'caught', 'bowled', 'caught and bowled', 'stumped', 'lbw') ) as wickets_taken, ( select count(*) as five_wickets from ( select count(*) as wickets_each_match from ball_by_ball where bowler = $1 and out_type in ('keeper catch', 'caught', 'bowled', 'caught and bowled', 'stumped', 'lbw') group by match_id ) as wickets_each_match where wickets_each_match >= 5 ) as five_wickets;", [player_id]);
        const playerScoreEachMatch = await pool.query("select match_id, sum(runs_scored) as each_innings_score from ball_by_ball where striker = $1 group by match_id order by match_id;", [player_id]);
        const playerBowlingEachMatch = await pool.query("select sum(runs_scored) as runs_given, count(*) filter(where out_type in ('keeper catch', 'caught', 'bowled', 'caught and bowled', 'stumped', 'lbw')) as wickets_taken, match_id from ball_by_ball where bowler = $1 group by match_id order by match_id;", [player_id]);

        res.json({ 'playerBasicInfo': playerBasicInfo.rows[0], 'playerBattingInfo': playerBattingInfo.rows[0], 'playerBowlingInfo': playerBowlingInfo.rows[0], 'playerScoreEachMatch': playerScoreEachMatch.rows, 'playerBowlingEachMatch': playerBowlingEachMatch.rows });
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/pointstable/:year", async(req, res) => {
    try {
        const { year } = req.params;
        const pointsTableInfo = await pool.query("select team_name,Mat,Won,Mat-Won as Lost,0 as Tied, ROUND(coalesce(sum(case when team_1=team_id then runs_1 else runs_2 end),0)*1.0/coalesce(sum(case when team_id=team_1 then max_1 else max_2 end),1)-coalesce(sum(case when team_2=team_id then runs_1 else runs_2 end),0)*1.0/coalesce(sum(case when team_id=team_2 then max_1 else max_2 end),1),3) as NR,2*Won as pts from (select team_name,team_id,coalesce(count(match_id),0) as Mat,coalesce(count(match_id) filter(where match_winner=team_id),0) as Won from team left outer join (select * from match where season_year = $1) as match1 on team_id=team1 or team_id=team2 group by (team_id)) as w left outer join (select b.match_id,case when win_type='runs' then match_winner else team1+team2-match_winner end as team_1,coalesce(sum(runs_scored+extra_runs) filter(where innings_no=1),0) as runs_1,coalesce(max(over_id) filter(where innings_no=1),0) as max_1,case when win_type='wickets' then match_winner else team1+team2-match_winner end as team_2,coalesce(sum(runs_scored+extra_runs) filter(where innings_no=2),0) as runs_2,coalesce(max(over_id) filter(where innings_no=2),0) as max_2 from match as m inner join ball_by_ball as b on b.match_id=m.match_id where season_year = $1 group by (b.match_id,win_type,team1,team2,match_winner)) as r on team_id=team_1 or team_id=team_2 where Mat<>0 group by (team_name,Mat,Won) order by pts desc;", [year]);
        res.json(pointsTableInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/venues", async(req, res) => {
    try {
        const allVenues = await pool.query("select * from venue;");
        res.json(allVenues.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/venue/:venue_id", async(req, res) => {
    try {
        const { venue_id } = req.params;

        let venueInfo = await pool.query("select venue.*, count(distinct match.match_id) as matches_played, count(distinct match.match_id) filter (where win_type = 'wickets') as batting_first_won, count(distinct match.match_id) filter (where win_type = 'runs') as bowling_first_won, max(total_runs_each_match) as max_recored, min(total_runs_each_match) as min_recored, max(total_runs_each_match) filter(where win_type = 'wickets' and innings_no = 1) as max_chased from match, venue, ( select sum(runs_scored+extra_runs) as total_runs_each_match, innings_no, win_type as winning_type from ball_by_ball, match where match.match_id = ball_by_ball.match_id and match.venue_id = $1 group by match.match_id, innings_no ) as grouped_data where venue.venue_id = $1 and venue.venue_id = match.venue_id group by venue.venue_id;", [venue_id]);
        let venueStats = await pool.query("select season_year, ROUND(avg(total_runs_each_match), 3) as avg_per_year from ( select sum(runs_scored+extra_runs) as total_runs_each_match, win_type as winning_type, match.match_id from ball_by_ball, match where match.match_id = ball_by_ball.match_id and match.venue_id = $1 and innings_no = 1 group by match.match_id, innings_no ) as data_inner, match where match.match_id = data_inner.match_id group by season_year;", [venue_id]);
        if (venueStats.rows.length === 0) {
            venueInfo = await pool.query("select *, 0 as matches_played, null as batting_first_won, null as bowling_first_won, null as max_recored, null as min_recored, null as max_chased from venue where venue_id = $1;", [venue_id]);
        };

        res.json({
            'venueInfo': venueInfo.rows[0],
            'venueStats': venueStats.rows,
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/venues/add", async(req, res) => {

    const { venue_name, city_name, country_name, capacity } = req.body
    pool.query("INSERT INTO venue(venue_name,city_name,country_name,capacity) values ($1,$2,$3,$4)", [venue_name, city_name, country_name, capacity], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).send({ message: 'pk already exists. Please try again' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});


app.listen(5000, () => {
    console.log("Started");
});