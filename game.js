var Score_Board = /** @class */ (function () {
    function Score_Board(name, id, btnId, ScoreId) {
        this.gameEnd = false;
        this.row = 1;
        this.col = 1;
        this.player = 1;
        this.count = 1;
        this.overallCount = 0;
        this.rowCount = 0;
        this.maxRun = [];
        this.random = function () {
            var arr = [0, 1, 1, 1, 2, 2, 2, 3, 4, 4, 6, 6];
            return arr[Math.floor(Math.random() * (11 - 0 + 1) + 0)];
        };
        var temp = document.createElement('p');
        temp.className = "text2";
        this.Name = name;
        temp.innerHTML = name + " SCORE " + "BOARD";
        this.score = ScoreId;
        this.column = document.createElement('div');
        this.Btn = document.getElementById(btnId);
        this.Btn.onclick = this.Hit();
        this.column.className = "col-lg-5 col-xl-5 col-md-12 col-sm-12";
        this.column.appendChild(temp);
        this.table = document.createElement('table');
        this.table.id = id;
        this.Id = id;
        this.table.className = "table table-bordered";
        this.tableBody = document.createElement('tbody');
        for (var index1 = 0; index1 < 11; index1++) {
            this.tableRow = document.createElement('tr');
            for (var index2 = 0; index2 < 8; index2++) {
                this.para = document.createElement('p');
                this.para.className = "text1";
                if (index2 == 0 && index1 == 0) {
                    this.para.innerHTML = name;
                    this.tableHead = document.createElement('th');
                    this.tableHead.setAttribute("scope", "col");
                    this.tableHead.appendChild(this.para);
                    this.tableRow.appendChild(this.tableHead);
                    continue;
                }
                if (index1 == 0 && index2 > 0 && index2 != 7) {
                    this.para.innerHTML = "B" + index2;
                    this.tableHead = document.createElement('th');
                    this.tableHead.setAttribute("scope", "col");
                    this.tableHead.appendChild(this.para);
                    this.tableRow.appendChild(this.tableHead);
                    continue;
                }
                if (index1 == 0 && index2 === 7) {
                    this.para.innerHTML = "TOTAL";
                    this.tableHead = document.createElement('th');
                    this.tableHead.setAttribute("scope", "col");
                    this.tableHead.appendChild(this.para);
                    this.tableRow.appendChild(this.tableHead);
                    continue;
                }
                if (index1 > 0 && index2 === 0) {
                    this.para.innerHTML = "PLAYER " + index1;
                    this.tableHead = document.createElement('th');
                    this.tableHead.setAttribute("scope", "row");
                    this.tableHead.appendChild(this.para);
                    this.tableRow.appendChild(this.tableHead);
                    continue;
                }
                this.tableData = document.createElement('td');
                this.tableData.appendChild(this.para);
                this.tableRow.appendChild(this.tableData);
            }
            this.tableBody.appendChild(this.tableRow);
        }
        this.table.appendChild(this.tableBody);
        this.column.appendChild(this.table);
        document.getElementById('game-area').appendChild(this.column);
    }
    Score_Board.prototype.Hit = function () {
        var _this = this;
        return function () {
            console.log(_this.row);
            var temp = document.getElementById(_this.Id).rows;
            var bt = _this.random();
            var b = true;
            if (_this.row <= 10) {
                if (bt == 0 || _this.count === 6) {
                    temp[_this.row].cells[_this.col].innerHTML = bt.toString();
                    _this.rowCount += bt;
                    _this.overallCount += bt;
                    _this.maxRun.push(_this.rowCount);
                    document.getElementById(_this.score).innerHTML = _this.overallCount.toString();
                    temp[_this.row].cells[7].innerHTML = _this.rowCount.toString();
                    _this.rowCount = 0;
                    _this.row += 1;
                    _this.col = 1;
                    _this.count = 1;
                    b = false;
                }
                if (_this.count < 6 && b) {
                    temp[_this.row].cells[_this.col].innerHTML = bt.toString();
                    _this.rowCount += bt;
                    _this.overallCount += bt;
                    _this.count += 1;
                    _this.col += 1;
                    document.getElementById(_this.score).innerHTML = _this.overallCount.toString();
                }
            }
            if (_this.row == 11) {
                _this.Btn.disabled = true;
                _this.gameEnd = true;
            }
        };
    };
    ;
    return Score_Board;
}());
;
var Game_Panel = /** @class */ (function () {
    function Game_Panel() {
        var _this = this;
        this.reset = 0;
        this.middlePart = function () {
            _this.column = document.createElement('div');
            _this.column.className = "col-lg-2 col-xl-2 col-md-12 col-sm-12";
            var btn = document.createElement('button');
            btn.type = "button";
            btn.className = "btn btn-primary";
            btn.innerText = "GET RESULTS";
            btn.id = "result";
            _this.column.appendChild(btn);
            _this.results = document.createElement('p');
            _this.results.innerHTML = "<br>";
            _this.column.appendChild(_this.results);
            _this.results = document.createElement('p');
            _this.results.id = "team";
            _this.results.className = "text3 border2";
            _this.results.innerHTML = "MATCH WON BY";
            _this.column.appendChild(_this.results);
            _this.results = document.createElement('p');
            _this.results.innerHTML = "<br>";
            _this.column.appendChild(_this.results);
            _this.results = document.createElement('p');
            _this.results.id = "man";
            _this.results.className = "text3 border2";
            _this.results.innerHTML = "MAN OF THE MATCH";
            _this.column.appendChild(_this.results);
            document.getElementById('game-area').appendChild(_this.column);
        };
        this.obj1 = new Score_Board("TEAM 1", "team1", "hit1", "score1");
        this.middlePart();
        this.obj2 = new Score_Board("TEAM 2", "team2", "hit2", "score2");
        this.resultBtn = document.getElementById('result');
        this.resultBtn.onclick = this.GenerateResults();
        this.resultBtn.disabled = true;
        this.start = document.getElementById('countst');
        this.start.onclick = this.Start();
        this.obj = this.obj1;
        this.obj2.Btn.disabled = true;
        this.obj.Btn.disabled = true;
        this.start.innerHTML = "Start Timer For<br>" + this.obj.Name;
    }
    Game_Panel.prototype.GenerateResults = function () {
        var _this = this;
        return function () {
            var temp = document.getElementById('team');
            var temp1 = document.getElementById('man');
            var table1 = document.getElementById(_this.obj1.Id).rows;
            var table2 = document.getElementById(_this.obj2.Id).rows;
            if (_this.obj1.overallCount > _this.obj2.overallCount) {
                temp.innerHTML = "MATCH WON BY" + "<br>" + _this.obj1.Name;
                var mx = Math.max.apply(Math, _this.obj1.maxRun);
                var str = "MAN OF THE MATCH" + "<br>";
                for (var i = 1; i < table1.length; i++) {
                    if (parseInt(table1[i].cells[7].innerText) === mx) {
                        str += table1[i].cells[0].innerText + "<br>" + _this.obj1.Name + "<br>" + "SCORE:" + table1[i].cells[7].innerText;
                        break;
                    }
                }
                temp1.innerHTML = str;
            }
            else {
                temp.innerHTML = "MATCH WON BY" + "<br>" + _this.obj2.Name;
                var mx = Math.max.apply(Math, _this.obj2.maxRun);
                var str = "MAN OF THE MATCH" + "<br>";
                for (var i = 1; i < table2.length; i++) {
                    if (parseInt(table2[i].cells[7].innerText) === mx) {
                        str += table2[i].cells[0].innerText + "<br>" + _this.obj2.Name + "<br>" + "SCORE:" + table2[i].cells[7].innerText;
                        break;
                    }
                }
                temp1.innerHTML = str;
            }
        };
    };
    Game_Panel.prototype.Start = function () {
        var _this = this;
        return function () {
            _this.obj.Btn.disabled = false;
            _this.start.disabled = true;
            var cnt = 60;
            var x = setInterval(function () {
                if (_this.reset % 2 == 0 && _this.reset > 0) {
                    _this.reset = 0;
                    window.location.reload();
                }
                if (_this.obj.gameEnd || cnt == 0) {
                    _this.obj.gameEnd = false;
                    _this.obj.Btn.disabled = true;
                    _this.obj = (_this.obj === _this.obj1) ? _this.obj2 : _this.obj1;
                    _this.reset += 1;
                    _this.start.innerHTML = "Start Timer For<br>" + _this.obj.Name;
                    _this.start.disabled = false;
                    clearInterval(x);
                }
                else {
                    document.getElementById('count').innerHTML = cnt.toString();
                    cnt--;
                }
                if (_this.reset % 2 == 0 && _this.reset > 0) {
                    _this.resultBtn.disabled = false;
                    _this.start.innerHTML = "Reload Game";
                }
            }, 1000);
        };
    };
    return Game_Panel;
}());
;
new Game_Panel();
