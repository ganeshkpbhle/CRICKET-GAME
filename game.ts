class Score_Board{
    table:HTMLTableElement;
    tableHead:HTMLElement;
    tableRow:HTMLElement;
    tableBody:HTMLElement;
    para:HTMLElement;
    tableData:HTMLElement;
    column:HTMLElement;
    Btn:HTMLInputElement;
    Id:string;
    score:string;
    Name:string;
    gameEnd:boolean=false;
   public row=1;public col=1;public player=1;public count=1;
   public overallCount=0;rowCount=0;public maxRun:number[]=[];
    constructor(name:string,id:string,btnId:string,ScoreId:string){
        let temp=document.createElement('p');
        temp.className="text2";
        this.Name=name;
        temp.innerHTML=name+" SCORE "+"BOARD";
        this.score=ScoreId;
        this.column=document.createElement('div');
        this.Btn=document.getElementById(btnId) as HTMLInputElement;
        this.Btn.onclick=this.Hit();
        this.column.className="col-lg-5 col-sm-5";
        this.column.appendChild(temp);
        this.table=document.createElement('table');
        this.table.id=id;this.Id=id;
        this.table.className="table table-bordered";
        this.tableBody=document.createElement('tbody');       
        for (let index1 = 0; index1<11; index1++) {
            this.tableRow=document.createElement('tr');
            for(let index2=0;index2<8;index2++){
                this.para=document.createElement('p');
                this.para.className="text1";
                if(index2==0 && index1==0){
                    this.para.innerHTML=name;
                    this.tableHead=document.createElement('th');
                    this.tableHead.setAttribute("scope","col");
                    this.tableHead.appendChild(this.para);
                    this.tableRow.appendChild(this.tableHead);
                    continue;
                }
                if(index1==0 && index2>0 && index2!=7){
                    this.para.innerHTML="B"+index2;
                    this.tableHead=document.createElement('th');
                    this.tableHead.setAttribute("scope","col");
                    this.tableHead.appendChild(this.para);
                    this.tableRow.appendChild(this.tableHead);
                    continue;
                }
                if(index1==0 && index2===7){
                    this.para.innerHTML="TOTAL";
                    this.tableHead=document.createElement('th');
                    this.tableHead.setAttribute("scope","col");
                    this.tableHead.appendChild(this.para);
                    this.tableRow.appendChild(this.tableHead);
                    continue;
                }
                if(index1>0 && index2===0){
                    this.para.innerHTML="PLAYER "+index1;
                    this.tableHead=document.createElement('th');
                    this.tableHead.setAttribute("scope","row");
                    this.tableHead.appendChild(this.para);
                    this.tableRow.appendChild(this.tableHead);
                    continue;
                }
                this.tableData=document.createElement('td');
                this.tableData.appendChild(this.para);
                this.tableRow.appendChild(this.tableData);
            } 
            this.tableBody.appendChild(this.tableRow);
        }
        this.table.appendChild(this.tableBody);
        this.column.appendChild(this.table);
        document.getElementById('game-area').appendChild(this.column);
    }
    Hit(): () => void {
        return () => {
            console.log(this.row);
            let temp=(document.getElementById(this.Id) as HTMLTableElement).rows;
            let bt=this.random();
            let b=true;
            if(this.row<=10){
                if(bt==0 || this.count===6){
                    temp[this.row].cells[this.col].innerHTML=bt.toString();
                    this.rowCount+=bt;this.overallCount+=bt;
                    this.maxRun.push(this.rowCount);
                    document.getElementById(this.score).innerHTML=this.overallCount.toString();
                    temp[this.row].cells[7].innerHTML=this.rowCount.toString();
                    this.rowCount=0;
                    this.row+=1;
                    this.col=1;
                    this.count=1;
                    b=false;
                }
                if(this.count<6 && b){
                    temp[this.row].cells[this.col].innerHTML=bt.toString();
                    this.rowCount+=bt;this.overallCount+=bt;
                    this.count+=1;this.col+=1;
                    document.getElementById(this.score).innerHTML=this.overallCount.toString();
                }
            }
            if(this.row==11){
                this.Btn.disabled=true;
                this.gameEnd=true;
            }
        }
    };
    random=()=>{
        let arr=[0,1,1,1,2,2,2,3,4,4,6,6];
        return arr[Math.floor(Math.random()*(11-0+1)+0)];
    }
};

class Game_Panel{
    column:HTMLElement;
    results:HTMLElement;
    resultBtn:HTMLInputElement;
    obj1:Score_Board;
    obj2:Score_Board;
    obj:Score_Board;
    start:HTMLInputElement;
    reset:number=0;
    flex:HTMLElement;
constructor(){
    this.obj1=new Score_Board("TEAM 1","team1","hit1","score1");  
    this.middlePart();  
    this.obj2=new Score_Board("TEAM 2","team2","hit2","score2");
    this.resultBtn= document.getElementById('result') as HTMLInputElement;
    this.resultBtn.onclick=this.GenerateResults();
    this.resultBtn.disabled=true;
    this.start= document.getElementById('countst') as HTMLInputElement;
    this.start.onclick=this.Start();
    this.obj=this.obj1;
    this.obj2.Btn.disabled=true;
    this.obj.Btn.disabled=true;
    this.start.innerHTML="Start Timer<br>"+this.obj.Name;
}
middlePart=()=>{
    this.column=document.createElement('div');
    this.column.className="col-lg-2 col-sm-2";

    this.results=document.createElement('p');
    this.results.innerHTML="<br>";
    this.column.appendChild(this.results);

    this.results=document.createElement('p');
    this.results.id="team";
    this.results.className="text3 border1";
    this.results.innerHTML="MATCH WON BY";
    this.column.appendChild(this.results);

    this.results=document.createElement('p');
    this.results.innerHTML="<br>";
    this.column.appendChild(this.results);

    this.results=document.createElement('p');
    this.results.id="man";
    this.results.className="text3 border1";
    this.results.innerHTML="MAN OF THE MATCH";
    this.column.appendChild(this.results);
    document.getElementById('game-area').appendChild(this.column);
}
GenerateResults(): () => void{
 return ()=>{
   let temp=document.getElementById('team');
   let temp1=document.getElementById('man');
   let table1=(document.getElementById(this.obj1.Id) as HTMLTableElement).rows;
   let table2=(document.getElementById(this.obj2.Id) as HTMLTableElement).rows;
   if(this.obj1.overallCount>this.obj2.overallCount){   
    temp.innerHTML="MATCH WON BY"+"<br>"+this.obj1.Name;
    let mx=Math.max(...this.obj1.maxRun);
    let str:string="MAN OF THE MATCH"+"<br>";
    for(let i=1;i<table1.length;i++){
        if(parseInt(table1[i].cells[7].innerText)===mx){
            str+=table1[i].cells[0].innerText+"<br>"+this.obj1.Name+"<br>"+"SCORE:"+table1[i].cells[7].innerText;
            break;
        }
    }
    temp1.innerHTML=str;
   } 
   else{
    temp.innerHTML="MATCH WON BY"+"<br>"+this.obj2.Name;
    let mx=Math.max(...this.obj2.maxRun);
    let str:string="MAN OF THE MATCH"+"<br>";
    for(let i=1;i<table2.length;i++){
        if(parseInt(table2[i].cells[7].innerText)===mx){
            str+=table2[i].cells[0].innerText+"<br>"+this.obj2.Name+"<br>"+"SCORE:"+table2[i].cells[7].innerText;
            break;
        }
    }
    temp1.innerHTML=str;
   } 
 }
}

Start():()=>void{
    return ()=>{
        this.obj.Btn.disabled=false;
        this.start.disabled=true;
        let cnt=60;
        let x=setInterval(()=>{
            if(this.reset%2==0 && this.reset>0){
                this.reset=0;
                window.location.reload();
            }
            if(this.obj.gameEnd || cnt==0){
                this.obj.gameEnd=false;
                this.obj.Btn.disabled=true;
                this.obj=(this.obj===this.obj1)?this.obj2:this.obj1;
                this.reset+=1;
                this.start.innerHTML="Start Timer<br>"+this.obj.Name;
                this.start.disabled=false;
                clearInterval(x);
            }
            else{
                document.getElementById('count').innerHTML=cnt.toString();
                cnt--;
            }
            if(this.reset%2==0 && this.reset>0){
                this.resultBtn.disabled=false;
                this.start.innerHTML="Reload Game";
            }
        },1000);       
    }
}
};


new Game_Panel();
